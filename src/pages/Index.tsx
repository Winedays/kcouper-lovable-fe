import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ItemFilter, { type ItemFilterId } from "@/components/ItemFilter";
import CouponGrid from "@/components/CouponGrid";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SortSelect, { type SortOption } from "@/components/SortSelect";
import { coupons } from "@/data/coupons";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ItemFilterId[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("code-asc");
  
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

  const checkItemMatchesFilter = (item: string, filter: ItemFilterId): boolean => {
    // Special case for drinks - match 可樂, 雪碧, 紅茶
    if (filter === "飲料") {
      return item.includes("可樂") || item.includes("雪碧") || item.includes("紅茶");
    }
    // Special case for burgers - match 堡
    if (filter === "漢堡") {
      return item.includes("堡");
    }
    return item.includes(filter);
  };

  const filteredAndSortedCoupons = useMemo(() => {
    const filtered = coupons.filter((coupon) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(coupon.id)) {
        return false;
      }

      // If no filters selected, show all
      const matchesFilter =
        activeFilters.length === 0 ||
        activeFilters.every((filter) =>
          coupon.items.some((item) => checkItemMatchesFilter(item, filter))
        );

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        coupon.name.toLowerCase().includes(searchLower) ||
        coupon.items.some((item) => item.toLowerCase().includes(searchLower)) ||
        coupon.code?.toLowerCase().includes(searchLower);

      return matchesFilter && matchesSearch;
    });

    // Sort the filtered coupons
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "code-asc":
          return (a.code || "").localeCompare(b.code || "");
        case "code-desc":
          return (b.code || "").localeCompare(a.code || "");
        case "price-asc":
          return a.couponPrice - b.couponPrice;
        case "price-desc":
          return b.couponPrice - a.couponPrice;
        case "discount-desc":
          return b.discount - a.discount;
        case "discount-asc":
          return a.discount - b.discount;
        case "expiry-asc":
          return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
        case "expiry-desc":
          return new Date(b.validUntil).getTime() - new Date(a.validUntil).getTime();
        default:
          return 0;
      }
    });
  }, [searchQuery, activeFilters, showFavoritesOnly, favorites, sortBy]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          couponCount={coupons.length}
        />

        <section className="container py-8 md:py-12">
          {/* Filter section */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              依餐點篩選
            </h2>
            <ItemFilter
              activeFilters={activeFilters}
              onFilterToggle={handleFilterToggle}
              onClearAll={handleClearFilters}
              showFavoritesOnly={showFavoritesOnly}
              onToggleFavorites={handleToggleFavorites}
              favoritesCount={favoritesCount}
            />
          </div>

          {/* Results info with sort */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              共找到{" "}
              <span className="font-semibold text-foreground">
                {filteredAndSortedCoupons.length}
              </span>{" "}
              張優惠券
            </p>
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>

          {/* Coupon grid */}
          <CouponGrid
            coupons={filteredAndSortedCoupons}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
