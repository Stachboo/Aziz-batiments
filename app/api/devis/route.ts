import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendDevisEmail } from '@/lib/resend';
import crypto from 'crypto';
import path from 'path';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const formData = await request.formData();

    // Extract text fields
    const nom = formData.get('nom')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const telephone = formData.get('telephone')?.toString().trim() || '';
    const adresse = formData.get('adresse')?.toString().trim() || '';
    const service = formData.get('service')?.toString().trim() || '';
    const surface = formData.get('surface')?.toString().trim() || '';
    const budget = formData.get('budget')?.toString().trim() || '';
    const delai = formData.get('delai')?.toString().trim() || '';
    const description = formData.get('description')?.toString().trim() || '';

    // Validate required fields
    if (!nom || !email || !telephone || !description) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Veuillez remplir tous les champs obligatoires : nom, email, téléphone et description.',
        },
        { status: 400 }
      );
    }

    // Handle photo uploads
    const photosUrls: string[] = [];
    const photoFiles = formData.getAll('photos') as File[];

    for (const file of photoFiles) {
      if (!(file instanceof File) || file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
      const filePath = `devis/${filename}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('photos-chantiers')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (!uploadError) {
        const {
          data: { publicUrl },
        } = supabaseAdmin.storage
          .from('photos-chantiers')
          .getPublicUrl(filePath);
        photosUrls.push(publicUrl);
      } else {
        console.error('Erreur upload photo:', uploadError.message);
      }
    }

    // Insert into database
    let id: string | undefined;
    const { data, error: dbError } = await supabaseAdmin
      .from('demandes_devis')
      .insert({
        nom,
        email,
        telephone,
        adresse: adresse || null,
        service: service || null,
        surface: surface || null,
        budget: budget || null,
        delai: delai || null,
        description,
        photos_urls: photosUrls.length > 0 ? photosUrls : null,
        statut: 'nouveau',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Erreur base de données:', dbError.message);
    } else {
      id = data?.id;
    }

    // Send emails
    await sendDevisEmail({
      nom,
      email,
      telephone,
      adresse,
      service,
      surface,
      budget,
      delai,
      description,
      photosUrls: photosUrls.length > 0 ? photosUrls : undefined,
    });

    return NextResponse.json({
      success: true,
      id,
      message:
        'Votre demande a été enregistrée et envoyée avec succès.',
    });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'Une erreur interne est survenue. Veuillez réessayer ou nous contacter directement.',
      },
      { status: 500 }
    );
  }
}
