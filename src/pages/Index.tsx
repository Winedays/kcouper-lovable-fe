import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ItemFilter, { type ItemFilterId } from "@/components/ItemFilter";
import CouponGrid from "@/components/CouponGrid";
import Footer from "@/components/Footer";
import { coupons } from "@/data/coupons";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ItemFilterId>("all");

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      // Item filter - check if any item contains the filter keyword
      const matchesFilter =
        activeFilter === "all" ||
        coupon.items.some((item) => {
          // Special case for drinks - match 可樂, 雪碧, 紅茶
          if (activeFilter === "可樂") {
            return item.includes("可樂") || item.includes("雪碧") || item.includes("紅茶");
          }
          // Special case for burgers - match 堡
          if (activeFilter === "漢堡") {
            return item.includes("堡");
          }
          return item.includes(activeFilter);
        });

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        coupon.name.toLowerCase().includes(searchLower) ||
        coupon.items.some((item) => item.toLowerCase().includes(searchLower)) ||
        coupon.code?.toLowerCase().includes(searchLower);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

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
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
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
    </div>
  );
};

export default Index;
