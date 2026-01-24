import { type Coupon } from "@/data/coupons";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Check, Calendar, ExternalLink, ChefHat, ArrowRightLeft, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

type CouponCardProps = {
  coupon: Coupon;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

const CouponCard = ({ coupon, index, isFavorite, onToggleFavorite }: CouponCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleFavorite = () => {
    onToggleFavorite(coupon.coupon_code);
    toast.success(isFavorite ? "已取消收藏" : "已加入收藏");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.coupon_code.toString());
    setCopied(true);
    toast.success("優惠碼已複製！");
    setTimeout(() => setCopied(false), 2000);
  };

  const savings = coupon.original_price - coupon.price;

  const hasAnyFlavors = coupon.items.some(
    (item) => item.flavors && item.flavors.length > 0
  );

  // Format item display with count
  const formatItemDisplay = (name: string, count: number) => {
    if (count === 1) return name;
    return `${name} x ${count}`;
  };

  return (
    <>
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
          {/* Title with favorite button */}
          <div className="mb-3 flex items-start gap-2">
            <button
              onClick={handleToggleFavorite}
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110"
              aria-label={isFavorite ? "取消收藏" : "加入收藏"}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary/60"
                }`}
              />
            </button>
            <h3 className="text-lg font-bold leading-snug text-foreground pr-8">
              {coupon.coupon_code}-{coupon.name}
            </h3>
          </div>

          {/* Items list */}
          <div className="mb-4 space-y-1">
            {coupon.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                <span>{formatItemDisplay(item.name, item.count)}</span>
              </div>
            ))}
          </div>

          {/* Price section */}
          <div className="mb-4 flex items-end justify-between border-t border-border/50 pt-4">
            <div>
              <p className="text-xs text-muted-foreground">優惠價</p>
              <p className="text-2xl font-black text-gradient">
                ${coupon.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground line-through">
                原價 ${coupon.original_price}
              </p>
            </div>
          </div>

          {/* Code and validity */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-mono font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{coupon.coupon_code}</span>
            </button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{coupon.start_date} ~ {coupon.end_date}</span>
            </div>
          </div>

          {/* View options button */}
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => setIsDialogOpen(true)}
          >
            <ChefHat className="h-4 w-4 mr-2" />
            查看餐點選項
          </Button>

          {/* Order button */}
          <Button
            variant="hero"
            size="sm"
            className="mt-2 w-full"
            asChild
          >
            <a
              href={`https://www.kfcclub.com.tw/meal/${coupon.product_code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <span>前往點餐</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </Card>

      {/* Options Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{coupon.coupon_code}-{coupon.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-black text-gradient">${coupon.price}</span>
                <span className="text-sm text-muted-foreground line-through">原價 ${coupon.original_price}</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Price reminder */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                💡 品項價格為一件的價錢
              </p>
            </div>

            {/* Items with flavors */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                可更換口味
              </h4>

              {!hasAnyFlavors ? (
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-muted-foreground">沒有可以更換的品項</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {coupon.items.map((item, i) => (
                    <div key={i} className="rounded-lg border border-border p-3">
                      <p className="font-medium text-foreground mb-2">
                        {formatItemDisplay(item.name, item.count)}
                        {item.addition_price > 0 && (
                          <span className="ml-2 text-sm text-primary">+${item.addition_price}</span>
                        )}
                      </p>
                      {item.flavors && item.flavors.length > 0 ? (
                        <div className="space-y-1.5">
                          {item.flavors.map((flavor, j) => (
                            <div
                              key={j}
                              className="flex items-center justify-between text-sm bg-secondary/50 rounded-md px-3 py-1.5"
                            >
                              <span className="text-secondary-foreground">
                                → {flavor.name}
                              </span>
                              <span className={`font-medium ${flavor.addition_price === 0 ? 'text-green-600' : 'text-primary'}`}>
                                {flavor.addition_price === 0 ? '免費' : `+$${flavor.addition_price}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">無可更換選項</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order button in dialog */}
          <div className="mt-6">
            <Button
              variant="hero"
              className="w-full"
              asChild
            >
              <a
                href={`https://www.kfcclub.com.tw/meal/${coupon.product_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span>前往點餐</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CouponCard;
