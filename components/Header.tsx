'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/realisations`, label: t('nav.realisations') },
    { href: `/${locale}/devis`, label: t('nav.devis') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charbon-900/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-gradient-flamme rotate-45 transition-transform duration-300 group-hover:rotate-[54deg] flex items-center justify-center rounded-sm">
            <span className="text-white font-display font-bold text-lg -rotate-45">
              R
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-widest text-sm uppercase leading-tight">
              Rénovation
            </span>
            <span className="font-mono text-flamme-400 text-[10px] tracking-wider">
              Carrelage · Placo · Peinture
            </span>
          </div>
          <div className="drapeau-bar ms-2">
            <span /><span /><span />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display uppercase tracking-wider text-sm underline-flamme ${
                pathname === link.href ? 'text-flamme-400 active' : 'text-white hover:text-flamme-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LangSwitcher />
          <a href="tel:0649427544" className="btn-flamme text-sm py-2 px-6 rounded">
            <Phone size={16} />
            06 49 42 75 44
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-charbon-900/98 backdrop-blur-md border-t border-charbon-600 animate-fadeIn">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-display uppercase tracking-wider text-lg ${
                  pathname === link.href ? 'text-flamme-400' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LangSwitcher />
            <a
              href="tel:0649427544"
              className="btn-flamme text-sm py-3 px-6 rounded text-center mt-2"
            >
              <Phone size={16} />
              06 49 42 75 44
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
