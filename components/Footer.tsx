'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/realisations`, label: t('nav.realisations') },
    { href: `/${locale}/devis`, label: t('nav.devis') },
  ];

  return (
    <footer className="relative bg-charbon-900 border-t border-charbon-600">
      <div className="absolute inset-0 stripe-accent opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-flamme rotate-45 flex items-center justify-center rounded-sm">
                <span className="text-white font-display font-bold text-sm -rotate-45">
                  R
                </span>
              </div>
              <span className="font-display tracking-widest text-sm uppercase">
                {t('brand.name')}
              </span>
              <div className="drapeau-bar ms-1">
                <span /><span /><span />
              </div>
            </div>
            <p className="text-acier-400 text-sm leading-relaxed mb-4">
              {t('footer.desc')}
            </p>
            <p className="font-mono text-xs text-acier-400">
              {t('footer.siret')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-flamme-400 font-display uppercase tracking-widest text-sm mb-6">
              {t('footer.nav')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-acier-400 hover:text-white transition-colors text-sm"
                  >
                    <span
                      className="w-0 group-hover:w-4 h-px bg-flamme-400 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-flamme-400 font-display uppercase tracking-widest text-sm mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0649427544"
                  dir="ltr"
                  className="group flex items-center gap-3 text-acier-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-9 h-9 flex items-center justify-center border border-charbon-500 rounded group-hover:border-flamme-400 group-hover:text-flamme-400 transition-colors">
                    <Phone size={16} />
                  </span>
                  06 49 42 75 44
                </a>
              </li>
              <li>
                <a
                  href="mailto:hadriabdelaziz1965@gmail.com"
                  dir="ltr"
                  className="group flex items-center gap-3 text-acier-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-9 h-9 flex items-center justify-center border border-charbon-500 rounded group-hover:border-flamme-400 group-hover:text-flamme-400 transition-colors">
                    <Mail size={16} />
                  </span>
                  hadriabdelaziz1965@gmail.com
                </a>
              </li>
              <li>
                <div className="group flex items-center gap-3 text-acier-400 text-sm">
                  <span className="w-9 h-9 flex items-center justify-center border border-charbon-500 rounded group-hover:border-flamme-400 group-hover:text-flamme-400 transition-colors">
                    <MapPin size={16} />
                  </span>
                  {t('footer.location')}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-charbon-600 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-acier-400 text-xs">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-2 text-xs text-acier-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {t('footer.available')}
          </div>
        </div>
      </div>
    </footer>
  );
}
