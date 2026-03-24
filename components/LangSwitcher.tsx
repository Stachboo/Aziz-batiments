'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const targetLocale = locale === 'fr' ? 'ar' : 'fr';
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`);
    document.cookie = `NEXT_LOCALE=${targetLocale};max-age=31536000;path=/`;
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 border border-charbon-500 hover:border-flamme-400 text-acier-200 hover:text-white font-display text-sm px-3 py-1.5 transition-all duration-200"
      aria-label="Changer de langue"
    >
      {locale === 'fr' ? (
        <span>🇲🇦 عربي</span>
      ) : (
        <span>🇫🇷 Français</span>
      )}
    </button>
  );
}
