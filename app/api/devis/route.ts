import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nom = formData.get('nom');
    const telephone = formData.get('telephone');
    const email = formData.get('email');

    if (!nom || !telephone || !email) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // TODO: integrate with email service or database
    console.log('Nouveau devis reçu:', {
      nom: nom.toString(),
      telephone: telephone.toString(),
      email: email.toString(),
      adresse: formData.get('adresse')?.toString(),
      service: formData.get('service')?.toString(),
      surface: formData.get('surface')?.toString(),
      budget: formData.get('budget')?.toString(),
      delai: formData.get('delai')?.toString(),
      description: formData.get('description')?.toString(),
      photosCount: formData.getAll('photos').length,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
