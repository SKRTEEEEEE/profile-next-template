import { test, expect } from "@playwright/test";

test.describe("Admin status use cases", () => {
  test("UI renders status section", async ({ page }) => {
    await page.goto("/es");
    // Verificar que existe la sección de status
    const statusSection = page.locator(".admin-status-grid, .admin-card").first();
    await expect(statusSection).toBeVisible();
  });
});
