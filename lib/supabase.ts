import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
}

export type DemandeDevis = {
  id?: string;
  created_at?: string;
  nom: string;
  email: string;
  telephone: string;
  adresse?: string;
  service?: string;
  surface?: string;
  budget?: string;
  delai?: string;
  description: string;
  photos_urls?: string[];
  statut?: 'nouveau' | 'en_cours' | 'devis_envoyé' | 'clôturé';
};
