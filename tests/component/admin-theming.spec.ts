import { test, expect } from "@playwright/test";

test.describe("Admin theming", () => {
  test("page loads with theme attribute", async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que el HTML tiene el atributo data-theme
    const themeAttr = await page.locator("html").getAttribute("data-theme");
    expect(themeAttr).toBeTruthy();
  });
});
