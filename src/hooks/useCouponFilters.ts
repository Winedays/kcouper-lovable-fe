import { useState, useMemo, useCallback } from "react";
import { type Coupon } from "@/data/coupons";
import { type ItemFilterId, filterMatchRules } from "@/components/ItemFilter";
import { type SortOption } from "@/components/SortSelect";

/**
 * Check if a name matches a filter using the filterMatchRules
 * @param name - The name to check
 * @param filter - The filter ID to match against
 * @returns True if the name matches any of the filter's match rules
 */
const checkNameMatchesFilter = (name: string, filter: ItemFilterId): boolean => {
  const matchPatterns = filterMatchRules[filter];
  if (!matchPatterns) return false;
  return matchPatterns.some((pattern) => name.includes(pattern));
};

export const useCouponFilters = (coupons: Coupon[], favorites: Set<number>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ItemFilterId[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [searchAllOptions, setSearchAllOptions] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  /** Min and max price across all coupons, for Slider bounds */
  const priceStats = useMemo(() => {
    if (coupons.length === 0) return { min: 0, max: 500 };
    const prices = coupons.map((c) => c.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [coupons]);

  const handleFilterToggle = useCallback((filter: ItemFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setShowFavoritesOnly(false);
    setPriceRange(null);
  }, []);

  const handleToggleFavorites = useCallback(() => {
    setShowFavoritesOnly((prev) => !prev);
  }, []);

  const filteredAndSortedCoupons = useMemo(() => {
    const filtered = coupons.filter((coupon) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.has(coupon.coupon_code)) {
        return false;
      }

      // Price range filter
      if (priceRange) {
        if (coupon.price < priceRange[0] || coupon.price > priceRange[1]) {
          return false;
        }
      }

      // Item filters
      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.every((filter) =>
          coupon.items.some((item) =>
            checkNameMatchesFilter(item.name, filter) ||
            (searchAllOptions && item.flavors?.some((flavor) => checkNameMatchesFilter(flavor.name, filter)))
          )
        );

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        coupon.name.toLowerCase().includes(searchLower) ||
        coupon.items.some((item) => item.name.toLowerCase().includes(searchLower)) ||
        coupon.coupon_code.toString().includes(searchLower) ||
        coupon.product_code.toLowerCase().includes(searchLower) ||
        (searchAllOptions && coupon.items.some((item) =>
          item.flavors?.some((flavor) => flavor.name.toLowerCase().includes(searchLower))
        ));

      return matchesFilter && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "code-asc":
          return a.coupon_code - b.coupon_code;
        case "code-desc":
          return b.coupon_code - a.coupon_code;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "discount-desc":
          return a.discount - b.discount;
        case "discount-asc":
          return b.discount - a.discount;
        case "expiry-asc":
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        case "expiry-desc":
          return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
        default:
          return 0;
      }
    });
  }, [coupons, searchQuery, activeFilters, showFavoritesOnly, favorites, sortBy, searchAllOptions, priceRange]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    showFavoritesOnly,
    sortBy,
    setSortBy,
    searchAllOptions,
    setSearchAllOptions,
    priceRange,
    setPriceRange,
    priceStats,
    handleFilterToggle,
    handleClearFilters,
    handleToggleFavorites,
    filteredAndSortedCoupons,
  };
};
