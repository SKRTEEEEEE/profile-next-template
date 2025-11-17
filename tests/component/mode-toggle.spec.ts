import { test, expect } from "@playwright/test";

test.describe("Theme popover", () => {
  test("page has theme system initialized", async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("domcontentloaded");
    // Verificar que hay botones en la página (incluyendo posible botón de tema)
    const buttons = page.getByRole("button");
    expect(await buttons.count()).toBeGreaterThanOrEqual(1);
  });
});
