import { test, expect } from "@playwright/test";

test.describe("Locale routing", () => {
  test("/es responds with hero", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("main")).toBeVisible();
  });
});
