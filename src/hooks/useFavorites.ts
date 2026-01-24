import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "kfc-coupon-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((couponCode: number) => {
    setFavorites((prev) =>
      prev.includes(couponCode) ? prev.filter((code) => code !== couponCode) : [...prev, couponCode]
    );
  }, []);

  const isFavorite = useCallback(
    (couponCode: number) => favorites.includes(couponCode),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
};
