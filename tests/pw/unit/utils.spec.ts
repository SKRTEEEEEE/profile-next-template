import { double, triple } from "@/core/utils";
import test, { expect } from "@playwright/test";

  test("Some functions from utils are covered", async () => {
    expect(double(2)).toBe(4);
    expect(double(3)).toBe(6);
    expect(triple(2)).toBe(6);
  })