

## 新增 FAQ 常見問題頁面

### 概述

在網站中加入一個 FAQ（常見問題）區塊，使用手風琴（Accordion）元件展示使用者可能遇到的問題與細節資訊。FAQ 會以一個獨立的對話框（Dialog）呈現，從 Header 的導航列中開啟。

### FAQ 內容規劃

包含以下類別的問題：

**基本使用**
- 什麼是 KCouper？— 說明網站用途
- 優惠券多久更新一次？— 說明資料來源與更新頻率
- 如何使用優惠券？— 到店出示優惠碼的流程

**搜尋與篩選**
- 如何搜尋特定品項？— 說明搜尋框與品項篩選按鈕的使用方式
- 品項篩選的數量功能是什麼？— 說明 +/- 數量篩選（新功能）
- 「搜尋口味」開關是做什麼的？— 說明 searchAllOptions 的功能
- 如何排序優惠券？— 說明排序選項

**收藏與比較**
- 如何收藏優惠券？— 說明收藏功能與 localStorage 儲存
- 收藏的優惠券會保留多久？— 說明過期券會自動移除
- 如何比較優惠券？— 說明比較功能的操作方式

**其他**
- 如何分享優惠券給朋友？— 說明分享連結功能
- 如何切換深色/淺色主題？— 說明主題切換
- 舊版網站還能用嗎？— 說明 v1 連結

### UI 設計

- 從 Header 加入一個「常見問題」按鈕（使用 `HelpCircle` 圖示）
- 點擊後開啟一個 Dialog，內容使用 Accordion 元件逐條展開
- 在手機版的 Sheet 選單中也加入對應的選單項目
- FAQ 內容集中管理在 `src/data/faq.ts` 資料檔中

### 技術細節

#### 1. 新增 `src/data/faq.ts` — FAQ 資料

```text
定義 FAQ 型別與資料陣列：
- FaqItem: { id, question, answer, category }
- FaqCategory: 'basic' | 'search' | 'favorite' | 'other'
- FAQ_ITEMS: FaqItem[]
```

#### 2. 新增 `src/components/FaqDialog.tsx` — FAQ 對話框元件

- 使用 Dialog + ScrollArea + Accordion 組合
- 按類別分組顯示問題
- 支援兩種觸發方式：圖示按鈕（桌面版）與選單項目（手機版）
- 接受 `variant` prop 控制觸發方式（類似 AnnouncementButton 的設計模式）

#### 3. 修改 `src/components/Header.tsx` — 加入 FAQ 入口

- 桌面版導航列中加入 FaqDialog（圖示按鈕形式）
- 手機版 Sheet 選單中加入 FaqDialog（選單項目形式）

### 影響範圍

| 檔案 | 變更 |
|---|---|
| `src/data/faq.ts` | 新增 — FAQ 資料定義 |
| `src/components/FaqDialog.tsx` | 新增 — FAQ 對話框元件 |
| `src/components/Header.tsx` | 修改 — 加入 FAQ 按鈕 |

