import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ItemFilter, { type ItemFilterId } from "@/components/ItemFilter";
import CouponGrid from "@/components/CouponGrid";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { coupons } from "@/data/coupons";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ItemFilterId[]>([]);

  const handleFilterToggle = useCallback((filter: ItemFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
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

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
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
  }, [searchQuery, activeFilters]);

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
            />
          </div>

          {/* Results info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共找到{" "}
              <span className="font-semibold text-foreground">
                {filteredCoupons.length}
              </span>{" "}
              張優惠券
            </p>
          </div>

          {/* Coupon grid */}
          <CouponGrid coupons={filteredCoupons} />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
