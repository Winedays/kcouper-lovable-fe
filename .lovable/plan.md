
# 新舊版介面切換功能實作計畫

## 目標
- v2（目前新版）維持在根路徑 `/`
- v1（簡化版）使用純 HTML + JavaScript，放在 `/v1` 路徑
- 兩個版本之間可以互相切換

## 路由規劃

| 路徑 | 內容 | 技術 |
|------|------|------|
| `/` | 目前的完整新版介面 (v2) | React |
| `/v1` | 簡化版佔位頁面 | 純 HTML + JS |

## 實作步驟

### 1. 建立 v1 純 HTML 頁面
在 `public/v1/index.html` 建立靜態 HTML 檔案：
- 不使用任何框架，純 HTML + CSS + JavaScript
- 載入現有的 `/coupon.js` 資料
- 包含 KCouper Logo 與基本導航
- 提供「切換至新版 v2」按鈕
- 保持 KFC 主題風格（紅橙配色）
- 支援深色/淺色模式切換

v1 頁面功能：
- 顯示簡單的優惠券列表
- 基本的搜尋功能（可選）
- 版本切換按鈕導向根路徑 `/`

### 2. 更新 v2 Header 組件
修改 `src/components/Header.tsx`：
- 新增「切換舊版」連結按鈕
- 連結指向 `/v1`

## 技術細節

### 新增檔案
```text
public/v1/index.html   - 純 HTML + JS 的簡化版頁面
```

### 修改檔案
```text
src/components/Header.tsx - 新增版本切換按鈕
```

### Vite 靜態檔案處理
Vite 會自動將 `public` 資料夾的內容作為靜態資源提供。當使用者訪問 `/v1` 時，Vite 會直接返回 `public/v1/index.html`。

### v1 頁面設計
- 簡約的卡片式佈局
- Header 包含 Logo 與「前往新版」按鈕
- 顯示優惠券基本資訊（名稱、價格、優惠碼）
- 支援深淺色模式（使用 CSS media query 或 JS 切換）
- 響應式設計，支援手機與桌面

### v2 Header 版本切換 UI
- 使用小型連結按鈕
- 圖示：使用 SVG 箭頭圖示
- 文字：「舊版」
- 位置：放在導航列的 ThemeToggle 旁邊
