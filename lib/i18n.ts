import { Locale } from '@/types';

export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export const translations = {
  zh: {
    site: {
      title: 'Chao的部落格',
      description: '分享技術見解與生活感悟',
    },
    nav: {
      home: '首頁',
      about: '關於我',
      categories: '分類',
      search: '搜尋',
      language: '語言',
    },
    post: {
      readMore: '閱讀更多',
      readTime: '分鐘閱讀',
      publishedOn: '發佈於',
      lastUpdated: '最後更新',
      category: '分類',
      tags: '標籤',
      relatedPosts: '相關文章',
      comments: '留言',
      share: '分享',
      backToHome: '回到首頁',
    },
    category: {
      allPosts: '所有文章',
      postsInCategory: '篇文章在',
    },
    search: {
      placeholder: '搜尋文章...',
      results: '搜尋結果',
      noResults: '沒有找到相關文章',
      found: '找到',
      articles: '篇文章',
    },
    about: {
      title: '關於我',
      description: '歡迎來到我的部落格',
    },
    pagination: {
      prev: '上一頁',
      next: '下一頁',
      page: '第',
      of: '頁，共',
      pages: '頁',
    },
    common: {
      loading: '載入中...',
      error: '發生錯誤',
      notFound: '頁面不存在',
      goHome: '回到首頁',
    },
  },
  en: {
    site: {
      title: "Chao's Blog",
      description: 'Sharing technical insights and life reflections',
    },
    nav: {
      home: 'Home',
      about: 'About',
      categories: 'Categories',
      search: 'Search',
      language: 'Language',
    },
    post: {
      readMore: 'Read More',
      readTime: 'min read',
      publishedOn: 'Published on',
      lastUpdated: 'Last updated',
      category: 'Category',
      tags: 'Tags',
      relatedPosts: 'Related Posts',
      comments: 'Comments',
      share: 'Share',
      backToHome: 'Back to Home',
    },
    category: {
      allPosts: 'All Posts',
      postsInCategory: 'posts in',
    },
    search: {
      placeholder: 'Search articles...',
      results: 'Search Results',
      noResults: 'No articles found',
      found: 'Found',
      articles: 'articles',
    },
    about: {
      title: 'About Me',
      description: 'Welcome to my blog',
    },
    pagination: {
      prev: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
      pages: 'pages',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      notFound: 'Page not found',
      goHome: 'Go Home',
    },
  },
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

