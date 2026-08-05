import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const demos = [
  {
    id: "services",
    label: "Serviços",
    sectionId: "services",
  },
  {
    id: "commerce",
    label: "Comércio",
    sectionId: "products",
  },
  {
    id: "professional",
    label: "Profissional",
    sectionId: "profile",
  },
] as const;

for (const demo of demos) {
  test(`${demo.id} demo is static, non-indexable and identifies its preset`, async ({
    page,
  }) => {
    await page.goto(`/demo/${demo.id}/`);

    await expect(page.locator(`#${demo.sectionId}`)).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);

    const trigger = page.getByRole("button", {
      name: "Alternar preset de demonstração",
    });
    await trigger.click();
    await expect(
      page.getByRole("link", { name: `${demo.label}, atual` }),
    ).toHaveAttribute("aria-current", "page");

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(serious).toEqual([]);

    await page.reload();
    await expect(page.locator(`#${demo.sectionId}`)).toBeVisible();
  });
}

test("switches presets with links, closes on Escape and fits at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/demo/services/");

  const trigger = page.getByRole("button", {
    name: "Alternar preset de demonstração",
  });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByRole("link", { name: "Comércio" }).click();
  await expect(page).toHaveURL(/\/demo\/commerce\/$/);
  await expect(page.locator("#products")).toBeVisible();
  await expect(page.evaluate(() => window.scrollY)).resolves.toBe(0);

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});

for (const presetId of ["services", "professional"] as const) {
  test(`${presetId} portfolio is navigable and loads every local image`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/demo/${presetId}/`);

    await page.getByRole("link", { name: "Portfólio" }).first().click();
    await expect(page.locator("#portfolio")).toBeInViewport();

    const images = page.locator("#portfolio img");
    await expect(images).toHaveCount(3);
    for (let index = 0; index < (await images.count()); index += 1) {
      await expect
        .poll(() =>
          images.nth(index).evaluate(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }

    const hasOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}

test("commerce demo does not include portfolio", async ({ page }) => {
  await page.goto("/demo/commerce/");

  await expect(page.locator("#portfolio")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Portfólio" })).toHaveCount(0);
});
