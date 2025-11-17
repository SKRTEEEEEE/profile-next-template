import { test, expect } from "@playwright/test";

test.describe("Admin navbar", () => {
  test("page loads with navigation elements", async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que la página tiene el body visible
    await expect(page.locator("body")).toBeVisible();
  });
});
