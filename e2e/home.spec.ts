import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the static home, navigation and structured data", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Bem-estar no trabalho começa com atenção às pessoas.",
    }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://example.com/",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
  await page.getByRole("link", { name: "Serviços" }).first().click();
  await expect(page.locator("#services")).toBeInViewport();
  await expect(page.getByText("Estúdio Horizonte")).toHaveCount(0);
  await expect(page.locator("#testimonials, #cta")).toHaveCount(0);
  expect(runtimeErrors).toEqual([]);
});

test("has no serious automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(serious).toEqual([]);
});

test("mobile menu is operable and the page does not overflow at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Fechar menu" }).click();
  await expect(menu).toBeFocused();

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
