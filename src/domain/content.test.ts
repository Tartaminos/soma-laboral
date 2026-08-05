import { describe, expect, it } from "vitest";

import type { PortfolioItem } from "@/domain/content";

describe("portfolio item contract", () => {
  it("requires an informative image", () => {
    const validItem = {
      id: "valid",
      title: "Valid work",
      image: {
        src: "/images/valid.webp",
        alt: "A detailed view of the completed work.",
        width: 800,
        height: 600,
        decorative: false,
      },
    } as const satisfies PortfolioItem;

    const decorativeImage = {
      src: "/images/decorative.webp",
      width: 800,
      height: 600,
      decorative: true,
    } as const;

    const decorativeItem: PortfolioItem = {
      id: "decorative",
      title: "Decorative work",
      // @ts-expect-error -- Portfolio images must be informative and provide alt text.
      image: decorativeImage,
    };

    // @ts-expect-error -- Every portfolio item must include an image.
    const missingImageItem: PortfolioItem = {
      id: "missing",
      title: "Missing image",
    };

    expect(validItem.image.decorative).toBe(false);
    void decorativeItem;
    void missingImageItem;
  });
});
