import { test, expect } from "@playwright/test";

test.describe("SEO metadata for admin page", () => {
  test("has title and description for es", async ({ page }) => {
    await page.goto("/es");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
  });
});
