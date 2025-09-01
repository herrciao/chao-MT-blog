# Chao的部落格網站

一個功能完整的雙語部落格網站，使用 Next.js 14 和 Tailwind CSS 構建。

## 功能特色

- ✅ **雙語支援**：繁體中文與英文切換
- ✅ **現代化設計**：使用 Tailwind CSS 打造簡潔專業的界面
- ✅ **Markdown 文章系統**：支援 Markdown 格式的文章撰寫
- ✅ **文章管理**：分類、標籤、搜尋功能
- ✅ **留言系統**：整合 Giscus 評論系統
- ✅ **SEO 優化**：多語言 SEO 支援
- ✅ **響應式設計**：支援各種設備尺寸
- ✅ **效能優化**：靜態生成，快速載入

## 技術架構

- **框架**：Next.js 14 with App Router
- **樣式**：Tailwind CSS
- **內容管理**：Markdown + Gray Matter
- **國際化**：自訂 i18n 系統
- **留言系統**：Giscus
- **部署**：Vercel
- **語言**：TypeScript

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

複製 `env.example` 為 `.env.local`：

```bash
cp env.example .env.local
```

編輯 `.env.local` 文件，填入你的配置：

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### 3. 啟動開發服務器

```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看網站。

## 專案結構

```
├── app/                    # Next.js App Router 頁面
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   ├── page.tsx           # 首頁（中文）
│   ├── about/             # 關於頁面
│   ├── posts/             # 文章頁面
│   └── en/                # 英文版本頁面
├── components/            # React 組件
│   ├── layout/           # 佈局組件
│   ├── ui/               # UI 組件
│   ├── PostCard.tsx      # 文章卡片
│   └── Giscus.tsx        # 留言組件
├── content/              # 文章內容
│   └── posts/
│       ├── zh/           # 中文文章
│       └── en/           # 英文文章
├── lib/                  # 工具函數
│   ├── posts.ts          # 文章處理
│   ├── i18n.ts           # 國際化
│   └── utils.ts          # 通用工具
└── types/                # TypeScript 類型
```

## 文章撰寫

### 新增文章

1. 在 `content/posts/zh/` 或 `content/posts/en/` 資料夾中創建新的 `.md` 文件
2. 使用 Front Matter 格式添加文章元數據：

```markdown
---
title: "文章標題"
description: "文章描述"
date: "2024-01-15"
author: "Chao"
category: "技術"
tags: ["Next.js", "React", "Web開發"]
featured: true
published: true
commentsEnabled: true
seo:
  title: "SEO 標題"
  description: "SEO 描述"
  keywords: ["關鍵字1", "關鍵字2"]
---

# 文章內容

這裡是文章的內容...
```

### 支援的 Front Matter 欄位

- `title`：文章標題（必填）
- `description`：文章摘要（必填）
- `date`：發布日期（必填）
- `author`：作者名稱
- `category`：分類
- `tags`：標籤陣列
- `featured`：是否為精選文章
- `published`：是否發布
- `commentsEnabled`：是否啟用留言
- `seo`：SEO 相關設定

## 部署到 Vercel

### 1. 準備工作

- 將程式碼推送到 GitHub
- 確保已設定好 `.env.local` 文件

### 2. 連接 Vercel

1. 訪問 [Vercel](https://vercel.com)
2. 點擊「New Project」
3. 導入你的 GitHub 儲存庫
4. 設定環境變數
5. 點擊「Deploy」

### 3. 自訂網域

在 Vercel 專案設定中：

1. 進入「Domains」頁面
2. 添加你在 GoDaddy 購買的網域
3. 根據指示設定 DNS 記錄

### 4. DNS 設定（GoDaddy）

在 GoDaddy DNS 管理中添加：

```
類型: CNAME
名稱: www
值: your-project.vercel.app

類型: A
名稱: @
值: 76.76.19.61
```

## 留言系統設定

### 啟用 Giscus

1. 前往 [Giscus 網站](https://giscus.app/)
2. 按照指示設定你的 GitHub 儲存庫
3. 獲取配置信息並更新 `.env.local`

### 留言系統特色

- 使用 GitHub Discussions
- 支援多語言
- 輕量級且安全
- 支援 Markdown

## SEO 優化

### 多語言 SEO

- 自動生成 `hreflang` 標籤
- 正確的 URL 結構（`/` 中文，`/en/` 英文）
- 語言切換保持相同頁面

### 技術 SEO

- 自動生成 sitemap
- 結構化資料
- 優化的 meta 標籤
- 快速載入速度

## 自訂與擴展

### 修改設計

編輯 `tailwind.config.js` 來自訂樣式：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 你的品牌色彩
        }
      }
    }
  }
}
```

### 添加新頁面

1. 在 `app/` 資料夾中創建新頁面
2. 同時在 `app/en/` 中創建英文版本
3. 更新導航選單

### 修改翻譯

編輯 `lib/i18n.ts` 文件來修改翻譯內容。

## 效能優化

- 使用 Next.js 靜態生成
- 圖片自動優化
- 字體優化
- CSS 最小化
- 自動代碼分割

## 瀏覽器支援

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

MIT License

## 聯繫

如有問題，請聯繫：
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

感謝使用 Chao的部落格網站模板！

# 部署觸發 - 2025年 9月 1日 週一 13時40分14秒 CEST
