import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getAllPosts } from '@/lib/posts';
import { Layout } from '@/components/layout/Layout';
import { getTranslation } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all article categories and find topics that interest you.',
  alternates: {
    canonical: '/en/categories',
    languages: {
      'zh-TW': '/categories',
      'en-US': '/en/categories',
    },
  },
};

export default function EnglishCategoriesPage() {
  const locale = 'en';
  const categories = getCategories(locale);
  const allPosts = getAllPosts(locale);
  const t = getTranslation(locale);

  return (
    <Layout locale={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Categories
          </h1>
          <p className="text-xl text-gray-600">
            Browse {allPosts.length} articles across {categories.length} categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/en/categories/${category.slug}`}
              className="group"
            >
              <div className="card hover:shadow-lg transition-all duration-200 group-hover:border-primary-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h2>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {category.count}
                  </span>
                </div>
                
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                )}
                
                <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                  View Articles
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Categories Yet</h3>
            <p className="text-gray-600">
              There are no article categories available at the moment.
              <Link href="/en" className="text-primary-600 hover:text-primary-700 ml-1">
                Back to Home
              </Link>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

