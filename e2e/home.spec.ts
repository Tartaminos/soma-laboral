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
    "https://somalaboral.com.br/",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
  await page.getByRole("link", { name: "Serviços" }).first().click();
  await expect(page.locator("#services")).toBeInViewport();
  await expect(page.getByText("Estúdio Horizonte")).toHaveCount(0);
  await expect(page.locator("#testimonials, #cta")).toHaveCount(0);
  await expect(page.locator('a[href^="https://wa.me/5519997462703"]')).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Abrir Instagram da Soma Laboral" }),
  ).toHaveCount(1);
  await expect(page.getByText("Americana/SP", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Segunda a sexta, em horário comercial."),
  ).toBeVisible();
  await expect(page.getByText("+55 19 99746-2703")).toHaveCount(0);
  await expect(page.locator("#portfolio figure")).toHaveCount(6);
  await expect(page.getByText("Quick Massage no trabalho")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Desenvolvido por Contestech" }),
  ).toHaveAttribute("href", "https://contestech.com.br/");
  expect(runtimeErrors).toEqual([]);
});

test("uses decorative hero video after the text and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const video = page.locator("#home video");
  await expect(video).toHaveAttribute("poster", "/images/hero/soma-laboral-hero-poster.webp");
  await expect(video).toHaveAttribute("preload", "metadata");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).toHaveAttribute("muted", "");
  await expect(video.locator("source")).toHaveAttribute(
    "src",
    "/images/hero/soma-laboral-hero.mp4",
  );
  await expect
    .poll(() =>
      video.evaluate(
        (element) => element instanceof HTMLVideoElement && element.paused,
      ),
    )
    .toBe(true);

  const textPrecedesVideo = await page.locator("#home").evaluate((hero) => {
    const heading = hero.querySelector("h1");
    const media = hero.querySelector("video");
    return Boolean(
      heading &&
        media &&
        (heading.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING),
    );
  });
  expect(textPrecedesVideo).toBe(true);
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

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
]) {
  test(`does not overflow horizontally at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}
