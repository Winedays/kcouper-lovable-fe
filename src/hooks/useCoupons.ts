import { useState, useEffect } from "react";
import type { Coupon, CouponDict } from "@/data/coupons";

/**
 * @typedef {Object} UseCouponsResult
 * @property {Coupon[]} coupons - Array of all coupons
 * @property {Record<string, Coupon>} couponByCode - Map of coupon_code to Coupon
 * @property {number} count - Total number of coupons
 * @property {string} lastUpdate - Last update timestamp
 * @property {boolean} isLoading - Whether coupons are still loading
 * @property {Error | null} error - Error if loading failed
 */
type UseCouponsResult = {
  coupons: Coupon[];
  couponByCode: Record<string, Coupon>;
  count: number;
  lastUpdate: string;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook to load and access coupon data from the external coupon.js file
 * @returns {UseCouponsResult} The coupons data and loading state
 */
export function useCoupons(): UseCouponsResult {
  const [data, setData] = useState<CouponDict | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCoupons = () => {
      try {
        // Check if COUPON_DICT is already loaded from coupon.js
        if (window.COUPON_DICT) {
          setData(window.COUPON_DICT);
          setIsLoading(false);
          return;
        }

        // If not loaded yet, load the script dynamically
        const script = document.createElement("script");
        script.src = "/coupon.js";
        script.async = true;

        script.onload = () => {
          if (window.COUPON_DICT) {
            setData(window.COUPON_DICT);
          } else {
            setError(new Error("COUPON_DICT not found after loading coupon.js"));
          }
          setIsLoading(false);
        };

        script.onerror = () => {
          setError(new Error("Failed to load coupon.js"));
          setIsLoading(false);
        };

        document.head.appendChild(script);

        // Cleanup
        return () => {
          document.head.removeChild(script);
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error loading coupons"));
        setIsLoading(false);
      }
    };

    loadCoupons();
  }, []);

  return {
    coupons: data?.coupon_list ?? [],
    couponByCode: data?.coupon_by_code ?? {},
    count: data?.count ?? 0,
    lastUpdate: data?.last_update ?? "",
    isLoading,
    error,
  };
}
