'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';

const categories = ['Tous', 'Carrelage', 'Placo', 'Peinture'] as const;

const projects = [
  {
    id: 1,
    category: 'Carrelage',
    title: 'Salle de bain moderne',
    description: 'Rénovation complète avec carrelage grand format et faïence murale.',
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    span: 'col-span-2',
  },
  {
    id: 2,
    category: 'Peinture',
    title: 'Salon contemporain',
    description: 'Peinture décorative et mise en couleur du salon principal.',
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    id: 3,
    category: 'Placo',
    title: 'Cloison aménagement',
    description: 'Création de cloisons pour redistribuer les espaces de vie.',
    src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
  },
  {
    id: 4,
    category: 'Carrelage',
    title: 'Cuisine travertin',
    description: 'Pose de carrelage travertin pour une cuisine chaleureuse.',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 5,
    category: 'Peinture',
    title: 'Chambre apaisante',
    description: 'Peinture douce et harmonieuse pour un espace de repos.',
    src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  },
  {
    id: 6,
    category: 'Placo',
    title: 'Plafond suspendu',
    description: 'Installation de plafond suspendu avec éclairage intégré.',
    src: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
    span: 'col-span-2',
  },
  {
    id: 7,
    category: 'Carrelage',
    title: 'Terrasse extérieure',
    description: 'Carrelage extérieur antidérapant pour terrasse moderne.',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 8,
    category: 'Peinture',
    title: 'Bureau professionnel',
    description: 'Mise en peinture d\'un espace de travail contemporain.',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
];

export default function RealisationsPage() {
  const [filter, setFilter] = useState<string>('Tous');
  const [lightbox, setLightbox] = useState<(typeof projects)[number] | null>(null);

  const filtered = filter === 'Tous' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-charbon-900">
        <div className="absolute inset-0 stripe-accent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-flamme-400" />
            <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
              Portfolio
            </span>
          </div>
          <h1 className="font-display font-bold uppercase text-4xl md:text-5xl mb-4">
            Nos réalisations
          </h1>
          <p className="text-acier-400 max-w-xl">
            Découvrez nos projets de rénovation en carrelage, placo et peinture
            réalisés avec soin et professionnalisme.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-20 z-40 bg-charbon-800/95 backdrop-blur-md border-b border-charbon-600 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all ${
                filter === cat
                  ? 'bg-gradient-flamme text-white'
                  : 'border border-charbon-500 text-acier-400 hover:border-flamme-400 hover:text-white'
              }`}
            >
              {cat}
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
                <span className="absolute top-4 left-4 font-mono text-xs bg-flamme-400 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.category}
                </span>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-display uppercase tracking-wider text-lg mb-1">
                    {project.title}
                  </h3>
                  <p className="text-acier-200 text-sm">{project.description}</p>
                </div>

                {/* Bottom flamme line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-flamme transition-all duration-500" />
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
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-charbon-900/80 rounded-full hover:bg-flamme-400 transition-colors"
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
                {lightbox.category}
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
