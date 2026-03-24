# Rénovation France — Aziz Bâtiments

Site vitrine professionnel pour une entreprise de rénovation intérieure spécialisée en carrelage, placo et peinture.

## Stack technique

| Élément | Technologie |
|---------|------------|
| Framework | Next.js 14 (App Router) |
| Style | Tailwind CSS, design dark premium |
| Base de données | Supabase (PostgreSQL) |
| Stockage fichiers | Supabase Storage |
| Emails | Resend |
| Déploiement | Vercel |
| Langage | TypeScript |

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/stachboo/aziz-batiments.git
cd aziz-batiments
npm install
```

### 2. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Aller dans **SQL Editor** et exécuter le contenu de `supabase-migration.sql`
3. Récupérer les clés dans **Settings → API** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurer Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter et vérifier le domaine `renovation-france.fr`
3. Générer une clé API → `RESEND_API_KEY`

### 4. Variables d'environnement

```bash
cp .env.example .env.local
```

Remplir `.env.local` avec vos clés.

### 5. Lancer en développement

```bash
npm run dev
```

### 6. Déployer sur Vercel

```bash
vercel deploy
```

Ajouter les variables d'environnement dans le dashboard Vercel.

## Structure du projet

```
├── app/
│   ├── api/devis/route.ts     # API de soumission de devis
│   ├── devis/page.tsx          # Page formulaire de devis
│   ├── realisations/page.tsx   # Galerie de réalisations
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Page d'accueil
│   └── globals.css             # Styles globaux
├── components/
│   ├── Header.tsx              # Navigation
│   └── Footer.tsx              # Pied de page
├── lib/
│   ├── supabase.ts             # Clients Supabase + types
│   └── resend.ts               # Service d'envoi d'emails
├── supabase-migration.sql      # Migration SQL complète
├── .env.example                # Template des variables d'env
└── tailwind.config.ts          # Configuration Tailwind
```

## Design system

| Élément | Valeur |
|---------|--------|
| Fond principal | `#1a1a1a` (charbon-800) |
| Fond sombre | `#111111` (charbon-900) |
| Accent primaire | `#f97316` → `#ea580c` (gradient flamme) |
| Texte principal | `#ffffff` |
| Texte secondaire | `#9ca3af` (acier-400) |
| Police titres | Oswald |
| Police corps | Barlow |
| Police mono | Space Mono |

## Fonctionnalités par page

### Accueil (`/`)
- Hero avec CTA principal
- Présentation des services (carrelage, placo, peinture)
- Engagements qualité
- Appel à l'action

### Réalisations (`/realisations`)
- Galerie filtrée par catégorie
- Lightbox zoom sur les photos
- Avant/après des projets

### Devis (`/devis`)
- Formulaire multi-sections avec validation
- Upload photos drag & drop (max 5, 8Mo/fichier)
- Sélection du type de travaux, budget, délai
- Confirmation visuelle après envoi

### API Devis (`/api/devis`)
- Upload photos vers Supabase Storage
- Enregistrement en base de données
- Double envoi email (notification interne + confirmation client)

## Améliorations futures

- Dashboard admin pour gérer les demandes de devis
- Authentification admin via Supabase Auth
- Système de suivi de statut des devis pour les clients
- Blog / articles conseils rénovation
- Page témoignages clients
- Intégration Google Maps pour la zone d'intervention
- PWA pour accès mobile hors-ligne
