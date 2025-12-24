import { type Coupon } from "@/data/coupons";
import CouponCard from "./CouponCard";
import { PackageOpen } from "lucide-react";

type CouponGridProps = {
  coupons: Coupon[];
};

const CouponGrid = ({ coupons }: CouponGridProps) => {
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

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {coupons.map((coupon, index) => (
        <CouponCard key={coupon.id} coupon={coupon} index={index} />
      ))}
    </div>
  );
};

export default CouponGrid;
