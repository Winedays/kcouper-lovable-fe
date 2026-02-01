import { useState, useMemo, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchPanel from "@/components/SearchPanel";
import { type ItemFilterId, filterMatchRules } from "@/components/ItemFilter";
import CouponGrid from "@/components/CouponGrid";
import ScrollToTop from "@/components/ScrollToTop";
import { type SortOption } from "@/components/SortSelect";
import { useCoupons } from "@/hooks/useCoupons";
import { useFavorites } from "@/hooks/useFavorites";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ItemFilterId[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [searchAllOptions, setSearchAllOptions] = useState(false);
  
  const { coupons, count: couponCount, lastUpdate, isLoading, error } = useCoupons();
  const { 
    favorites, 
    toggleFavorite, 
    isFavorite, 
    favoritesCount,
    cleanupInvalidFavorites,
    removedCoupons,
    clearRemovedCoupons,
  } = useFavorites();

  // Check for invalid favorites when coupons are loaded
  useEffect(() => {
    if (coupons.length > 0) {
      const validCodes = new Set(coupons.map((c) => c.coupon_code));
      cleanupInvalidFavorites(validCodes);
    }
  }, [coupons, cleanupInvalidFavorites]);

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
      if (showFavoritesOnly && !favorites.has(coupon.coupon_code)) {
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
          // Lower discount value = better deal (e.g., 7折 > 9折), so sort ascending
          return a.discount - b.discount;
        case "discount-asc":
          // Higher discount value = less discount, so sort descending
          return b.discount - a.discount;
        case "expiry-asc":
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        case "expiry-desc":
          return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
        default:
          return 0;
      }
    });
  }, [coupons, searchQuery, activeFilters, showFavoritesOnly, favorites, sortBy, searchAllOptions]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">載入優惠券資料中...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-destructive">
            <p>載入優惠券資料失敗</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header lastUpdate={lastUpdate} />
      
      <main className="flex-1">
        <Hero couponCount={couponCount} />

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
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      </main>

      <ScrollToTop />

      {/* Invalid favorites removed dialog */}
      <AlertDialog open={removedCoupons.length > 0} onOpenChange={(open) => !open && clearRemovedCoupons()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>收藏已更新</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  以下 {removedCoupons.length} 張優惠券已過期或不再提供，已自動從收藏中移除：
                </p>
                <div className="max-h-32 overflow-y-auto rounded-md bg-muted p-2">
                  {removedCoupons.map((code) => (
                    <div key={code} className="text-sm font-mono">
                      優惠碼：{code}
                    </div>
                  ))}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={clearRemovedCoupons}>
              我知道了
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
