---
title: "Next.js 14 完整指南：從入門到實戰"
description: "深入了解 Next.js 14 的新功能，包括 App Router、Server Components 和最佳實踐。"
date: "2024-01-20"
author: "Chao"
category: "技術"
tags: ["Next.js", "React", "前端開發", "教學"]
featured: true
published: true
commentsEnabled: true
seo:
  title: "Next.js 14 完整指南 - App Router 與 Server Components 實戰教學"
  description: "學習 Next.js 14 最新功能，掌握 App Router、Server Components 和效能優化技巧。"
  keywords: ["Next.js 14", "App Router", "Server Components", "React", "前端框架"]
---

# Next.js 14 完整指南：從入門到實戰

Next.js 14 帶來了許多令人興奮的新功能和改進。在這篇文章中，我們將深入探討這些新特性，並學習如何在實際專案中應用它們。

## Next.js 14 的主要新功能

### 1. 穩定的 App Router

App Router 現在已經穩定，提供了更好的檔案系統路由和佈局系統：

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
```

### 2. Server Components 的威力

Server Components 讓我們可以在伺服器端渲染組件，減少客戶端的 JavaScript 負擔：

```typescript
// app/posts/page.tsx
import { getPosts } from '@/lib/posts'

export default async function PostsPage() {
  const posts = await getPosts() // 在伺服器端執行
  
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

### 3. 改進的 Turbopack

Turbopack 是 Webpack 的替代品，提供了更快的開發體驗：

```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

## 專案結構最佳實踐

以下是我推薦的 Next.js 14 專案結構：

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

## 效能優化技巧

### 1. 使用 Streaming

```typescript
import { Suspense } from 'react'
import { PostList } from '@/components/PostList'
import { PostSkeleton } from '@/components/PostSkeleton'

export default function PostsPage() {
  return (
    <div>
      <h1>部落格文章</h1>
      <Suspense fallback={<PostSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  )
}
```

### 2. 圖片優化

```typescript
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="英雄圖片"
      width={800}
      height={400}
      priority
      className="rounded-lg"
    />
  )
}
```

### 3. 字體優化

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
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## SEO 最佳實踐

### 動態 Metadata

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

### 結構化資料

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
      <article>{/* 文章內容 */}</article>
    </>
  )
}
```

## 部署到 Vercel

1. **連接 GitHub 儲存庫**
2. **設定環境變數**
3. **配置自訂網域**

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

## 總結

Next.js 14 為我們帶來了許多強大的功能：

- ✅ 穩定的 App Router
- ✅ 強大的 Server Components
- ✅ 更快的 Turbopack
- ✅ 優秀的 SEO 支援
- ✅ 內建的效能優化

這些功能讓我們能夠建立更快、更可擴展的 Web 應用程式。無論你是剛開始學習 React，還是經驗豐富的開發者，Next.js 14 都值得你深入學習。

## 延伸閱讀

- [Next.js 官方文件](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Vercel 部署指南](https://vercel.com/docs)

---

下一篇文章我們將探討如何在 Next.js 中實現國際化（i18n），敬請期待！

