import { type Coupon } from "@/data/coupons";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Copy, Check, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CouponCardProps = {
  coupon: Coupon;
  index: number;
};

const CouponCard = ({ coupon, index }: CouponCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success("優惠碼已複製！");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const savings = coupon.originalPrice - coupon.couponPrice;

  return (
    <Card
      className="group relative overflow-hidden border-border/60 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Discount badge */}
      <div className="absolute -right-8 top-4 rotate-45">
        <div className="bg-gradient-primary px-10 py-1 text-xs font-bold text-primary-foreground shadow-md">
          省 {coupon.discount}%
        </div>
      </div>

      <div className="p-5">
        {/* Category badge */}
        <Badge variant="secondary" className="mb-3 text-xs font-medium">
          {coupon.category}
        </Badge>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">
          {coupon.name}
        </h3>

        {/* Items list */}
        <div className="mb-4 space-y-1">
          {coupon.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Price section */}
        <div className="mb-4 flex items-end justify-between border-t border-border/50 pt-4">
          <div>
            <p className="text-xs text-muted-foreground">優惠價</p>
            <p className="text-2xl font-black text-gradient">
              ${coupon.couponPrice}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground line-through">
              原價 ${coupon.originalPrice}
            </p>
            <p className="text-sm font-semibold text-primary">
              現省 ${savings}
            </p>
          </div>
        </div>

        {/* Code and validity */}
        <div className="flex items-center justify-between">
          {coupon.code && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-mono font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{coupon.code}</span>
            </button>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>至 {coupon.validUntil}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
