export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  readingTime: string;
  featured?: boolean;
  published: boolean;
  commentsEnabled?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
    social?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      email?: string;
    };
  };
  navigation: {
    home: string;
    about: string;
    categories: string;
    search: string;
  };
  comments?: {
    provider: 'giscus' | 'disqus';
    config: any;
  };
}

export type Locale = 'zh' | 'en';

