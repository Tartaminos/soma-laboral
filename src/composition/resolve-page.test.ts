import { describe, expect, it } from "vitest";

import type { PageSource } from "@/domain/pages";
import type { SectionContentEntry } from "@/domain/sections";
import { resolvePage } from "@/composition/resolve-page";
import { resolvePreset } from "@/presets/resolve-preset";
import { homePageSource } from "@/site/pages/home";
import { createHomeContent } from "@/site/pages/home-content";

const expectedCompositions = {
  services: [
    "site-header:standard",
    "hero:split",
    "services:featured",
    "portfolio:grid",
    "highlights:cards",
    "about:text",
    "contact:split",
    "site-footer:standard",
  ],
  commerce: [
    "site-header:standard",
    "hero:split",
    "product-showcase:spotlight",
    "highlights:inline",
    "about:text",
    "contact:split",
    "site-footer:standard",
  ],
  professional: [
    "site-header:standard",
    "hero:centered",
    "professional-profile:credentials",
    "services:grid",
    "highlights:inline",
    "contact:compact",
    "site-footer:standard",
  ],
} as const;

const portfolioContent = {
  id: "portfolio",
  type: "portfolio",
  title: "Soma em ação",
  items: [
    {
      id: "workplace-exercise-session",
      title: "Ginástica Laboral com a equipe",
      image: {
        src: "/images/portfolio/workplace-exercise-session.webp",
        alt: "Colaboradores participam de uma atividade orientada no trabalho.",
        width: 1200,
        height: 800,
        decorative: false,
      },
    },
  ],
} as const satisfies SectionContentEntry;

describe("page resolver", () => {
  it("resolves the approved Soma Laboral composition", () => {
    const page = resolvePage(homePageSource, resolvePreset("services"));

    expect(page.sections.map((section) => section.type)).toEqual([
      "site-header",
      "hero",
      "services",
      "highlights",
      "portfolio",
      "about",
      "contact",
      "site-footer",
    ]);
    expect(
      page.sections.some(
        (section) =>
          section.type === "testimonials" || section.type === "call-to-action",
      ),
    ).toBe(false);

    const servicesSection = page.sections.find(
      (section) => section.type === "services",
    );
    expect(
      servicesSection?.type === "services"
        ? servicesSection.featuredServiceId
        : undefined,
    ).toBe("workplace-exercise");

    const portfolioSection = page.sections.find(
      (section) => section.type === "portfolio",
    );
    expect(portfolioSection?.variant).toBe("mosaic");
    expect(
      portfolioSection?.type === "portfolio"
        ? portfolioSection.items
        : [],
    ).toHaveLength(6);
  });

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
    const baseContent = [...createHomeContent("services"), portfolioContent];

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
    ).toThrow('duplicate portfolio item id "workplace-exercise-session"');

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
    ).toThrow(
      'portfolio item "workplace-exercise-session" requires a title',
    );
  });

  it("promotes one referenced portfolio item without duplicating it", () => {
    const content = [...createHomeContent("services"), portfolioContent].map((entry) =>
      entry.type === "portfolio"
        ? { ...entry, featuredPortfolioItemId: "workplace-exercise-session" }
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
    ).toBe("workplace-exercise-session");
    expect(
      portfolio?.type === "portfolio"
        ? portfolio.items.filter(
            (item) => item.id === "workplace-exercise-session",
          )
        : [],
    ).toHaveLength(1);
  });

  it("preserves the grid variant without a featured portfolio item", () => {
    const page = resolvePage(
      {
        id: "portfolio-grid",
        route: "/",
        title: "Home",
        content: [...createHomeContent("services"), portfolioContent],
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
        content: [...createHomeContent("services"), portfolioContent],
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
