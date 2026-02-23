

## 改進品項篩選：加入數量搜尋功能

### 概述

在現有的品項篩選按鈕旁邊加入 +/- 數量調整按鈕，讓使用者可以篩選「含有至少 N 個該品項」的優惠券。例如：點擊「蛋撻」後，旁邊出現 -/+ 按鈕，預設為 1，可調整到 2、3 等，代表篩選含有至少 2 個蛋撻的優惠券。

### UI 行為

- 未啟用的篩選按鈕：顯示如現有的圓角標籤（如 `🥧 蛋撻`）
- 點擊啟用後：按鈕右側出現 `-` 數字 `+` 控制區，預設數量為 1
- 點擊 `+` 增加最少數量需求，`-` 減少；當數量減至 0 時自動取消該篩選
- 數量顯示在按鈕上（如 `🥧 蛋撻 x2`）

### 技術細節

#### 1. 修改 `useCouponFilters.ts` — 篩選狀態與邏輯

**狀態變更：**
- 將 `activeFilters` 從 `ItemFilterId[]` 改為 `Record<ItemFilterId, number>`（key 為篩選 ID，value 為最少數量）
- 修改 `handleFilterToggle` 為可處理數量增減的邏輯
- 新增 `handleFilterCountChange(filter, delta)` 方法

**篩選邏輯變更：**
- 現有邏輯：檢查 coupon 的 items 中是否有名稱匹配篩選的品項
- 新邏輯：檢查匹配品項的 `count` 總和是否 >= 指定數量

```text
現有:  activeFilters.every(filter => coupon.items.some(item => matchesFilter(item, filter)))
新增:  Object.entries(activeFilters).every(([filter, minCount]) =>
         sum(coupon.items matching filter's count) >= minCount
       )
```

#### 2. 修改 `SearchPanel.tsx` — UI 元件

- 啟用的篩選按鈕增加 +/- 控制與數量顯示
- 未啟用的按鈕維持現有外觀
- 點擊按鈕本身切換啟用/停用（數量預設 1）
- +/- 按鈕使用 `e.stopPropagation()` 避免觸發切換

#### 3. 修改 `ItemFilter.tsx` — 型別匯出

- 保持 `ItemFilterId` 不變
- 如需要，新增篩選數量相關的型別定義

#### 4. 修改 `Index.tsx` — 傳遞更新後的 props

- `activeFilters` 型別從陣列變為 Record，相關 props 同步更新

#### 5. 更新單元測試 `useCouponFilters.test.ts`

新增測試案例：
- 篩選「蛋撻 >= 2」只返回含有 2 個以上蛋撻的優惠券
- 數量減至 0 時自動移除篩選
- 多個品項數量篩選取交集
- `handleClearFilters` 清除所有數量篩選

### 影響範圍

| 檔案 | 變更 |
|---|---|
| `src/hooks/useCouponFilters.ts` | 狀態型別、篩選邏輯、新增數量方法 |
| `src/components/SearchPanel.tsx` | 按鈕 UI 加入 +/- 控制 |
| `src/components/ItemFilter.tsx` | 可能新增型別 |
| `src/pages/Index.tsx` | props 型別同步 |
| `src/test/hooks/useCouponFilters.test.ts` | 新增數量篩選測試 |
