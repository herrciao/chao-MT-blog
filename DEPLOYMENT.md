# 部署指南

本指南將幫助你將 Chao 部落格網站部署到 Vercel 並設定自訂網域。

## 準備工作

### 1. 確保程式碼已推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. 設定環境變數

複製 `env.example` 為 `.env.local`：

```bash
cp env.example .env.local
```

編輯 `.env.local` 並填入你的設定：

```env
# 網站設定
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Chao的部落格

# Giscus 留言系統設定
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id

# SEO
GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

## 部署到 Vercel

### 方法一：透過 Vercel 網站部署

1. **前往 Vercel**
   - 訪問 [vercel.com](https://vercel.com)
   - 使用 GitHub 帳號登入

2. **創建新專案**
   - 點擊 "New Project"
   - 選擇你的 GitHub 儲存庫
   - 點擊 "Import"

3. **專案設定**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **環境變數設定**
   - 在專案設定中添加環境變數
   - 複製 `.env.local` 中的所有變數

5. **部署**
   - 點擊 "Deploy"
   - 等待部署完成

### 方法二：使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署（在專案根目錄執行）
vercel

# 部署到 production
vercel --prod
```

## 設定自訂網域（GoDaddy）

### 1. 在 Vercel 中添加網域

1. 進入你的 Vercel 專案控制台
2. 點擊 "Settings" > "Domains"
3. 點擊 "Add Domain"
4. 輸入你的網域名稱（例如：yourdomain.com）
5. 點擊 "Add"

### 2. 在 GoDaddy 設定 DNS

登入 GoDaddy 並進入你的網域管理：

1. **添加 A 記錄（根網域）**
   ```
   類型: A
   名稱: @
   值: 76.76.19.61
   TTL: 600 秒
   ```

2. **添加 CNAME 記錄（www 子網域）**
   ```
   類型: CNAME
   名稱: www
   值: cname.vercel-dns.com
   TTL: 600 秒
   ```

3. **（可選）添加其他子網域**
   ```
   類型: CNAME
   名稱: blog
   值: cname.vercel-dns.com
   TTL: 600 秒
   ```

### 3. 驗證設定

- DNS 變更可能需要 24-48 小時才能完全生效
- 可以使用 `dig` 或線上 DNS 檢查工具驗證設定
- 在 Vercel 控制台中檢查網域狀態

## SSL 憑證

Vercel 會自動為你的自訂網域提供免費的 SSL 憑證（Let's Encrypt）。一旦 DNS 設定正確，憑證會自動配置。

## 設定 Giscus 留言系統

### 1. 啟用 GitHub Discussions

1. 進入你的 GitHub 儲存庫
2. 點擊 "Settings"
3. 滾動到 "Features" 區域
4. 勾選 "Discussions"

### 2. 獲取 Giscus 配置

1. 訪問 [giscus.app](https://giscus.app)
2. 輸入你的儲存庫資訊
3. 選擇設定選項
4. 複製生成的配置資訊
5. 更新你的環境變數

## 效能監控

### Vercel Analytics

1. 在 Vercel 專案設定中啟用 "Analytics"
2. 查看網站效能數據

### Google Analytics

如果你想使用 Google Analytics：

1. 創建 GA 屬性
2. 獲取 Measurement ID
3. 在環境變數中添加：
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## 自動部署

設定好 Vercel 後，每次推送到 `main` 分支都會自動觸發部署：

```bash
git add .
git commit -m "Update content"
git push origin main
```

## 故障排除

### 常見問題

1. **部署失敗**
   - 檢查 build logs
   - 確保所有依賴都已安裝
   - 檢查 TypeScript 錯誤

2. **網域無法存取**
   - 檢查 DNS 設定
   - 等待 DNS 傳播完成
   - 確認 A 記錄和 CNAME 記錄正確

3. **環境變數問題**
   - 確保所有必要的環境變數都已設定
   - 檢查變數名稱是否正確
   - 重新部署專案

### 檢查工具

- DNS 檢查：`dig yourdomain.com`
- SSL 檢查：[SSL Labs](https://www.ssllabs.com/ssltest/)
- 網站速度：[PageSpeed Insights](https://pagespeed.web.dev/)

## 維護與更新

### 更新內容

1. 在 `content/posts/` 中添加新文章
2. 推送到 GitHub
3. Vercel 會自動重新建構和部署

### 更新程式碼

1. 修改程式碼
2. 測試本地運行：`npm run dev`
3. 推送到 GitHub
4. 檢查 Vercel 部署狀態

### 備份

- GitHub 儲存庫已經是你的程式碼備份
- 定期下載 Vercel 專案設定
- 備份環境變數配置

## 成功部署檢查清單

- [ ] 程式碼已推送到 GitHub
- [ ] Vercel 專案已創建並成功部署
- [ ] 環境變數已正確設定
- [ ] 自訂網域已添加到 Vercel
- [ ] DNS 記錄已在 GoDaddy 中設定
- [ ] SSL 憑證已自動配置
- [ ] Giscus 留言系統已設定
- [ ] 網站可以正常存取
- [ ] 語言切換功能正常
- [ ] 搜尋功能正常
- [ ] 分類頁面正常

## 支援

如果遇到問題：

1. 查看 [Next.js 文件](https://nextjs.org/docs)
2. 查看 [Vercel 文件](https://vercel.com/docs)
3. 檢查 GitHub Issues
4. 聯繫技術支援

---

恭喜！你的部落格網站現在已經成功部署並可以在全世界存取了！🎉

