import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CouponCardSkeleton = () => {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-card">
      <div className="flex flex-1 flex-col p-5">
        {/* Title skeleton */}
        <div className="mb-3 flex items-start gap-2">
          <Skeleton className="mt-0.5 h-6 w-6 rounded-full" />
          <Skeleton className="h-6 flex-1" />
        </div>

        {/* Items skeleton */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price section skeleton */}
        <div className="mb-4 flex items-end justify-between border-t border-border/50 pt-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Code and validity skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Action buttons skeleton */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </Card>
  );
};

export default CouponCardSkeleton;
