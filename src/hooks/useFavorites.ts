import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "favoriteCoupons";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

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

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.size,
  };
};
