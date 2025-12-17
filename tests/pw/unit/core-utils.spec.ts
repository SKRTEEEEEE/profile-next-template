import { test, expect } from "@playwright/test";
import { double, triple } from "@/core/utils";

test.describe("core/utils - mathematical operations", () => {
  test.describe("double function", () => {
    test("should double positive numbers", () => {
      expect(double(2)).toBe(4);
      expect(double(5)).toBe(10);
      expect(double(100)).toBe(200);
    });

    test("should double negative numbers", () => {
      expect(double(-3)).toBe(-6);
      expect(double(-10)).toBe(-20);
    });

    test("should handle zero", () => {
      expect(double(0)).toBe(0);
    });

    test("should handle decimals", () => {
      expect(double(2.5)).toBe(5);
      expect(double(0.5)).toBe(1);
    });

    test("should handle large numbers", () => {
      expect(double(1000000)).toBe(2000000);
    });
  });

  test.describe("triple function", () => {
    test("should triple positive numbers", () => {
      expect(triple(2)).toBe(6);
      expect(triple(5)).toBe(15);
      expect(triple(10)).toBe(30);
    });

    test("should triple negative numbers", () => {
      expect(triple(-2)).toBe(-6);
      expect(triple(-5)).toBe(-15);
    });

    test("should handle zero", () => {
      expect(triple(0)).toBe(0);
    });

    test("should handle decimals", () => {
      expect(triple(1.5)).toBe(4.5);
      expect(triple(0.3)).toBeCloseTo(0.9, 5);
    });

    test("should handle large numbers", () => {
      expect(triple(1000000)).toBe(3000000);
    });
  });

  test.describe("combined operations", () => {
    test("double and triple should work together", () => {
      const value = 5;
      const doubled = double(value);
      const tripled = triple(value);
      
      expect(doubled).toBe(10);
      expect(tripled).toBe(15);
      expect(tripled - doubled).toBe(5);
    });

    test("triple should equal double plus original", () => {
      const value = 7;
      expect(triple(value)).toBe(double(value) + value);
    });
  });
});
