import { test, expect } from "@playwright/test";
import { cn, gradients } from "@/lib/utils";

test.describe("lib/utils - cn function", () => {
  test("should merge class names correctly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  test("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  test("should handle false/null/undefined values", () => {
    const result = cn("base-class", false && "false-class", null, undefined);
    expect(result).toBe("base-class");
  });

  test("should merge conflicting tailwind classes", () => {
    const result = cn("px-2 py-1 px-4");
    // twMerge should keep only the last px value
    expect(result).toContain("px-4");
    expect(result).toContain("py-1");
    expect(result).not.toMatch(/px-2/);
  });

  test("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  test("should handle array of classes", () => {
    const result = cn(["text-lg", "font-bold"]);
    expect(result).toBe("text-lg font-bold");
  });

  test("should handle object with boolean values", () => {
    const result = cn({
      "text-red-500": true,
      "bg-blue-500": false,
      "hover:opacity-80": true,
    });
    expect(result).toContain("text-red-500");
    expect(result).toContain("hover:opacity-80");
    expect(result).not.toContain("bg-blue-500");
  });
});

test.describe("lib/utils - gradients", () => {
  test("should export an array of gradients", () => {
    expect(Array.isArray(gradients)).toBe(true);
    expect(gradients.length).toBeGreaterThan(0);
  });

  test("should contain valid CSS gradient strings", () => {
    gradients.forEach((gradient) => {
      expect(gradient).toContain("linear-gradient");
      expect(gradient).toMatch(/\d+deg/);
      expect(gradient).toContain("rgba");
    });
  });

  test("should have gradients with cyberpunk color palette", () => {
    // Check that gradients include expected colors
    const gradientsString = gradients.join(" ");
    expect(gradientsString).toContain("rgba");
  });

  test("should have correct gradient format", () => {
    const sampleGradient = gradients[0];
    expect(sampleGradient).toMatch(
      /linear-gradient\(\d+(\.\d+)?deg,\s*rgba\([^)]+\)\s*-?\d+(\.\d+)?%,\s*rgba\([^)]+\)\s*\d+(\.\d+)?%\)/
    );
  });
});
