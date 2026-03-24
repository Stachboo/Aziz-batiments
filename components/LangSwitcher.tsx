'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = () => {
    const targetLocale = locale === 'fr' ? 'ar' : 'fr';
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.replace(/^\/(fr|ar)/, '') || '/';
    const newPath = '/' + targetLocale + pathWithoutLocale;
    document.cookie = `NEXT_LOCALE=${targetLocale};max-age=31536000;path=/`;
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="border border-charbon-500 hover:border-flamme-400 px-3 py-1.5 rounded-full font-display text-sm text-acier-200 hover:text-white transition-colors"
    >
      {locale === 'fr' ? '🇲🇦 عربي' : '🇫🇷 Français'}
    </button>
  );
}
