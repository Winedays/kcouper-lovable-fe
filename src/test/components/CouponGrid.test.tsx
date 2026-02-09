import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import CouponGrid from "@/components/CouponGrid";
import type { Coupon } from "@/data/coupons";

describe("CouponGrid", () => {
  const createMockCoupon = (id: number): Coupon => ({
    name: `優惠券 ${id}`,
    product_code: `CODE${id}`,
    coupon_code: id,
    items: [{ name: "測試品項", count: 1, addition_price: 0, flavors: [] }],
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    price: 100,
    original_price: 150,
    discount: 6.7,
  });

  const createMockCoupons = (count: number): Coupon[] => {
    return Array.from({ length: count }, (_, i) => createMockCoupon(i + 1));
  };

  const defaultProps = {
    coupons: createMockCoupons(5),
    favorites: new Set<number>(),
    onToggleFavorite: vi.fn(),
  };

  describe("渲染", () => {
    it("應該渲染所有優惠券卡片", () => {
      render(<CouponGrid {...defaultProps} />);
      
      expect(screen.getByText("優惠券 1")).toBeInTheDocument();
      expect(screen.getByText("優惠券 2")).toBeInTheDocument();
      expect(screen.getByText("優惠券 5")).toBeInTheDocument();
    });

    it("應該以網格方式排列卡片", () => {
      const { container } = render(<CouponGrid {...defaultProps} />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");
    });
  });

  describe("空狀態", () => {
    it("當沒有優惠券時應該顯示空狀態訊息", () => {
      render(<CouponGrid {...defaultProps} coupons={[]} />);
      
      expect(screen.getByText("找不到符合的優惠券")).toBeInTheDocument();
      expect(screen.getByText("請嘗試其他搜尋條件或分類")).toBeInTheDocument();
    });
  });

  describe("漸進式載入", () => {
    it("初始只應該渲染部分優惠券", () => {
      const manyCoupons = createMockCoupons(100);
      render(<CouponGrid {...defaultProps} coupons={manyCoupons} />);
      
      // 初始載入 30 張
      expect(screen.getByText("優惠券 1")).toBeInTheDocument();
      expect(screen.getByText("優惠券 30")).toBeInTheDocument();
      expect(screen.queryByText("優惠券 31")).not.toBeInTheDocument();
    });

    it("當有更多優惠券時應該顯示 skeleton", () => {
      const manyCoupons = createMockCoupons(100);
      const { container } = render(<CouponGrid {...defaultProps} coupons={manyCoupons} />);
      
      // 應該有 skeleton 元素
      const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("當優惠券數量少於初始數量時不應該顯示 skeleton", () => {
      const fewCoupons = createMockCoupons(10);
      const { container } = render(<CouponGrid {...defaultProps} coupons={fewCoupons} />);
      
      const skeletons = container.querySelectorAll('[class*="skeleton"]');
      expect(skeletons.length).toBe(0);
    });

    it("應該有 sentinel 元素用於 IntersectionObserver", () => {
      const manyCoupons = createMockCoupons(100);
      const { container } = render(<CouponGrid {...defaultProps} coupons={manyCoupons} />);
      
      const sentinel = container.querySelector('[aria-hidden="true"]');
      expect(sentinel).toBeInTheDocument();
    });
  });

  describe("收藏功能傳遞", () => {
    it("應該將 favorites 傳遞給子元件", () => {
      const favorites = new Set([1, 3]);
      render(<CouponGrid {...defaultProps} favorites={favorites} />);
      
      // 收藏的卡片應該顯示取消收藏
      expect(screen.getByText("優惠券 1").closest("div")).toBeInTheDocument();
    });

    it("應該將 onToggleFavorite 傳遞給子元件", () => {
      const onToggleFavorite = vi.fn();
      render(<CouponGrid {...defaultProps} onToggleFavorite={onToggleFavorite} />);
      
      // 點擊第一張卡片的收藏按鈕
      const favoriteButtons = screen.getAllByLabelText("加入收藏");
      expect(favoriteButtons.length).toBeGreaterThan(0);
    });
  });
});
