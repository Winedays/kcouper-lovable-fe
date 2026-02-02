import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import ItemFilter, { itemFilters, filterMatchRules, type ItemFilterId } from "@/components/ItemFilter";

describe("ItemFilter", () => {
  const defaultProps = {
    activeFilters: [] as ItemFilterId[],
    onFilterToggle: vi.fn(),
    onClearAll: vi.fn(),
    showFavoritesOnly: false,
    onToggleFavorites: vi.fn(),
    favoritesCount: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("渲染", () => {
    it("應該渲染收藏按鈕", () => {
      render(<ItemFilter {...defaultProps} />);
      expect(screen.getByText("收藏")).toBeInTheDocument();
    });

    it("應該渲染所有餐點篩選按鈕", () => {
      render(<ItemFilter {...defaultProps} />);
      
      itemFilters.forEach((filter) => {
        expect(screen.getByText(filter.label)).toBeInTheDocument();
        expect(screen.getByText(filter.emoji)).toBeInTheDocument();
      });
    });

    it("當沒有啟用篩選時不應該顯示清除按鈕", () => {
      render(<ItemFilter {...defaultProps} />);
      expect(screen.queryByText("清除篩選")).not.toBeInTheDocument();
    });
  });

  describe("收藏功能", () => {
    it("點擊收藏按鈕應該呼叫 onToggleFavorites", () => {
      const onToggleFavorites = vi.fn();
      render(<ItemFilter {...defaultProps} onToggleFavorites={onToggleFavorites} />);
      
      fireEvent.click(screen.getByText("收藏"));
      expect(onToggleFavorites).toHaveBeenCalledTimes(1);
    });

    it("當有收藏時應該顯示收藏數量", () => {
      render(<ItemFilter {...defaultProps} favoritesCount={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("當收藏為 0 時不應該顯示數量", () => {
      render(<ItemFilter {...defaultProps} favoritesCount={0} />);
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("啟用收藏篩選時應該顯示清除按鈕", () => {
      render(<ItemFilter {...defaultProps} showFavoritesOnly={true} />);
      expect(screen.getByText("清除篩選")).toBeInTheDocument();
    });
  });

  describe("餐點篩選", () => {
    it("點擊篩選按鈕應該呼叫 onFilterToggle", () => {
      const onFilterToggle = vi.fn();
      render(<ItemFilter {...defaultProps} onFilterToggle={onFilterToggle} />);
      
      fireEvent.click(screen.getByText("蛋撻"));
      expect(onFilterToggle).toHaveBeenCalledWith("蛋撻");
    });

    it("啟用篩選時應該顯示清除按鈕", () => {
      render(<ItemFilter {...defaultProps} activeFilters={["蛋撻"]} />);
      expect(screen.getByText("清除篩選")).toBeInTheDocument();
    });

    it("可以同時啟用多個篩選", () => {
      render(<ItemFilter {...defaultProps} activeFilters={["蛋撻", "炸雞", "雞塊"]} />);
      // All three filters are active, clear button should be visible
      expect(screen.getByText("清除篩選")).toBeInTheDocument();
    });
  });

  describe("清除篩選", () => {
    it("點擊清除按鈕應該呼叫 onClearAll", () => {
      const onClearAll = vi.fn();
      render(<ItemFilter {...defaultProps} activeFilters={["蛋撻"]} onClearAll={onClearAll} />);
      
      fireEvent.click(screen.getByText("清除篩選"));
      expect(onClearAll).toHaveBeenCalledTimes(1);
    });
  });
});

describe("filterMatchRules", () => {
  it("應該包含所有篩選器的規則", () => {
    itemFilters.forEach((filter) => {
      expect(filterMatchRules[filter.id]).toBeDefined();
    });
  });

  it("蛋撻規則應該包含正確的比對字串", () => {
    expect(filterMatchRules["蛋撻"]).toContain("原味蛋撻");
    expect(filterMatchRules["蛋撻"]).toContain("蛋撻");
  });

  it("脆薯規則應該包含多種變體", () => {
    const rules = filterMatchRules["脆薯"];
    expect(rules).toContain("香酥脆薯");
    expect(rules).toContain("小薯");
    expect(rules).toContain("薯條");
  });

  it("漢堡類規則應該包含正確的品項", () => {
    expect(filterMatchRules["咔啦雞堡"]).toContain("咔啦雞腿堡");
    expect(filterMatchRules["花生熔岩雞腿堡"]).toContain("花生熔岩卡啦雞腿堡");
    expect(filterMatchRules["烤雞腿堡"]).toContain("紐奧良烙烤雞腿堡");
  });
});

describe("itemFilters", () => {
  it("應該有 14 個篩選項目", () => {
    expect(itemFilters.length).toBe(14);
  });

  it("每個篩選都應該有 id、label 和 emoji", () => {
    itemFilters.forEach((filter) => {
      expect(filter.id).toBeDefined();
      expect(filter.label).toBeDefined();
      expect(filter.emoji).toBeDefined();
    });
  });

  it("漢堡類應該使用 🍔 emoji", () => {
    const burgerFilters = itemFilters.filter((f) =>
      ["咔啦雞堡", "花生熔岩雞腿堡", "椒麻雞腿堡", "烤雞腿堡"].includes(f.id)
    );
    burgerFilters.forEach((filter) => {
      expect(filter.emoji).toBe("🍔");
    });
  });
});
