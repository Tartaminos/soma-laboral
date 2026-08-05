import { describe, expect, it } from "vitest";

import type { PageSource } from "@/domain/pages";
import { resolvePage } from "@/composition/resolve-page";
import { resolvePreset } from "@/presets/resolve-preset";
import { createHomeContent } from "@/site/pages/home-content";

const expectedCompositions = {
  services: [
    "site-header:standard",
    "hero:split",
    "services:featured",
    "portfolio:grid",
    "highlights:cards",
    "about:text",
    "testimonials:featured",
    "contact:split",
    "call-to-action:banner",
    "site-footer:standard",
  ],
  commerce: [
    "site-header:standard",
    "hero:split",
    "product-showcase:spotlight",
    "highlights:inline",
    "about:text",
    "contact:split",
    "call-to-action:panel",
    "site-footer:standard",
  ],
  professional: [
    "site-header:standard",
    "hero:centered",
    "professional-profile:credentials",
    "services:grid",
    "portfolio:featured",
    "highlights:inline",
    "testimonials:featured",
    "contact:compact",
    "call-to-action:panel",
    "site-footer:standard",
  ],
} as const;

describe("page resolver", () => {
  for (const presetId of ["services", "commerce", "professional"] as const) {
    it(`resolves the ${presetId} preset in the specified order`, () => {
      const source: PageSource = {
        id: `${presetId}-home`,
        route: "/",
        title: "Home",
        content: createHomeContent(presetId),
      };
      const page = resolvePage(source, resolvePreset(presetId));
      expect(
        page.sections.map(
          (section) => `${section.type}:${section.variant}`,
        ),
      ).toEqual(
        expectedCompositions[presetId],
      );
    });
  }

  it("rejects orphan content", () => {
    const content = createHomeContent("services");
    const source: PageSource = {
      id: "invalid",
      route: "/",
      title: "Invalid",
      content: [...content, { ...content[1], id: "orphan" }],
    };
    expect(() => resolvePage(source, resolvePreset("services"))).toThrow(
      'orphan content: orphan',
    );
  });

  it("rejects invalid featured item references", () => {
    const content = createHomeContent("services").map((entry) =>
      entry.type === "services"
        ? { ...entry, featuredServiceId: "missing" }
        : entry,
    );
    expect(() =>
      resolvePage(
        { id: "invalid", route: "/", title: "Invalid", content },
        resolvePreset("services"),
      ),
    ).toThrow('unknown service id "missing"');
  });

  it("validates portfolio collections and featured references", () => {
    const baseContent = createHomeContent("services");

    expect(() =>
      resolvePage(
        {
          id: "empty-portfolio",
          route: "/",
          title: "Invalid",
          content: baseContent.map((entry) =>
            entry.type === "portfolio" ? { ...entry, items: [] } : entry,
          ),
        },
        resolvePreset("services"),
      ),
    ).toThrow('Section "portfolio" requires at least one portfolio item');

    expect(() =>
      resolvePage(
        {
          id: "duplicate-portfolio",
          route: "/",
          title: "Invalid",
          content: baseContent.map((entry) =>
            entry.type === "portfolio"
              ? { ...entry, items: [entry.items[0], entry.items[0]] }
              : entry,
          ),
        },
        resolvePreset("services"),
      ),
    ).toThrow('duplicate portfolio item id "custom-shelving"');

    expect(() =>
      resolvePage(
        {
          id: "invalid-featured-portfolio",
          route: "/",
          title: "Invalid",
          content: baseContent.map((entry) =>
            entry.type === "portfolio"
              ? { ...entry, featuredPortfolioItemId: "missing" }
              : entry,
          ),
        },
        resolvePreset("services"),
      ),
    ).toThrow('unknown portfolio item id "missing"');

    expect(() =>
      resolvePage(
        {
          id: "invalid-portfolio-copy",
          route: "/",
          title: "Invalid",
          content: baseContent.map((entry) =>
            entry.type === "portfolio"
              ? {
                  ...entry,
                  items: [
                    {
                      ...entry.items[0],
                      title: " ",
                      image: {
                        ...entry.items[0].image,
                        alt: "foto do trabalho",
                      },
                    },
                  ],
                }
              : entry,
          ),
        },
        resolvePreset("services"),
      ),
    ).toThrow('portfolio item "custom-shelving" requires a title');
  });

  it("promotes one referenced portfolio item without duplicating it", () => {
    const content = createHomeContent("services").map((entry) =>
      entry.type === "portfolio"
        ? { ...entry, featuredPortfolioItemId: "botanical-cakes" }
        : entry,
    );
    const page = resolvePage(
      { id: "portfolio-featured", route: "/", title: "Home", content },
      resolvePreset("services"),
    );
    const portfolio = page.sections.find(
      (section) => section.type === "portfolio",
    );

    expect(portfolio?.variant).toBe("featured");
    expect(
      portfolio?.type === "portfolio" ? portfolio.items[0]?.id : undefined,
    ).toBe("botanical-cakes");
    expect(
      portfolio?.type === "portfolio"
        ? portfolio.items.filter((item) => item.id === "botanical-cakes")
        : [],
    ).toHaveLength(1);
  });

  it("preserves the grid variant without a featured portfolio item", () => {
    const page = resolvePage(
      {
        id: "portfolio-grid",
        route: "/",
        title: "Home",
        content: createHomeContent("services"),
      },
      resolvePreset("services"),
    );

    expect(
      page.sections.find((section) => section.type === "portfolio")?.variant,
    ).toBe("grid");
  });

  it("rejects an explicit featured portfolio without a featured id", () => {
    const page = resolvePage(
      {
        id: "portfolio-grid",
        route: "/",
        title: "Home",
        content: createHomeContent("services"),
      },
      resolvePreset("services"),
    );
    const explicitSections = page.sections.map((section) =>
      section.type === "portfolio"
        ? { ...section, variant: "featured" as const }
        : section,
    );

    expect(() =>
      resolvePage(
        {
          id: "explicit-featured",
          route: "/",
          title: "Invalid",
          content: [],
          explicitSections,
        },
        resolvePreset("services"),
      ),
    ).toThrow("featuredPortfolioItemId");
  });

  it("omits optional portfolio content with coordinated navigation", () => {
    const content = createHomeContent("services")
      .filter((entry) => entry.type !== "portfolio")
      .map((entry) =>
        entry.type === "site-header"
          ? {
              ...entry,
              navigation: entry.navigation.filter(
                (item) => item.href !== "#portfolio",
              ),
            }
          : entry,
      );
    const page = resolvePage(
      { id: "without-portfolio", route: "/", title: "Home", content },
      resolvePreset("services"),
    );

    expect(page.sections.some((section) => section.type === "portfolio")).toBe(
      false,
    );
    expect(page.navigation.some((item) => item.href === "#portfolio")).toBe(
      false,
    );
  });
});
