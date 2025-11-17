import { test, expect } from "@playwright/test";

test.describe("Admin root localized", () => {
  test("Catalan locale renders correctly", async ({ page }) => {
    await page.goto("/ca");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que la página carga con el locale correcto
    await expect(page.locator("html")).toHaveAttribute("lang", "ca");
  });
});
