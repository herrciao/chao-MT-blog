'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/PostCard';
import { searchPosts } from '@/lib/posts';
import { getTranslation } from '@/lib/i18n';
import { Post } from '@/types';
import { Button } from '@/components/ui/Button';

export default function EnglishSearchPage() {
  const locale = 'en';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const t = getTranslation(locale);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // 模擬搜尋延遲
    setTimeout(() => {
      const searchResults = searchPosts(searchQuery, locale);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <Layout locale={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Articles
          </h1>
          <p className="text-xl text-gray-600">
            Find content that interests you
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 pr-16 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                </div>
              )}
            </div>
          </form>

          {/* Search Tips */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Tip: You can search by title, description, category, or tags</p>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-5xl mx-auto">
          {hasSearched && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <p className="text-gray-600 mt-1">
                {isSearching 
                  ? 'Searching...' 
                  : `Found ${results.length} articles${query ? ` for "${query}"` : ''}`
                }
              </p>
            </div>
          )}

          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          ) : hasSearched && query.trim() ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                Try different keywords or browse our categories
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setQuery('')}>
                  Clear Search
                </Button>
                <Button variant="primary" onClick={() => window.location.href = '/en/categories'}>
                  Browse Categories
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Searching</h3>
              <p className="text-gray-600">
                Enter keywords above to search for articles
              </p>
            </div>
          )}
        </div>

        {/* Popular Search Terms */}
        {!hasSearched && (
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Next.js', 'React', 'Frontend', 'Technology', 'TypeScript', 'Web Development'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

