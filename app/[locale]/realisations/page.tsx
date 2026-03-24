'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const projects = [
  {
    id: 1,
    categoryKey: 'carrelage',
    title: 'Salle de bain moderne',
    description: 'Rénovation complète avec carrelage grand format et faïence murale.',
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    span: 'col-span-2',
  },
  {
    id: 2,
    categoryKey: 'peinture',
    title: 'Salon contemporain',
    description: 'Peinture décorative et mise en couleur du salon principal.',
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    id: 3,
    categoryKey: 'placo',
    title: 'Cloison aménagement',
    description: 'Création de cloisons pour redistribuer les espaces de vie.',
    src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
  },
  {
    id: 4,
    categoryKey: 'carrelage',
    title: 'Cuisine travertin',
    description: 'Pose de carrelage travertin pour une cuisine chaleureuse.',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 5,
    categoryKey: 'peinture',
    title: 'Chambre apaisante',
    description: 'Peinture douce et harmonieuse pour un espace de repos.',
    src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  },
  {
    id: 6,
    categoryKey: 'placo',
    title: 'Plafond suspendu',
    description: 'Installation de plafond suspendu avec éclairage intégré.',
    src: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
    span: 'col-span-2',
  },
  {
    id: 7,
    categoryKey: 'carrelage',
    title: 'Terrasse extérieure',
    description: 'Carrelage extérieur antidérapant pour terrasse moderne.',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 8,
    categoryKey: 'peinture',
    title: 'Bureau professionnel',
    description: "Mise en peinture d'un espace de travail contemporain.",
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
];

const filterKeys = ['all', 'carrelage', 'placo', 'peinture'] as const;

export default function RealisationsPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<(typeof projects)[number] | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.categoryKey === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-charbon-900">
        <div className="absolute inset-0 stripe-accent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-flamme-400" />
            <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
              {t('real.eyebrow')}
            </span>
          </div>
          <h1 className="font-display font-bold uppercase text-4xl md:text-5xl mb-4">
            {t('real.headline')}
          </h1>
          <p className="text-acier-400 max-w-xl">
            {t('real.subtext')}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-20 z-40 bg-charbon-800/95 backdrop-blur-md border-b border-charbon-600 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all ${
                filter === key
                  ? 'bg-gradient-flamme text-white'
                  : 'border border-charbon-500 text-acier-400 hover:border-flamme-400 hover:text-white'
              }`}
            >
              {t(`real.filter.${key}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <section className="py-12 bg-charbon-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded cursor-pointer ${project.span || ''}`}
                onClick={() => setLightbox(project)}
              >
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charbon-900/90 via-charbon-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <span className="absolute top-4 start-4 font-mono text-xs bg-flamme-400 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`real.filter.${project.categoryKey}`)}
                </span>

                {/* Zoom icon */}
                <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 start-0 end-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-display uppercase tracking-wider text-lg mb-1">
                    {project.title}
                  </h3>
                  <p className="text-acier-200 text-sm">{project.description}</p>
                </div>

                {/* Bottom flamme line */}
                <div className="absolute bottom-0 start-0 w-0 group-hover:w-full h-1 bg-gradient-flamme transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charbon-900/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-charbon-800 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 end-4 z-10 w-10 h-10 flex items-center justify-center bg-charbon-900/80 rounded-full hover:bg-flamme-400 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video">
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            <div className="p-6">
              <span className="font-mono text-xs text-flamme-400 uppercase tracking-wider">
                {t(`real.filter.${lightbox.categoryKey}`)}
              </span>
              <h3 className="font-display uppercase tracking-wider text-xl mt-1 mb-2">
                {lightbox.title}
              </h3>
              <p className="text-acier-400 text-sm">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
