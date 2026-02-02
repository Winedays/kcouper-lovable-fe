import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "@/hooks/useFavorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("初始化", () => {
    it("應該以空的 Set 初始化", () => {
      const { result } = renderHook(() => useFavorites());
      expect(result.current.favorites.size).toBe(0);
      expect(result.current.favoritesCount).toBe(0);
    });

    it("應該從 localStorage 載入已儲存的收藏", () => {
      localStorage.setItem("favoriteCoupons", JSON.stringify([123, 456]));
      const { result } = renderHook(() => useFavorites());
      expect(result.current.favorites.size).toBe(2);
      expect(result.current.favorites.has(123)).toBe(true);
      expect(result.current.favorites.has(456)).toBe(true);
    });
  });

  describe("toggleFavorite", () => {
    it("應該新增優惠券到收藏", () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite(123);
      });

      expect(result.current.favorites.has(123)).toBe(true);
      expect(result.current.favoritesCount).toBe(1);
    });

    it("應該從收藏中移除優惠券", () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite(123);
      });

      act(() => {
        result.current.toggleFavorite(123);
      });

      expect(result.current.favorites.has(123)).toBe(false);
      expect(result.current.favoritesCount).toBe(0);
    });

    it("應該將變更儲存到 localStorage", () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite(123);
      });

      const stored = JSON.parse(localStorage.getItem("favoriteCoupons") || "[]");
      expect(stored).toContain(123);
    });
  });

  describe("isFavorite", () => {
    it("應該對收藏中的優惠券回傳 true", () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite(123);
      });

      expect(result.current.isFavorite(123)).toBe(true);
    });

    it("應該對不在收藏中的優惠券回傳 false", () => {
      const { result } = renderHook(() => useFavorites());
      expect(result.current.isFavorite(999)).toBe(false);
    });
  });

  describe("clearFavorites", () => {
    it("應該清除所有收藏", () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.toggleFavorite(123);
        result.current.toggleFavorite(456);
      });

      act(() => {
        result.current.clearFavorites();
      });

      expect(result.current.favorites.size).toBe(0);
      expect(result.current.favoritesCount).toBe(0);
    });
  });

  describe("cleanupInvalidFavorites", () => {
    it("應該移除無效的收藏", () => {
      localStorage.setItem("favoriteCoupons", JSON.stringify([123, 456, 789]));
      const { result } = renderHook(() => useFavorites());

      const validCodes = new Set([123, 789]);
      
      act(() => {
        result.current.cleanupInvalidFavorites(validCodes);
      });

      expect(result.current.favorites.has(123)).toBe(true);
      expect(result.current.favorites.has(789)).toBe(true);
      expect(result.current.favorites.has(456)).toBe(false);
      expect(result.current.removedCoupons).toContain(456);
    });

    it("只應該清理一次", () => {
      localStorage.setItem("favoriteCoupons", JSON.stringify([123, 456]));
      const { result } = renderHook(() => useFavorites());

      const validCodes = new Set([123]);
      
      act(() => {
        result.current.cleanupInvalidFavorites(validCodes);
      });

      // Second call should not change anything
      act(() => {
        result.current.cleanupInvalidFavorites(new Set([456]));
      });

      // Should still only have 123 (from first cleanup)
      expect(result.current.favorites.has(123)).toBe(true);
    });
  });

  describe("clearRemovedCoupons", () => {
    it("應該清除已移除的優惠券記錄", () => {
      localStorage.setItem("favoriteCoupons", JSON.stringify([123, 456]));
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.cleanupInvalidFavorites(new Set([123]));
      });

      expect(result.current.removedCoupons.length).toBeGreaterThan(0);

      act(() => {
        result.current.clearRemovedCoupons();
      });

      expect(result.current.removedCoupons.length).toBe(0);
    });
  });
});
