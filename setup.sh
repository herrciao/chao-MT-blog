#!/bin/bash

echo "🚀 設定 Chao 部落格網站..."

# 安裝依賴
echo "📦 安裝依賴套件..."
npm install

# 複製環境變數檔案
if [ ! -f .env.local ]; then
    echo "📝 創建環境變數檔案..."
    cp env.example .env.local
    echo "✅ 已創建 .env.local，請編輯此檔案設定你的配置"
else
    echo "✅ .env.local 已存在"
fi

# 創建內容目錄（如果不存在）
mkdir -p content/posts/zh
mkdir -p content/posts/en

echo "✨ 設定完成！"
echo ""
echo "下一步："
echo "1. 編輯 .env.local 設定你的環境變數"
echo "2. 執行 'npm run dev' 啟動開發服務器"
echo "3. 訪問 http://localhost:3000 查看網站"
echo ""
echo "開始寫作："
echo "- 中文文章放在 content/posts/zh/"
echo "- 英文文章放在 content/posts/en/"

