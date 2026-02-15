import { useState, useCallback, useMemo } from "react";
import { ANNOUNCEMENTS } from "@/data/announcements";

const STORAGE_KEY = "lastReadAnnouncementId";

/**
 * Hook to manage announcement read state via localStorage
 */
export const useAnnouncements = () => {
  const [lastReadId, setLastReadId] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  const unreadCount = useMemo(
    () => ANNOUNCEMENTS.filter((a) => a.id > lastReadId).length,
    [lastReadId]
  );

  const markAllAsRead = useCallback(() => {
    if (ANNOUNCEMENTS.length === 0) return;
    const maxId = Math.max(...ANNOUNCEMENTS.map((a) => a.id));
    setLastReadId(maxId);
    localStorage.setItem(STORAGE_KEY, String(maxId));
  }, []);

  return {
    announcements: ANNOUNCEMENTS,
    unreadCount,
    lastReadId,
    markAllAsRead,
  };
};
