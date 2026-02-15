/**
 * @typedef {Object} Announcement
 * @property {number} id - Unique identifier (incrementing)
 * @property {string} title - Announcement title
 * @property {string} content - Announcement content
 * @property {string} date - Date string (YYYY-MM-DD)
 */
export type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
};

/**
 * List of announcements. Add new items at the top with incrementing id.
 * @type {Announcement[]}
 */
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "歡迎使用 KCouper v2",
    content: "全新改版上線！介面更直覺、搜尋更快速，快來探索新功能吧 🎉",
    date: "2026-02-15",
  },
];
