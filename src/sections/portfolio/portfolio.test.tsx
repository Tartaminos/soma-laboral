import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderSection } from "@/composition/section-catalog";
import type { PortfolioSection as PortfolioSectionProps } from "@/domain/sections";

import { PortfolioSection } from "./portfolio";

const portfolioSection = {
  id: "portfolio",
  type: "portfolio",
  variant: "featured",
  title: "Selected work",
  description: "A concise introduction.",
  featuredPortfolioItemId: "garden",
  items: [
    {
      id: "garden",
      title: "Courtyard garden",
      category: "Landscape",
      description: "A compact garden with native planting.",
      image: {
        src: "/images/portfolio/jardim-de-patio.webp",
        alt: "A stone path through a green courtyard garden.",
        width: 800,
        height: 1200,
        decorative: false,
      },
    },
    {
      id: "shelving",
      title: "Custom shelving",
      image: {
        src: "/images/portfolio/estante-sob-medida.webp",
        alt: "A wide oak shelving unit in a neutral room.",
        width: 1200,
        height: 800,
        decorative: false,
      },
    },
  ],
  action: {
    id: "contact",
    label: "Discuss a project",
    href: "#contact",
    kind: "internal",
  },
} as const satisfies PortfolioSectionProps;

describe("portfolio section", () => {
  it("renders semantic figures, captions, images and the final action", () => {
    const { container } = render(<PortfolioSection {...portfolioSection} />);
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    expect(
      screen.getByRole("heading", { level: 2, name: "Selected work" }),
    ).toBeInTheDocument();
    expect(items).toHaveLength(2);
    expect(container.querySelectorAll("figure")).toHaveLength(2);
    expect(container.querySelectorAll("figcaption")).toHaveLength(2);
    expect(
      screen.getByAltText("A stone path through a green courtyard garden."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Discuss a project" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("is registered in the closed section catalog", () => {
    const { container } = render(renderSection(portfolioSection));

    expect(
      within(container).getByRole("heading", {
        level: 3,
        name: "Courtyard garden",
      }),
    ).toBeInTheDocument();
  });

  it("renders a single featured item without duplication", () => {
    const { container } = render(
      <PortfolioSection
        {...portfolioSection}
        items={[portfolioSection.items[0]]}
      />,
    );

    expect(within(container).getAllByRole("listitem")).toHaveLength(1);
    expect(container.querySelectorAll("figure")).toHaveLength(1);
  });
});
