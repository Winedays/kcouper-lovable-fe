import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (className utility)", () => {
  describe("基本用法", () => {
    it("應該合併多個類別名稱", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    it("應該處理單一類別", () => {
      const result = cn("class1");
      expect(result).toBe("class1");
    });

    it("應該處理空輸入", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });

  describe("條件類別", () => {
    it("應該處理條件式類別", () => {
      const isActive = true;
      const result = cn("base", isActive && "active");
      expect(result).toBe("base active");
    });

    it("應該過濾掉 falsy 值", () => {
      const result = cn("base", false, null, undefined, "active");
      expect(result).toBe("base active");
    });

    it("應該處理物件語法", () => {
      const result = cn("base", { active: true, disabled: false });
      expect(result).toBe("base active");
    });
  });

  describe("Tailwind 合併", () => {
    it("應該合併衝突的 Tailwind 類別", () => {
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("應該處理複雜的 Tailwind 覆寫", () => {
      const result = cn("bg-red-500 text-white", "bg-blue-500");
      expect(result).toBe("text-white bg-blue-500");
    });

    it("應該保留非衝突的類別", () => {
      const result = cn("flex items-center", "justify-between gap-2");
      expect(result).toBe("flex items-center justify-between gap-2");
    });
  });

  describe("陣列輸入", () => {
    it("應該處理陣列輸入", () => {
      const result = cn(["class1", "class2"]);
      expect(result).toBe("class1 class2");
    });

    it("應該處理巢狀陣列", () => {
      const result = cn(["class1", ["class2", "class3"]]);
      expect(result).toBe("class1 class2 class3");
    });
  });

  describe("常見使用情境", () => {
    it("應該處理按鈕樣式覆寫", () => {
      const baseStyles = "px-4 py-2 rounded-md bg-primary text-primary-foreground";
      const customStyles = "bg-secondary text-secondary-foreground";
      const result = cn(baseStyles, customStyles);
      expect(result).toContain("bg-secondary");
      expect(result).toContain("text-secondary-foreground");
      expect(result).not.toContain("bg-primary");
    });

    it("應該處理響應式類別", () => {
      const result = cn("w-full", "md:w-1/2", "lg:w-1/3");
      expect(result).toBe("w-full md:w-1/2 lg:w-1/3");
    });
  });
});
