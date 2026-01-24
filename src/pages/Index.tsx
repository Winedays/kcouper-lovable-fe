import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CouponGrid from "@/components/CouponGrid";
import Footer from "@/components/Footer";
import { coupons } from "@/data/coupons";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        coupon.name.toLowerCase().includes(searchLower) ||
        coupon.items.some((item) => item.toLowerCase().includes(searchLower)) ||
        coupon.code?.toLowerCase().includes(searchLower);

      return matchesSearch;
    });
  }, [searchQuery]);

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
