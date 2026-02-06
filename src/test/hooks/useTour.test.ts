import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTour } from "@/hooks/useTour";

// Mock driver.js
const mockDrive = vi.fn();
const mockDestroy = vi.fn();
let capturedOnDestroyStarted: (() => void) | undefined;

vi.mock("driver.js", () => ({
  driver: vi.fn((config: any) => {
    capturedOnDestroyStarted = config.onDestroyStarted;
    return { drive: mockDrive, destroy: mockDestroy };
  }),
}));

describe("useTour", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    capturedOnDestroyStarted = undefined;
  });

  describe("shouldShowTour", () => {
    it("should return true for first-time visitors", () => {
      const { result } = renderHook(() => useTour());
      expect(result.current.shouldShowTour()).toBe(true);
    });

    it("should return false after tour is completed", () => {
      localStorage.setItem("kcouper-tour-completed", "true");
      const { result } = renderHook(() => useTour());
      expect(result.current.shouldShowTour()).toBe(false);
    });
  });

  describe("startTour", () => {
    it("should call driver.drive()", () => {
      const { result } = renderHook(() => useTour());
      act(() => result.current.startTour());
      expect(mockDrive).toHaveBeenCalledOnce();
    });

    it("should mark tour as completed when destroyed", () => {
      const { result } = renderHook(() => useTour());
      act(() => result.current.startTour());

      // Simulate user finishing/skipping the tour
      expect(capturedOnDestroyStarted).toBeDefined();
      act(() => capturedOnDestroyStarted!());

      expect(localStorage.getItem("kcouper-tour-completed")).toBe("true");
      expect(mockDestroy).toHaveBeenCalledOnce();
    });
  });

  describe("resetTour", () => {
    it("should clear the completion flag", () => {
      localStorage.setItem("kcouper-tour-completed", "true");
      const { result } = renderHook(() => useTour());

      act(() => result.current.resetTour());

      expect(result.current.shouldShowTour()).toBe(true);
      expect(localStorage.getItem("kcouper-tour-completed")).toBeNull();
    });
  });
});
