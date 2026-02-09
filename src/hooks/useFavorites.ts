import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "favoriteCoupons";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const [removedCoupons, setRemovedCoupons] = useState<number[]>([]);
  const hasCleanedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = useCallback((couponCode: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(couponCode)) {
        newFavorites.delete(couponCode);
      } else {
        newFavorites.add(couponCode);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (couponCode: number) => favorites.has(couponCode),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  /**
   * Clean up favorites that no longer exist in the coupon list
   * @param validCouponCodes - Set of valid coupon codes from the current coupon list
   * @returns Array of removed coupon codes
   */
  const cleanupInvalidFavorites = useCallback((validCouponCodes: Set<number>) => {
    if (hasCleanedRef.current) return [];
    hasCleanedRef.current = true;

    // Calculate invalid codes outside of setState
    const currentFavorites = favorites;
    const invalidCodes: number[] = [];
    const newFavorites = new Set<number>();

    currentFavorites.forEach((code) => {
      if (validCouponCodes.has(code)) {
        newFavorites.add(code);
      } else {
        invalidCodes.push(code);
      }
    });

    if (invalidCodes.length > 0) {
      setFavorites(newFavorites);
      setRemovedCoupons(invalidCodes);
    }

    return invalidCodes;
  }, [favorites]);

  const clearRemovedCoupons = useCallback(() => {
    setRemovedCoupons([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.size,
    cleanupInvalidFavorites,
    removedCoupons,
    clearRemovedCoupons,
  };
};
