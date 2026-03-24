-- ============================================
-- Rénovation France — Supabase Migration
-- ============================================

-- Table: demandes_devis
CREATE TABLE public.demandes_devis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  adresse TEXT,
  service TEXT,
  surface TEXT,
  budget TEXT,
  delai TEXT,
  description TEXT NOT NULL,
  photos_urls TEXT[],
  statut TEXT DEFAULT 'nouveau'
    CHECK (statut IN ('nouveau', 'en_cours', 'devis_envoyé', 'clôturé')),
  notes_internes TEXT
);

-- Indexes
CREATE INDEX idx_demandes_devis_created_at ON public.demandes_devis (created_at DESC);
CREATE INDEX idx_demandes_devis_statut ON public.demandes_devis (statut);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.demandes_devis
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security
ALTER TABLE public.demandes_devis ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required for submitting a quote request)
CREATE POLICY "Allow public insert" ON public.demandes_devis
  FOR INSERT
  WITH CHECK (true);

-- No public SELECT policy — data is protected by default

-- ============================================
-- Storage: photos-chantiers bucket
-- ============================================

-- Create public bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos-chantiers', 'photos-chantiers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'photos-chantiers');

-- Allow public read
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'photos-chantiers');
