

## 修改搜尋比對欄位

### 變更內容

**`src/hooks/useCouponFilters.ts`** — 移除 `product_code` 比對（第 76-85 行）

將搜尋比對從 5 個欄位縮減為 4 個：
- `coupon.name`
- `coupon.items[].name`
- `coupon.coupon_code`
- `coupon.items[].flavors[].name`（僅在「搜尋所有選項」開啟時）

移除：
- ~~`coupon.product_code`~~

修改後的搜尋邏輯：
```javascript
const matchesSearch =
  searchQuery === "" ||
  coupon.name.toLowerCase().includes(searchLower) ||
  coupon.items.some((item) => item.name.toLowerCase().includes(searchLower)) ||
  coupon.coupon_code.toString().includes(searchLower) ||
  (searchAllOptions && coupon.items.some((item) =>
    item.flavors?.some((flavor) => flavor.name.toLowerCase().includes(searchLower))
  ));
```

影響範圍：僅刪除一行 `product_code` 比對，其餘邏輯不變。

