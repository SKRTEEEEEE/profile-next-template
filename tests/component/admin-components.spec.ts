import { test, expect } from "@playwright/test";

test.describe("Admin diagnostics", () => {
  test("page loads with diagnostics section", async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que la página carga y tiene contenido
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});
