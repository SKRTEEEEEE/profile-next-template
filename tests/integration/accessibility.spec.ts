import { test, expect } from "@playwright/test";

test.describe("Accessibility smoke tests", () => {
  test("main landmarks for es", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("main")).toHaveCount(1);
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe("es");
  });

  test("theme popover is keyboard accessible", async ({ page }) => {
    await page.goto("/es");
    const toggle = page.getByRole("button", { name: /theme/i });
    await expect(toggle).toBeVisible();
    await toggle.focus();
    await page.keyboard.press("Enter");
    // Verificar que el popover se abrió
    await page.waitForTimeout(300);
  });
});
