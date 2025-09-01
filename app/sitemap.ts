import { MetadataRoute } from 'next';
import { getAllPosts, getCategories } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // 獲取所有文章和分類
  const zhPosts = getAllPosts('zh');
  const enPosts = getAllPosts('en');
  const zhCategories = getCategories('zh');
  const enCategories = getCategories('en');

  // 靜態頁面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          'zh-TW': baseUrl,
          'en-US': `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'zh-TW': `${baseUrl}/about`,
          'en-US': `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'zh-TW': `${baseUrl}/categories`,
          'en-US': `${baseUrl}/en/categories`,
        },
      },
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          'zh-TW': `${baseUrl}/search`,
          'en-US': `${baseUrl}/en/search`,
        },
      },
    },
  ];

  // 中文文章頁面
  const zhPostPages: MetadataRoute.Sitemap = zhPosts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        'zh-TW': `${baseUrl}/posts/${post.slug}`,
        'en-US': `${baseUrl}/en/posts/${post.slug}`,
      },
    },
  }));

  // 英文文章頁面
  const enPostPages: MetadataRoute.Sitemap = enPosts.map((post) => ({
    url: `${baseUrl}/en/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        'zh-TW': `${baseUrl}/posts/${post.slug}`,
        'en-US': `${baseUrl}/en/posts/${post.slug}`,
      },
    },
  }));

  // 中文分類頁面
  const zhCategoryPages: MetadataRoute.Sitemap = zhCategories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        'zh-TW': `${baseUrl}/categories/${category.slug}`,
        'en-US': `${baseUrl}/en/categories/${category.slug}`,
      },
    },
  }));

  // 英文分類頁面
  const enCategoryPages: MetadataRoute.Sitemap = enCategories.map((category) => ({
    url: `${baseUrl}/en/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        'zh-TW': `${baseUrl}/categories/${category.slug}`,
        'en-US': `${baseUrl}/en/categories/${category.slug}`,
      },
    },
  }));

  return [
    ...staticPages,
    ...zhPostPages,
    ...enPostPages,
    ...zhCategoryPages,
    ...enCategoryPages,
  ];
}

