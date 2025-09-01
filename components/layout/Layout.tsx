import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Locale } from '@/lib/i18n';

interface LayoutProps {
  children: ReactNode;
  locale: Locale;
}

export function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}

