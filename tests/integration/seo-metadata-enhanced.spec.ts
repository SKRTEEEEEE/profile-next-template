import { test, expect } from "@playwright/test";

test.describe("Enhanced SEO metadata", () => {
  test("page has metadata", async ({ page }) => {
    await page.goto("/es");
    // Verificar que tiene title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});
