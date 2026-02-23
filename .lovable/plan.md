

# 新增分享優惠券功能

## 功能說明
在每張優惠券卡片上新增「分享」按鈕，使用者可透過 Web Share API（手機）或複製連結（桌面）將特定優惠券分享給朋友。分享連結帶有 `?coupon=<coupon_code>` 參數，開啟後自動捲動並高亮該優惠券。

## 使用流程

1. 使用者在卡片上點擊「分享」按鈕
2. 支援 Web Share API 的裝置 → 開啟系統分享面板
3. 不支援的裝置 → 自動複製連結到剪貼簿，顯示 toast 提示「已複製連結」
4. 收到連結的朋友開啟頁面 → 自動捲動到該優惠券並以動畫高亮顯示

## 技術細節

### 修改檔案

**`src/components/CouponCard.tsx`**
- 引入 `Share2` icon（來自 lucide-react）
- 在「查看餐點選項」和「比較」按鈕同一列，新增「分享」按鈕
- 新增 `handleShare` 函式：
  - 組合分享 URL：`window.location.origin + window.location.pathname + ?coupon=<coupon_code>`
  - 若 `navigator.share` 可用 → 呼叫 Web Share API，傳入 `title`（優惠券名稱）、`text`（價格資訊）、`url`
  - 否則 → 使用 `navigator.clipboard.writeText(url)` 複製連結，並用 `toast.success("已複製連結")` 提示
- 新增 `highlightedCode` prop（可選），若 `coupon.coupon_code === highlightedCode`，卡片加上高亮動畫 CSS class
- 更新 memo 比較函式，加入 `highlightedCode` 比較

**`src/components/CouponGrid.tsx`**
- 新增 `highlightedCode` prop，傳遞給每張 `CouponCard`

**`src/pages/Index.tsx`**
- 讀取 URL 的 `?coupon=` query param（使用 `useSearchParams` from react-router-dom）
- 將 `highlightedCode` 傳遞給 `CouponGrid`
- 新增 `useEffect`：當 coupons 載入且 `highlightedCode` 存在時，找到對應卡片 DOM 元素並 `scrollIntoView({ behavior: 'smooth', block: 'center' })`
- 高亮動畫結束後（約 3 秒），清除 query param（使用 `setSearchParams`）

**`src/index.css`**
- 新增 `@keyframes highlight-pulse` 動畫：邊框閃爍 2-3 次後消失
- 新增 `.coupon-highlighted` class，套用該動畫和醒目邊框顏色

### UI 佈局

卡片按鈕區域調整為三個按鈕：

```text
[查看餐點選項] [加入比較] [分享]
```

- 分享按鈕使用 `variant="outline"` 和 `Share2` icon
- 手機版按鈕自動換行（現有的 `flex-col sm:flex-row` 佈局）

### 高亮效果

當透過分享連結開啟時，目標優惠券卡片會：
1. 自動捲動至畫面中央
2. 邊框以 primary 色閃爍 3 次（約 2 秒）
3. 動畫結束後恢復正常樣式，同時清除 URL 的 query param

