import { test, expect } from "@playwright/test";

test.describe("Admin hero composition", () => {
  test("page loads with hero content", async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que hay un h1 en la página
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});
