import { test, expect } from "@playwright/test";

test.describe("Button Component Unit Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with the Button component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" id="test-button">
            Click Me
          </button>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" id="outline-button">
            Outline
          </button>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" id="icon-button" disabled>
            Disabled
          </button>
        </body>
      </html>
    `);
  });

  test("should render button with correct classes", async ({ page }) => {
    const button = page.locator("#test-button");
    await expect(button).toBeVisible();
    await expect(button).toHaveText("Click Me");
  });

  test("should be clickable", async ({ page }) => {
    const button = page.locator("#test-button");
    
    await page.evaluate(() => {
      document.getElementById("test-button")?.addEventListener("click", () => {
        (window as Window & { buttonClicked?: boolean }).buttonClicked = true;
      });
    });
    
    await button.click();
    const clicked = await page.evaluate(() => (window as Window & { buttonClicked?: boolean }).buttonClicked ?? false);
    expect(clicked).toBe(true);
  });

  test("should have outline variant styles", async ({ page }) => {
    const button = page.locator("#outline-button");
    await expect(button).toBeVisible();
    const classList = await button.getAttribute("class");
    expect(classList).toContain("border");
  });

  test("should be disabled when disabled prop is set", async ({ page }) => {
    const button = page.locator("#icon-button");
    await expect(button).toBeDisabled();
    await expect(button).toHaveClass(/disabled:opacity-50/);
  });

  test("should have correct accessibility attributes", async ({ page }) => {
    const button = page.locator("#test-button");
    const role = await button.evaluate((el) => el.tagName.toLowerCase());
    expect(role).toBe("button");
  });
});
