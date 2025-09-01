'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { getTranslation, Locale } from '@/lib/i18n';
import { getLocalePath } from '@/lib/utils';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = getTranslation(locale);

  const navigation = [
    { name: t.nav.home, href: getLocalePath('/', locale) },
    { name: t.nav.categories, href: getLocalePath('/categories', locale) },
    { name: t.nav.about, href: getLocalePath('/about', locale) },
  ];

  const switchLanguage = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    const currentPath = pathname.replace(/^\/en/, '').replace(/^\/zh/, '') || '/';
    const newPath = getLocalePath(currentPath, newLocale);
    router.push(newPath);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={getLocalePath('/', locale)} className="text-xl font-bold text-gray-900">
              {t.site.title}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Link href={getLocalePath('/search', locale)}>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="ml-2 hidden sm:inline">{t.nav.search}</span>
              </Button>
            </Link>

            {/* Language Switch */}
            <Button variant="outline" size="sm" onClick={switchLanguage}>
              {locale === 'zh' ? 'EN' : '中'}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

