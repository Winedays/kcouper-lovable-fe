import { type Coupon } from "@/data/coupons";
import CouponCard from "./CouponCard";
import CouponCardSkeleton from "./CouponCardSkeleton";
import { PackageOpen } from "lucide-react";
import { useProgressiveLoad } from "@/hooks/useProgressiveLoad";

type CouponGridProps = {
  coupons: Coupon[];
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
};

const INITIAL_COUNT = 30;
const BATCH_SIZE = 30;

const CouponGrid = ({ coupons, favorites, onToggleFavorite }: CouponGridProps) => {
  const { visibleCount, hasMore, sentinelRef } = useProgressiveLoad(
    coupons.length,
    INITIAL_COUNT,
    BATCH_SIZE
  );

  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
        <h3 className="text-lg font-semibold text-foreground">找不到符合的優惠券</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          請嘗試其他搜尋條件或分類
        </p>
      </div>
    );
  }

  const visibleCoupons = coupons.slice(0, visibleCount);
  const remainingCount = coupons.length - visibleCount;
  const skeletonCount = Math.min(remainingCount, 6); // Show max 6 skeletons

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCoupons.map((coupon, index) => (
          <CouponCard
            key={coupon.coupon_code}
            coupon={coupon}
            index={index}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            isFirstCard={index === 0}
          />
        ))}
        
        {/* Skeleton placeholders for loading state */}
        {hasMore && Array.from({ length: skeletonCount }).map((_, i) => (
          <CouponCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
      
      {/* Sentinel element for IntersectionObserver */}
      {hasMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />
      )}
    </>
  );
};

export default CouponGrid;
