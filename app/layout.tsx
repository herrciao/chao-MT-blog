import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Chao的部落格',
    template: '%s | Chao的部落格',
  },
  description: '分享技術見解與生活感悟',
  keywords: ['部落格', '技術', '程式設計', 'blog', 'technology', 'programming'],
  authors: [{ name: 'Chao' }],
  creator: 'Chao',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: '/',
    siteName: 'Chao的部落格',
    title: 'Chao的部落格',
    description: '分享技術見解與生活感悟',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chao的部落格',
    description: '分享技術見解與生活感悟',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

