import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { Layout } from '@/components/layout/Layout';
import { PostCard } from '@/components/PostCard';
import { formatDate, getLocalePath } from '@/lib/utils';
import { getTranslation } from '@/lib/i18n';
import { Giscus } from '@/components/Giscus';

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts('zh');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, 'zh');
  
  if (!post) {
    return {
      title: '文章不存在',
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.description,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const locale = 'zh';
  const post = getPostBySlug(params.slug, locale);
  const t = getTranslation(locale);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, locale);

  return (
    <Layout locale={locale}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link 
                href={getLocalePath(`/categories/${post.category.toLowerCase()}`, locale)}
                className="hover:text-gray-700"
              >
                {post.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{post.title}</li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href={getLocalePath(`/categories/${post.category.toLowerCase()}`, locale)}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
            >
              {post.category}
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span>{t.post.publishedOn} {formatDate(post.date, locale)}</span>
            </div>
            <div className="flex items-center">
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center">
              <span>{t.post.category}: {post.category}</span>
            </div>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={getLocalePath(`/tags/${tag.toLowerCase()}`, locale)}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.post.backToHome}
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{t.post.share}:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                Facebook
              </a>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.post.relatedPosts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Comments */}
      {post.commentsEnabled && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.post.comments}
          </h2>
          <Giscus />
        </section>
      )}
    </Layout>
  );
}

