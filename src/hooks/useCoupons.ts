import { useState, useEffect } from "react";
import type { Coupon, CouponDict, SingleDict } from "@/data/coupons";

/**
 * Items to exclude from original price calculation
 */
const EXCLUDE_ITEMS = [
  '糖醋醬',
  '響應環保不需湯匙',
  '不需刀叉及手套',
  '響應環保不需叉子',
];

const EXCLUDE_ITEMS_REGEX = new RegExp(EXCLUDE_ITEMS.join('|'));

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
 * Calculate original price for an item based on SINGLE_DICT
 * @param {string} name - Item name
 * @param {number} count - Item count
 * @param {SingleDict} singleDict - Single item dictionary
 * @returns {number} Original price for the item
 * @throws {Error} If item not found in SINGLE_DICT
 */
function calculateOriginalPrice(name: string, count: number, singleDict: SingleDict): number {
  const item = singleDict[name];
  if (!item) {
    throw new Error(`Cannot find item: ${name}`);
  }
  return item.price * count;
}

/**
 * Process coupons to calculate original_price and discount based on SINGLE_DICT
 * @param {Coupon[]} coupons - Array of coupons to process
 * @param {SingleDict} singleDict - Single item dictionary
 * @returns {Coupon[]} Processed coupons with calculated original_price and discount
 */
function processCouponsWithPrices(coupons: Coupon[], singleDict: SingleDict): Coupon[] {
  return coupons.map(coupon => {
    let originalPrice = 0;
    let canGetOriginalPrice = true;

    coupon.items.forEach(({ name, count }) => {
      if (EXCLUDE_ITEMS_REGEX.test(name) || !canGetOriginalPrice) return;

      try {
        originalPrice += calculateOriginalPrice(name, count, singleDict);
      } catch {
        originalPrice = 0;
        canGetOriginalPrice = false;
      }
    });

    let discount: number = 10;
    if (canGetOriginalPrice && originalPrice > coupon.price) {
      discount = parseFloat(((coupon.price / originalPrice) * 10).toFixed(1));
    }

    return {
      ...coupon,
      original_price: originalPrice,
      discount,
    };
  });
}

function loadDynamicScript(baseSrc: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const src = `${baseSrc}?t=${Date.now()}`;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Ensure data script is loaded.
 * Checks for global variable, existing script tag, or loads dynamically.
 * @param {string} url - Script source URL
 * @param {string} variableName - Global variable name to check
 * @returns {Promise<void>}
 */
function ensureDataLoaded(url: string, variableName: keyof Window): Promise<void> {
  if (window[variableName]) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const scripts = document.querySelectorAll(`script[src*="${url}"]`);
    let existingScript: HTMLScriptElement | null = null;

    // Look for an async/defer script that might be loading
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i] as HTMLScriptElement;
      if (s.async || s.defer) {
        existingScript = s;
        break;
      }
    }

    if (existingScript) {
      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        existingScript!.removeEventListener('load', onLoad);
        existingScript!.removeEventListener('error', onError);
        clearTimeout(timeoutId);
      };

      const onLoad = () => {
        cleanup();
        if (window[variableName]) {
          resolve();
        } else {
          // Script loaded but variable missing? Fallback to dynamic load
          loadDynamicScript(url).then(resolve).catch(reject);
        }
      };

      const onError = () => {
        cleanup();
        loadDynamicScript(url).then(resolve).catch(reject);
      };

      existingScript.addEventListener('load', onLoad);
      existingScript.addEventListener('error', onError);

      // Timeout for existing script
      const timeoutId = setTimeout(() => {
        cleanup();
        loadDynamicScript(url).then(resolve).catch(reject);
      }, 3000);

      return;
    }

    // No existing async script found, or blocking script failed (since var is missing)
    loadDynamicScript(url).then(resolve).catch(reject);
  });
}

/**
 * Hook to load and access coupon data from the external coupon.js file
 * Automatically calculates original_price and discount using single.js data
 * @returns {UseCouponsResult} The coupons data and loading state
 */
export function useCoupons(): UseCouponsResult {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponByCode, setCouponByCode] = useState<Record<string, Coupon>>({});
  const [count, setCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load both scripts in parallel if needed
        await Promise.all([
          ensureDataLoaded('/coupon.js', 'COUPON_DICT'),
          ensureDataLoaded('/single.js', 'SINGLE_DICT')
        ]);

        if (!window.COUPON_DICT) {
          throw new Error("COUPON_DICT not found after loading coupon.js");
        }

        const couponDict: CouponDict = window.COUPON_DICT;
        
        // If SINGLE_DICT is available, calculate prices; otherwise use original data
        let processedCoupons: Coupon[];
        if (window.SINGLE_DICT) {
          const singleDict: SingleDict = window.SINGLE_DICT;
          processedCoupons = processCouponsWithPrices(couponDict.coupon_list, singleDict);
        } else {
          // Use original coupon data without recalculating prices
          console.warn("SINGLE_DICT not available, using original coupon prices");
          processedCoupons = couponDict.coupon_list;
        }

        // Build couponByCode with processed coupons
        const processedByCode: Record<string, Coupon> = {};
        processedCoupons.forEach(coupon => {
          processedByCode[String(coupon.coupon_code)] = coupon;
        });

        setCoupons(processedCoupons);
        setCouponByCode(processedByCode);
        setCount(couponDict.count);
        setLastUpdate(couponDict.last_update);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error("Unknown error loading data"));
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    coupons,
    couponByCode,
    count,
    lastUpdate,
    isLoading,
    error,
  };
}
