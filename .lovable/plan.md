

# 最新消息功能

## 概述
在 Header 新增一個「最新消息」按鈕（Bell icon + 未讀數字徽章），點擊後展開消息列表。使用 localStorage 記錄使用者最後閱讀的消息 ID，只對未讀消息顯示提醒。

## 功能設計

### 資料結構
在 `src/data/announcements.ts` 中定義消息資料：
- 每則消息包含 `id`（遞增數字）、`title`、`content`、`date`
- 開發者直接在此檔案新增消息即可

### Hook: `useAnnouncements`
- 從 localStorage 讀取 `lastReadAnnouncementId`
- 計算未讀數量（id 大於 lastReadAnnouncementId 的消息數）
- 提供 `markAllAsRead()` 將 lastReadAnnouncementId 更新為最新消息 ID

### UI 元件: `AnnouncementButton`
- 使用 `Bell` icon（lucide-react）
- 未讀時在 icon 右上角顯示紅色數字徽章（Badge）
- 點擊後開啟 Popover 顯示消息列表
- 開啟時自動標記為已讀
- 支援 `variant` prop（`"default"` 和 `"menu-item"`），與 Header 現有風格一致

### Header 整合
- 桌面版：在導覽列其他 icon 旁加入 AnnouncementButton
- 手機版：在漢堡選單中加入 menu-item 風格的 AnnouncementButton

---

## 技術細節

### 新增檔案

1. **`src/data/announcements.ts`** — 消息資料定義
```ts
type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: "歡迎使用 KCouper v2", content: "全新改版...", date: "2026-02-15" },
];
```

2. **`src/hooks/useAnnouncements.ts`** — localStorage 已讀狀態管理

3. **`src/components/AnnouncementButton.tsx`** — Bell icon + Badge + Popover 元件

### 修改檔案

4. **`src/components/Header.tsx`** — 桌面版和手機版選單中加入 AnnouncementButton

