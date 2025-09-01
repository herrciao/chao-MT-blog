import { getAllPosts, getCategories } from '@/lib/posts';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/PostCard';
import { getTranslation } from '@/lib/i18n';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chao的部落格',
  description: '分享技術見解與生活感悟',
};

export default function HomePage() {
  const locale = 'zh';
  const posts = getAllPosts(locale);
  const categories = getCategories(locale);
  const t = getTranslation(locale);
  
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  return (
    <Layout locale={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.site.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.site.description}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {locale === 'zh' ? '精選文章' : 'Featured Posts'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} locale={locale} />
                  ))}
                </div>
              </section>
            )}

            {/* Recent Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {locale === 'zh' ? '最新文章' : 'Recent Posts'}
                </h2>
                <Link
                  href="/posts"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {locale === 'zh' ? '查看全部' : 'View All'}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.nav.categories}
                </h3>
                <div className="space-y-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="flex items-center justify-between text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.nav.about}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {locale === 'zh' 
                    ? '歡迎來到我的部落格！在這裡我分享關於技術、程式設計和生活的見解與感悟。'
                    : 'Welcome to my blog! Here I share insights and reflections on technology, programming, and life.'
                  }
                </p>
                <Link
                  href="/about"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {locale === 'zh' ? '了解更多' : 'Learn More'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

