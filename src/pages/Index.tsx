import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchPanel from "@/components/SearchPanel";
import { type ItemFilterId, filterMatchRules } from "@/components/ItemFilter";
import CouponGrid from "@/components/CouponGrid";
import ScrollToTop from "@/components/ScrollToTop";
import { type SortOption } from "@/components/SortSelect";
import { coupons } from "@/data/coupons";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ItemFilterId[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [searchAllOptions, setSearchAllOptions] = useState(false);
  
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();

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
  }, []);

  const handleToggleFavorites = useCallback(() => {
    setShowFavoritesOnly((prev) => !prev);
  }, []);

  /**
   * Check if a name matches a filter using the filterMatchRules
   * @param name - The name to check (item name or flavor name)
   * @param filter - The filter ID to match against
   * @returns True if the name matches any of the filter's match rules
   */
  const checkNameMatchesFilter = (name: string, filter: ItemFilterId): boolean => {
    const matchPatterns = filterMatchRules[filter];
    if (!matchPatterns) return false;
    return matchPatterns.some((pattern) => name.includes(pattern));
  };

  const filteredAndSortedCoupons = useMemo(() => {
    const filtered = coupons.filter((coupon) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(coupon.coupon_code)) {
        return false;
      }

      // If no filters selected, show all
      // When searchAllOptions is enabled, also check flavors for filter matches
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
        // Search in flavors when searchAllOptions is enabled
        (searchAllOptions && coupon.items.some((item) => 
          item.flavors?.some((flavor) => flavor.name.toLowerCase().includes(searchLower))
        ));

      return matchesFilter && matchesSearch;
    });

    // Sort the filtered coupons
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
          return b.discount - a.discount;
        case "discount-asc":
          return a.discount - b.discount;
        case "expiry-asc":
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        case "expiry-desc":
          return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
        default:
          return 0;
      }
    });
  }, [searchQuery, activeFilters, showFavoritesOnly, favorites, sortBy, searchAllOptions]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero couponCount={coupons.length} />

        <SearchPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchAllOptions={searchAllOptions}
          onSearchAllOptionsChange={setSearchAllOptions}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          onClearAll={handleClearFilters}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={handleToggleFavorites}
          favoritesCount={favoritesCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredAndSortedCoupons.length}
        />

        <section className="container py-6">
          <CouponGrid
            coupons={filteredAndSortedCoupons}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default Index;