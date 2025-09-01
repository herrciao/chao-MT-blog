import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import readingTime from 'reading-time';
import { Post, Category, Tag, Locale } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs(locale: Locale): string[] {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }
  return fs.readdirSync(localeDir).filter(name => name.endsWith('.md'));
}

export function getPostBySlug(slug: string, locale: Locale): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, locale, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown content
    const processedContent = remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .processSync(content);
    
    const contentHtml = processedContent.toString();
    const stats = readingTime(content);
    
    return {
      slug: realSlug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Anonymous',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      content: contentHtml,
      readingTime: stats.text,
      featured: data.featured || false,
      published: data.published !== false,
      commentsEnabled: data.commentsEnabled !== false,
      seo: data.seo || {},
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(locale: Locale): Post[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map(slug => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export function getPostsByCategory(category: string, locale: Locale): Post[] {
  return getAllPosts(locale).filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string, locale: Locale): Post[] {
  return getAllPosts(locale).filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getCategories(locale: Locale): Category[] {
  const posts = getAllPosts(locale);
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const category = post.category;
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }));
}

export function getTags(locale: Locale): Tag[] {
  const posts = getAllPosts(locale);
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }));
}

export function searchPosts(query: string, locale: Locale): Post[] {
  const posts = getAllPosts(locale);
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getRelatedPosts(currentPost: Post, locale: Locale, limit = 3): Post[] {
  const allPosts = getAllPosts(locale).filter(post => post.slug !== currentPost.slug);
  
  // Score posts based on category and tag similarity
  const scoredPosts = allPosts.map(post => {
    let score = 0;
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 3;
    }
    
    // Shared tags get points
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length;
    
    return { post, score };
  });
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

