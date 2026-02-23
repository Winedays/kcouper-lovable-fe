

# 新增優惠券比較功能

## 功能說明
讓使用者可以勾選多張優惠券，在側邊面板或彈窗中並排比較價格、折扣、品項等資訊，方便做出選擇。

## 使用流程

1. 使用者在優惠券卡片上點擊「比較」按鈕，將優惠券加入比較清單
2. 畫面底部出現浮動工具列，顯示已選數量（最多 4 張）
3. 點擊「開始比較」後，開啟 Dialog/Sheet 顯示並排比較表格
4. 比較表格包含：名稱、價格、原價、折扣、品項列表、有效期限、點餐連結

## 技術細節

### 新增檔案

**`src/hooks/useCompare.ts`** - 比較功能狀態管理 Hook
- `compareList: Set<number>` 儲存選中的 coupon_code
- `toggleCompare(code)` 新增/移除比較項目
- `clearCompare()` 清空比較清單
- `isComparing(code)` 檢查是否在比較清單中
- 限制最多 4 張，超過時顯示 toast 提示

**`src/components/CompareBar.tsx`** - 底部浮動比較工具列
- 固定在畫面底部，僅在有選中項目時顯示
- 顯示已選數量和「開始比較」按鈕
- 可逐一移除或清空全部

**`src/components/CompareDialog.tsx`** - 比較彈窗
- 使用 Sheet（從底部滑出）或 Dialog 呈現
- 表格式並排顯示各優惠券的：
  - 名稱
  - 優惠價 / 原價 / 折扣
  - 包含品項（含數量）
  - 有效日期
  - 前往點餐連結
- 手機版可水平捲動

### 修改檔案

**`src/components/CouponCard.tsx`**
- 新增 `onToggleCompare` 和 `isComparing` props
- 在按鈕區域新增「加入比較」按鈕（使用 `GitCompareArrows` icon）
- 選中時按鈕樣式變更為高亮狀態

**`src/components/CouponGrid.tsx`**
- 傳遞比較相關 props 給 CouponCard

**`src/pages/Index.tsx`**
- 引入 `useCompare` hook
- 將比較狀態傳入 CouponGrid
- 加入 CompareBar 和 CompareDialog 元件

