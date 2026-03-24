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
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import HeroTitle from '@/components/HeroTitle';

export default function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = useTranslations();
  const locale = params.locale;
  const isAr = locale === 'ar';

  const engagements = [
    { icon: Star, label: t('engage.quality') },
    { icon: Clock, label: t('engage.delai') },
    { icon: Shield, label: t('engage.garantie') },
    { icon: CheckCircle, label: t('engage.devis') },
  ];

  const stats = [
    { value: '20+', label: t('stats.experience') },
    { value: '500+', label: t('stats.chantiers') },
    { value: '100%', label: t('stats.satisfaction') },
    { value: '48h', label: t('stats.reponse') },
  ];

  const services = [
    {
      num: '01',
      title: t('services.carrelage.title'),
      icon: Layers,
      description: t('services.carrelage.desc'),
      details: [
        t('services.carrelage.d1'),
        t('services.carrelage.d2'),
        t('services.carrelage.d3'),
        t('services.carrelage.d4'),
      ],
    },
    {
      num: '02',
      title: t('services.placo.title'),
      icon: Hammer,
      description: t('services.placo.desc'),
      details: [
        t('services.placo.d1'),
        t('services.placo.d2'),
        t('services.placo.d3'),
        t('services.placo.d4'),
      ],
    },
    {
      num: '03',
      title: t('services.peinture.title'),
      icon: PaintBucket,
      description: t('services.peinture.desc'),
      details: [
        t('services.peinture.d1'),
        t('services.peinture.d2'),
        t('services.peinture.d3'),
        t('services.peinture.d4'),
      ],
    },
  ];

  const steps = [
    { num: '01', title: t('process.step1.title'), description: t('process.step1.desc') },
    { num: '02', title: t('process.step2.title'), description: t('process.step2.desc') },
    { num: '03', title: t('process.step3.title'), description: t('process.step3.desc') },
    { num: '04', title: t('process.step4.title'), description: t('process.step4.desc') },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-charbon-900 to-charbon-800">
        <div className="absolute inset-0 stripe-accent pointer-events-none" />

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="absolute end-0 top-1/2 -translate-y-1/2 z-0 font-display font-bold uppercase text-charbon-700 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(120px, 20vw, 280px)',
            opacity: 0.18,
            lineHeight: 1,
          }}
        >
          {t('hero.watermark')}
        </div>

        {/* Orange shard */}
        <div
          aria-hidden="true"
          className="absolute top-0 w-1/3 h-full opacity-10 pointer-events-none z-0"
          style={{
            ...(isAr ? { left: 0 } : { right: 0 }),
            clipPath: isAr
              ? 'polygon(0 0, 40% 0, 20% 100%, 0 100%)'
              : 'polygon(60% 0, 100% 0, 100% 100%, 80% 100%)',
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
                {t('hero.eyebrow')}
              </span>
              <div className="drapeau-bar">
                <span /><span /><span />
              </div>
            </div>

            {/* H1 — GSAP 3D animated */}
            <HeroTitle
              line1={t('hero.headline1')}
              line2={t('hero.headline2')}
            />

            {/* Subtext */}
            <p className="text-acier-400 font-body text-base sm:text-lg max-w-xl mb-10">
              {t('hero.subtext')}
            </p>

            {/* CTAs — devis button first on all screens */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mb-16">
              <Link href={`/${locale}/devis`} className="btn-flamme rounded justify-center">
                {t('hero.cta.devis')}
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:0649427544"
                dir="ltr"
                className="inline-flex items-center justify-center gap-2 border border-charbon-500 hover:border-flamme-400 px-8 py-4 font-display uppercase tracking-wider text-sm transition-colors rounded"
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
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20 bg-charbon-800"
          style={{
            clipPath: isAr
              ? 'polygon(0 0, 100% 100%, 0 100%)'
              : 'polygon(0 100%, 100% 0, 100% 100%)',
          }}
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
                {t('services.eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl">
              {t('services.headline1')}{' '}
              <span className="text-flamme-400">{t('services.headline2')}</span>
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
                <span
                  aria-hidden="true"
                  className="absolute top-4 font-display text-charbon-600 text-6xl font-bold pointer-events-none"
                  style={isAr ? { left: '1.5rem' } : { right: '1.5rem' }}
                >
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
                <div
                  className="absolute bottom-0 w-0 group-hover:w-full h-1 bg-gradient-flamme transition-all duration-500"
                  style={isAr ? { right: 0 } : { left: 0 }}
                />
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
                {t('process.eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl">
              {t('process.headline')}
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
        <div
          className="absolute top-0 bottom-0 w-2 bg-gradient-flamme"
          style={isAr ? { right: 0 } : { left: 0 }}
        />
        <div className="absolute inset-0 stripe-accent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold uppercase text-2xl md:text-3xl mb-2">
              {t('cta.headline')}
            </h2>
            <p className="text-acier-400">
              {t('cta.subtext')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/devis`} className="btn-flamme rounded">
              {t('cta.devis')}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/${locale}/realisations`}
              className="inline-flex items-center gap-2 border border-flamme-400/40 text-flamme-400 hover:bg-flamme-400/10 px-8 py-4 font-display uppercase tracking-wider text-sm transition-colors rounded"
            >
              {t('cta.real')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
