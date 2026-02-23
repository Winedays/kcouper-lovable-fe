

## 修改搜尋比對欄位

### 變更內容

**`src/hooks/useCouponFilters.ts`** — 移除第 81 行的 `product_code` 比對

將這一行刪除：
```
coupon.product_code.toLowerCase().includes(searchLower) ||
```

修改後保留 4 個比對欄位：
- `coupon.name`
- `coupon.items[].name`
- `coupon.coupon_code`
- `coupon.items[].flavors[].name`（僅在「搜尋所有選項」開啟時）

影響範圍：僅刪除一行，其餘邏輯不變。

