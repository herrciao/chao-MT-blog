import Link from 'next/link';
import { Post, Locale } from '@/types';
import { formatDate, getLocalePath, truncate } from '@/lib/utils';
import { getTranslation } from '@/lib/i18n';

interface PostCardProps {
  post: Post;
  locale: Locale;
  showExcerpt?: boolean;
}

export function PostCard({ post, locale, showExcerpt = true }: PostCardProps) {
  const t = getTranslation(locale);

  return (
    <article className="card hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={post.date}>
            {formatDate(post.date, locale)}
          </time>
          <span>{post.readingTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
          <Link href={getLocalePath(`/posts/${post.slug}`, locale)}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {showExcerpt && post.description && (
          <p className="text-gray-600 leading-relaxed">
            {truncate(post.description, 150)}
          </p>
        )}

        {/* Category and Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={getLocalePath(`/categories/${post.category.toLowerCase()}`, locale)}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
          >
            {post.category}
          </Link>
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={getLocalePath(`/tags/${tag.toLowerCase()}`, locale)}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Read more */}
        <div className="pt-2">
          <Link
            href={getLocalePath(`/posts/${post.slug}`, locale)}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            {t.post.readMore}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

