export type ReplacementOption = {
  name: string;
  price: number;
};

export type CouponItem = {
  name: string;
  replacements?: ReplacementOption[];
};

export type Coupon = {
  id: string;
  name: string;
  items: string[];
  itemDetails: CouponItem[];
  couponPrice: number;
  originalPrice: number;
  discount: number;
  category: Category;
  validUntil: string;
  code?: string;
};

export type Category = 
  | "炸雞"
  | "套餐"
  | "蛋塔"
  | "漢堡"
  | "點心"
  | "飲料"
  | "全部";

export const categories: Category[] = [
  "全部",
  "炸雞",
  "套餐",
  "蛋塔",
  "漢堡",
  "點心",
  "飲料",
];

export const coupons: Coupon[] = [
  {
    id: "1",
    name: "經典炸雞超值餐",
    items: ["2塊炸雞", "薯條(中)", "可樂(中)"],
    itemDetails: [
      { name: "2塊炸雞" },
      { name: "薯條(中)", replacements: [{ name: "薯條(大)", price: 20 }, { name: "蛋塔", price: 15 }] },
      { name: "可樂(中)", replacements: [{ name: "可樂(大)", price: 15 }, { name: "雪碧(中)", price: 0 }, { name: "紅茶(中)", price: 0 }] },
    ],
    couponPrice: 159,
    originalPrice: 209,
    discount: 24,
    category: "套餐",
    validUntil: "2025-01-31",
    code: "KFC2024A",
  },
  {
    id: "2",
    name: "蛋塔6入組",
    items: ["原味蛋塔 x 6"],
    itemDetails: [
      { name: "原味蛋塔 x 6" },
    ],
    couponPrice: 129,
    originalPrice: 174,
    discount: 26,
    category: "蛋塔",
    validUntil: "2025-01-31",
    code: "TART6",
  },
  {
    id: "3",
    name: "咔啦雞腿堡套餐",
    items: ["咔啦雞腿堡", "薯條(中)", "可樂(中)"],
    itemDetails: [
      { name: "咔啦雞腿堡", replacements: [{ name: "辣味咔啦雞腿堡", price: 0 }] },
      { name: "薯條(中)", replacements: [{ name: "薯條(大)", price: 20 }, { name: "蛋塔", price: 15 }] },
      { name: "可樂(中)", replacements: [{ name: "可樂(大)", price: 15 }, { name: "雪碧(中)", price: 0 }] },
    ],
    couponPrice: 139,
    originalPrice: 179,
    discount: 22,
    category: "漢堡",
    validUntil: "2025-02-15",
    code: "BURGER1",
  },
  {
    id: "4",
    name: "炸雞分享桶",
    items: ["6塊炸雞"],
    itemDetails: [
      { name: "6塊炸雞", replacements: [{ name: "辣味炸雞", price: 0 }] },
    ],
    couponPrice: 299,
    originalPrice: 378,
    discount: 21,
    category: "炸雞",
    validUntil: "2025-01-31",
    code: "BUCKET6",
  },
  {
    id: "5",
    name: "薯條買一送一",
    items: ["薯條(大) x 2"],
    itemDetails: [
      { name: "薯條(大) x 2" },
    ],
    couponPrice: 69,
    originalPrice: 138,
    discount: 50,
    category: "點心",
    validUntil: "2025-01-15",
    code: "FRIES2",
  },
  {
    id: "6",
    name: "雙人分享餐",
    items: ["4塊炸雞", "2個雞塊", "薯條(大)", "可樂(大) x 2"],
    itemDetails: [
      { name: "4塊炸雞", replacements: [{ name: "辣味炸雞", price: 0 }] },
      { name: "2個雞塊", replacements: [{ name: "4個雞塊", price: 30 }] },
      { name: "薯條(大)", replacements: [{ name: "蛋塔 x 2", price: 20 }] },
      { name: "可樂(大) x 2", replacements: [{ name: "雪碧(大) x 2", price: 0 }, { name: "紅茶(大) x 2", price: 0 }] },
    ],
    couponPrice: 349,
    originalPrice: 459,
    discount: 24,
    category: "套餐",
    validUntil: "2025-02-28",
    code: "SHARE2",
  },
  {
    id: "7",
    name: "蜂蜜芥末雞塊",
    items: ["雞塊 6 入", "蜂蜜芥末醬"],
    itemDetails: [
      { name: "雞塊 6 入", replacements: [{ name: "雞塊 9 入", price: 30 }] },
      { name: "蜂蜜芥末醬", replacements: [{ name: "BBQ醬", price: 0 }, { name: "糖醋醬", price: 0 }] },
    ],
    couponPrice: 79,
    originalPrice: 99,
    discount: 20,
    category: "點心",
    validUntil: "2025-01-31",
    code: "NUGGET6",
  },
  {
    id: "8",
    name: "飲料暢飲組",
    items: ["可樂(大) x 2", "雪碧(大)"],
    itemDetails: [
      { name: "可樂(大) x 2", replacements: [{ name: "紅茶(大) x 2", price: 0 }] },
      { name: "雪碧(大)", replacements: [{ name: "可樂(大)", price: 0 }, { name: "紅茶(大)", price: 0 }] },
    ],
    couponPrice: 99,
    originalPrice: 147,
    discount: 33,
    category: "飲料",
    validUntil: "2025-01-20",
    code: "DRINK3",
  },
  {
    id: "9",
    name: "原味炸雞3塊",
    items: ["原味炸雞 x 3"],
    itemDetails: [
      { name: "原味炸雞 x 3", replacements: [{ name: "辣味炸雞 x 3", price: 0 }] },
    ],
    couponPrice: 149,
    originalPrice: 189,
    discount: 21,
    category: "炸雞",
    validUntil: "2025-02-10",
    code: "CHICK3",
  },
  {
    id: "10",
    name: "蛋塔12入派對組",
    items: ["原味蛋塔 x 12"],
    itemDetails: [
      { name: "原味蛋塔 x 12" },
    ],
    couponPrice: 239,
    originalPrice: 348,
    discount: 31,
    category: "蛋塔",
    validUntil: "2025-01-31",
    code: "TART12",
  },
  {
    id: "11",
    name: "辣味咔啦堡",
    items: ["辣味咔啦雞腿堡"],
    itemDetails: [
      { name: "辣味咔啦雞腿堡" },
    ],
    couponPrice: 89,
    originalPrice: 109,
    discount: 18,
    category: "漢堡",
    validUntil: "2025-02-15",
    code: "SPICY1",
  },
  {
    id: "12",
    name: "家庭歡樂桶",
    items: ["9塊炸雞", "薯條(大) x 2", "可樂(大) x 3"],
    itemDetails: [
      { name: "9塊炸雞", replacements: [{ name: "辣味炸雞", price: 0 }] },
      { name: "薯條(大) x 2", replacements: [{ name: "蛋塔 x 4", price: 25 }] },
      { name: "可樂(大) x 3", replacements: [{ name: "雪碧(大) x 3", price: 0 }, { name: "紅茶(大) x 3", price: 0 }] },
    ],
    couponPrice: 549,
    originalPrice: 699,
    discount: 21,
    category: "套餐",
    validUntil: "2025-02-28",
    code: "FAMILY9",
  },
];
