import { test, expect } from "@playwright/test";

test.describe("Admin root page", () => {
  test("renders page with main content in Spanish", async ({ page }) => {
    await page.goto("/es");
    // Verificar que la página carga
    await expect(page.locator("main")).toBeVisible();
    // Verificar que hay contenido en español
    const hero = page.locator(".admin-hero, h1").first();
    await expect(hero).toBeVisible();
  });
});
