import clsx, { type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { zhTW, enUS } from 'date-fns/locale';
import { Locale } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = parseISO(dateString);
  const localeMap = {
    zh: zhTW,
    en: enUS,
  };
  
  return format(date, 'PPP', { locale: localeMap[locale] });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function generateSEOUrl(slug: string, locale: Locale): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return locale === 'zh' ? `${baseUrl}/${slug}` : `${baseUrl}/en/${slug}`;
}

export function getLocalePath(path: string, locale: Locale): string {
  if (locale === 'zh') {
    return path;
  }
  return `/en${path}`;
}

export function extractTextFromHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
