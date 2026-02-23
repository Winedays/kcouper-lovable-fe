

# 新增價格區間篩選器

## 功能說明
在搜尋面板中新增價格區間篩選功能，提供快捷按鈕（如「$100 以下」「$100-200」等）以及 Slider 精確調整，讓使用者快速找到符合預算的優惠券。

## 使用流程

1. 在篩選列（餐點篩選按鈕旁）看到價格區間快捷按鈕
2. 點擊快捷按鈕可快速篩選常見價格範圍
3. 展開 Popover 可使用雙向 Slider 精確調整最低/最高價格
4. 價格篩選與現有篩選（搜尋、餐點、收藏）同時生效
5. 清除按鈕可一併重置價格篩選

## 技術細節

### 修改檔案

**`src/hooks/useCouponFilters.ts`**
- 新增 `priceRange` 狀態：`[min, max]` 陣列，預設 `null`（表示不篩選）
- 新增 `setPriceRange(range: [number, number] | null)` setter
- 在 `filteredAndSortedCoupons` 的 filter 邏輯中加入價格區間判斷：`coupon.price >= min && coupon.price <= max`
- 在 `handleClearFilters` 中同時重置 `priceRange` 為 `null`
- 在 `hasActiveFilters` 判斷中納入 `priceRange !== null`
- 新增 `priceStats` (useMemo)：從所有優惠券計算最低價與最高價，供 Slider 使用
- 回傳 `priceRange`、`setPriceRange`、`priceStats`

**`src/components/SearchPanel.tsx`**
- 新增 props：`priceRange`、`onPriceRangeChange`、`priceStats: { min: number; max: number }`
- 在篩選列（餐點篩選按鈕之後）加入分隔線和價格篩選區塊：
  - 快捷按鈕：「$100以下」「$100-200」「$200以上」，使用與餐點篩選相同的 pill 樣式
  - 一個「自訂」按鈕，點擊展開 Popover，內含雙向 Slider（使用現有 `@radix-ui/react-slider`）和顯示目前選取的價格範圍文字
- 當價格篩選啟用時，`hasActiveFilters` 要包含此條件，使清除按鈕可見
- 引入 `DollarSign` icon 作為價格區塊前的圖示

**`src/pages/Index.tsx`**
- 將 `priceRange`、`setPriceRange`、`priceStats` 從 `useCouponFilters` 解構並傳遞給 `SearchPanel`

**`src/test/components/SearchPanel.test.tsx`**
- 在 `defaultProps` 中加入 `priceRange: null`、`onPriceRangeChange: vi.fn()`、`priceStats: { min: 0, max: 500 }`
- 新增測試案例：
  - 應該渲染價格快捷按鈕
  - 點擊快捷按鈕應呼叫 `onPriceRangeChange`
  - 價格篩選啟用時應顯示清除按鈕

### UI 佈局

篩選列結構（在現有餐點篩選按鈕之後）：

```text
[收藏] | [炸雞] [蛋撻] [...餐點篩選] | [$100以下] [$100-200] [$200以上] [自訂▾] | [清除]
```

- 快捷按鈕使用相同的圓角 pill 樣式，保持視覺一致
- 「自訂」按鈕點開 Popover，內含 Slider 和價格顯示
- 手機版全部在同一列水平捲動

