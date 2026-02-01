import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook for progressive loading of items
 * @param totalItems - Total number of items to load
 * @param initialCount - Number of items to show initially (default: 30)
 * @param batchSize - Number of items to load per batch (default: 30)
 * @returns Object with visibleCount, hasMore, loadMore, and sentinelRef
 */
export const useProgressiveLoad = (
  totalItems: number,
  initialCount: number = 30,
  batchSize: number = 30
) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset visible count when total items change significantly
  useEffect(() => {
    setVisibleCount(Math.min(initialCount, totalItems));
  }, [totalItems, initialCount]);

  const hasMore = visibleCount < totalItems;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, totalItems));
  }, [batchSize, totalItems]);

  // Set up IntersectionObserver
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px", // Load before reaching the sentinel
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, loadMore]);

  return {
    visibleCount,
    hasMore,
    loadMore,
    sentinelRef,
  };
};
