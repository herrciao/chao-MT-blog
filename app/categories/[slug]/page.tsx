import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByCategory, getCategories } from '@/lib/posts';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/PostCard';
import { getTranslation } from '@/lib/i18n';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = getCategories('zh');
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const posts = getPostsByCategory(params.slug, 'zh');
  const categories = getCategories('zh');
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: '分類不存在',
    };
  }

  return {
    title: `${category.name} - 文章分類`,
    description: `瀏覽「${category.name}」分類下的所有文章，共 ${posts.length} 篇。`,
    alternates: {
      canonical: `/categories/${params.slug}`,
      languages: {
        'zh-TW': `/categories/${params.slug}`,
        'en-US': `/en/categories/${params.slug}`,
      },
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const locale = 'zh';
  const posts = getPostsByCategory(params.slug, locale);
  const categories = getCategories(locale);
  const category = categories.find(cat => cat.slug === params.slug);
  const t = getTranslation(locale);

  if (!category) {
    notFound();
  }

  return (
    <Layout locale={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                首頁
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-gray-700">
                分類
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
            {category.name}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600">
            共有 {posts.length} 篇文章
          </p>
          {category.description && (
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無文章</h3>
            <p className="text-gray-600">
              「{category.name}」分類目前還沒有文章。
              <Link href="/" className="text-primary-600 hover:text-primary-700 ml-1">
                返回首頁
              </Link>
            </p>
          </div>
        )}

        {/* Other Categories */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">其他分類</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(cat => cat.slug !== params.slug)
              .slice(0, 8)
              .map((otherCategory) => (
                <Link
                  key={otherCategory.slug}
                  href={`/categories/${otherCategory.slug}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="font-medium text-gray-900">{otherCategory.name}</div>
                  <div className="text-sm text-gray-500">{otherCategory.count} 篇文章</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

