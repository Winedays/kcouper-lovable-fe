

# 系統架構優化計劃（不含 SEO）

## 概述
根據先前的架構審查，實施以下 6 項優化，排除 SEO meta 資訊的修改。

---

## 1. 移除未使用的程式碼

- **重構 `src/components/ItemFilter.tsx`**：移除未使用的 React 元件函式及相關 import（`cn`, `X`, `Heart`），只保留資料匯出（`filterMatchRules`、`itemFilters`、`ItemFilterId`）
- **刪除 `src/components/NavLink.tsx`**：未被任何檔案引用

---

## 2. 抽取篩選/排序邏輯

**新增 `src/hooks/useCouponFilters.ts`**：
- 封裝 `searchQuery`、`activeFilters`、`showFavoritesOnly`、`sortBy`、`searchAllOptions` 等狀態
- 封裝 `filteredAndSortedCoupons` 的 `useMemo` 邏輯
- 封裝 `handleFilterToggle`、`handleClearFilters`、`handleToggleFavorites` 等 callback
- 接收 `coupons` 和 `favorites` 作為參數

**修改 `src/pages/Index.tsx`**：
- 改用 `useCouponFilters` hook，移除內嵌的篩選排序邏輯
- 預計減少約 40% 程式碼量

---

## 3. 修正收藏清理邏輯

**修改 `src/hooks/useFavorites.ts`**：
- 將 `cleanupInvalidFavorites` 中的 `invalidCodes` 計算移到 `setFavorites` 外部
- 先從當前 `favorites` 計算差異，再分別呼叫 `setFavorites` 和 `setRemovedCoupons`，避免在 setState updater 內觸發另一個 setState

---

## 4. ScrollToTop 事件節流

**修改 `src/components/ScrollToTop.tsx`**：
- `addEventListener` 加入 `{ passive: true }`
- 使用 `requestAnimationFrame` 節流，避免滾動時頻繁觸發 setState

---

## 5. CouponCard memo 自訂比較

**修改 `src/components/CouponCard.tsx`**：
- 為 `memo` 加入自訂比較函式
- 比較 `coupon.coupon_code`、`index`、`isFirstCard`、以及 `favorites.has(coupon.coupon_code)` 的結果
- 避免因 `favorites` Set 參考改變導致所有卡片重新渲染

---

## 6. 無障礙性改進

**修改 `src/components/SearchPanel.tsx`**：
- 篩選按鈕加入 `aria-pressed={isActive}`
- 搜尋 input 加入 `aria-label="搜尋優惠券"`
- 清除按鈕加入 `aria-label="清除搜尋"`

---

## 檔案變更總覽

| 操作 | 檔案 | 說明 |
|------|------|------|
| 重構 | `src/components/ItemFilter.tsx` | 移除未使用的元件，只保留資料匯出 |
| 刪除 | `src/components/NavLink.tsx` | 未使用的元件 |
| 新增 | `src/hooks/useCouponFilters.ts` | 抽取篩選/排序邏輯 |
| 修改 | `src/pages/Index.tsx` | 簡化為使用 useCouponFilters |
| 修改 | `src/hooks/useFavorites.ts` | 修正 setState 巢狀呼叫 |
| 修改 | `src/components/ScrollToTop.tsx` | 加入 scroll 事件節流 |
| 修改 | `src/components/CouponCard.tsx` | 加入自訂 memo 比較函式 |
| 修改 | `src/components/SearchPanel.tsx` | 改善無障礙性 |

