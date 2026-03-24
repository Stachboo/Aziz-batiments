import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Clock,
  Shield,
  CheckCircle,
  Layers,
  Hammer,
  PaintBucket,
  Phone,
} from 'lucide-react';

const engagements = [
  { icon: Star, label: 'Qualité garantie' },
  { icon: Clock, label: 'Respect des délais' },
  { icon: Shield, label: 'Artisans assurés' },
  { icon: CheckCircle, label: 'Devis gratuit' },
];

const stats = [
  { value: '20+', label: "Années d'expérience" },
  { value: '500+', label: 'Chantiers réalisés' },
  { value: '100%', label: 'Clients satisfaits' },
  { value: '48h', label: 'Délai de réponse' },
];

const services = [
  {
    num: '01',
    title: 'Carrelage',
    icon: Layers,
    description:
      'Pose de carrelage intérieur et extérieur, faïence, mosaïque. Travaux de précision pour sols et murs, avec finitions impeccables.',
    details: [
      'Carrelage sol & mur',
      'Faïence salle de bain',
      'Terrasse & extérieur',
      'Rénovation complète',
    ],
  },
  {
    num: '02',
    title: 'Placo',
    icon: Hammer,
    description:
      'Création et isolation de cloisons, plafonds suspendus, doublages muraux. Solutions sur mesure pour optimiser vos espaces.',
    details: [
      'Cloisons & doublages',
      'Plafonds suspendus',
      'Isolation thermique',
      'Habillage & finition',
    ],
  },
  {
    num: '03',
    title: 'Peinture',
    icon: PaintBucket,
    description:
      'Peinture intérieure et décorative, enduits, papiers peints. Un rendu professionnel pour transformer votre habitat.',
    details: [
      'Peinture intérieure',
      'Enduits décoratifs',
      'Papiers peints',
      'Lasures & vernis',
    ],
  },
];

const steps = [
  {
    num: '01',
    title: 'Décrivez',
    description: 'Remplissez notre formulaire en ligne ou appelez-nous pour décrire votre projet.',
  },
  {
    num: '02',
    title: 'Échange & visite',
    description: 'Nous organisons une visite pour évaluer les travaux et comprendre vos besoins.',
  },
  {
    num: '03',
    title: 'Devis gratuit',
    description: 'Recevez un devis détaillé, transparent et sans engagement sous 48h.',
  },
  {
    num: '04',
    title: 'Réalisation',
    description: 'Nos artisans réalisent vos travaux avec soin, dans le respect des délais.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-charbon-900 to-charbon-800">
        <div className="absolute inset-0 stripe-accent pointer-events-none" />

        {/* Watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold uppercase text-charbon-700 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(120px, 20vw, 280px)',
            opacity: 0.18,
            lineHeight: 1,
          }}
        >
          RÉNOV
        </div>

        {/* Orange shard */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
          style={{
            clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 80% 100%)',
            background: 'linear-gradient(135deg, transparent, #f97316)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-flamme-400" />
              <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
                Artisans qualifiés
              </span>
              <div className="drapeau-bar">
                <span /><span /><span />
              </div>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-bold uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              <span className="block text-white">Votre intérieur,</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: '2px #f97316',
                  color: 'transparent',
                }}
              >
                réinventé.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-acier-400 font-body text-lg max-w-xl mb-10">
              Spécialistes en carrelage, placo et peinture, nous transformons
              vos espaces avec un savoir-faire artisanal et des finitions
              irréprochables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link href="/devis" className="btn-flamme rounded">
                Demander un devis
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:0649427544"
                className="inline-flex items-center gap-2 border border-charbon-500 hover:border-flamme-400 px-8 py-4 font-display uppercase tracking-wider text-sm transition-colors rounded"
              >
                <Phone size={16} />
                06 49 42 75 44
              </a>
            </div>

            {/* Engagements */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {engagements.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon size={20} className="text-flamme-400 flex-shrink-0" />
                  <span className="text-acier-400 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-charbon-800"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* STATS BAR */}
      <section className="relative bg-gradient-flamme py-12">
        <div className="absolute inset-0 stripe-accent opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display font-bold text-white"
                  style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono uppercase text-white/70 text-xs tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-charbon-800">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-flamme-400" />
              <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
                Nos métiers
              </span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl">
              Trois savoir-faire,{' '}
              <span className="text-flamme-400">une seule exigence.</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.num}
                className="group relative bg-charbon-700 border border-charbon-500 p-8 rounded overflow-hidden card-lift"
              >
                {/* Watermark number */}
                <span className="absolute top-4 right-6 font-display text-charbon-600 text-6xl font-bold pointer-events-none">
                  {service.num}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-flamme rounded flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <service.icon size={28} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="font-display uppercase tracking-widest text-lg mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-acier-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-acier-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-flamme-400 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-flamme transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-charbon-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-flamme-400" />
              <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
                Comment ça marche
              </span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl">
              Simple &amp; transparent
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num}>
                <span className="font-display text-flamme-400 text-4xl font-bold">
                  {step.num}
                </span>
                <h3 className="font-display uppercase tracking-wider text-lg mt-3 mb-2 font-bold">
                  {step.title}
                </h3>
                <p className="text-acier-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative bg-charbon-800 py-20">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-flamme" />
        <div className="absolute inset-0 stripe-accent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold uppercase text-2xl md:text-3xl mb-2">
              Votre projet commence ici.
            </h2>
            <p className="text-acier-400">
              Contactez-nous pour un devis gratuit et sans engagement.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/devis" className="btn-flamme rounded">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 border border-flamme-400/40 text-flamme-400 hover:bg-flamme-400/10 px-8 py-4 font-display uppercase tracking-wider text-sm transition-colors rounded"
            >
              Nos réalisations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
