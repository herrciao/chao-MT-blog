---
title: "Next.js 14 Complete Guide: From Basics to Production"
description: "Deep dive into Next.js 14's new features, including App Router, Server Components, and best practices for modern web development."
date: "2024-01-20"
author: "Chao"
category: "Technology"
tags: ["Next.js", "React", "Frontend Development", "Tutorial"]
featured: true
published: true
commentsEnabled: true
seo:
  title: "Next.js 14 Complete Guide - App Router & Server Components Tutorial"
  description: "Learn Next.js 14's latest features, master App Router, Server Components, and performance optimization techniques."
  keywords: ["Next.js 14", "App Router", "Server Components", "React", "Frontend Framework"]
---

# Next.js 14 Complete Guide: From Basics to Production

Next.js 14 brings many exciting new features and improvements. In this article, we'll explore these new capabilities and learn how to apply them in real-world projects.

## Key New Features in Next.js 14

### 1. Stable App Router

The App Router is now stable, providing better file-system routing and layout system:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 2. Power of Server Components

Server Components allow us to render components on the server, reducing client-side JavaScript burden:

```typescript
// app/posts/page.tsx
import { getPosts } from '@/lib/posts'

export default async function PostsPage() {
  const posts = await getPosts() // Executed on server
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### 3. Improved Turbopack

Turbopack is a Webpack alternative that provides faster development experience:

```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

## Project Structure Best Practices

Here's my recommended Next.js 14 project structure:

```
my-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── posts/
│       ├── [slug]/
│       │   └── page.tsx
│       └── page.tsx
├── components/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── utils.ts
│   └── api.ts
└── types/
    └── index.ts
```

## Performance Optimization Tips

### 1. Using Streaming

```typescript
import { Suspense } from 'react'
import { PostList } from '@/components/PostList'
import { PostSkeleton } from '@/components/PostSkeleton'

export default function PostsPage() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <Suspense fallback={<PostSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  )
}
```

### 2. Image Optimization

```typescript
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={400}
      priority
      className="rounded-lg"
    />
  )
}
```

### 3. Font Optimization

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## SEO Best Practices

### Dynamic Metadata

```typescript
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}
```

### Structured Data

```typescript
export default function PostPage({ post }: { post: Post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>{/* Article content */}</article>
    </>
  )
}
```

## Deploying to Vercel

1. **Connect GitHub Repository**
2. **Set Environment Variables**
3. **Configure Custom Domain**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig
```

## Summary

Next.js 14 brings us many powerful features:

- ✅ Stable App Router
- ✅ Powerful Server Components
- ✅ Faster Turbopack
- ✅ Excellent SEO Support
- ✅ Built-in Performance Optimizations

These features allow us to build faster, more scalable web applications. Whether you're just starting with React or you're an experienced developer, Next.js 14 is worth diving deep into.

## Further Reading

- [Next.js Official Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

In the next article, we'll explore how to implement internationalization (i18n) in Next.js. Stay tuned!

