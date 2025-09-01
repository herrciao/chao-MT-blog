import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/posts';
import { Locale } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const locale = (searchParams.get('locale') as Locale) || 'zh';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const results = searchPosts(query, locale);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json([]);
  }
}
