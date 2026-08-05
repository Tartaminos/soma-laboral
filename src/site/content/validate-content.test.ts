import { describe, expect, it } from "vitest";

import {
  validateOpeningHours,
  validatePortfolio,
  validateServices,
  validateUniqueIds,
} from "@/site/content/validate-content";

describe("content validation", () => {
  it("rejects duplicate and empty identifiers", () => {
    expect(() =>
      validateUniqueIds("services", [{ id: "same" }, { id: "same" }]),
    ).toThrow('duplicate id "same"');
    expect(() => validateUniqueIds("services", [{ id: " " }])).toThrow(
      "must not be empty",
    );
  });

  it("rejects conflicting or inverted opening hours", () => {
    expect(() =>
      validateOpeningHours([
        { id: "closed", isClosed: true, opens: "09:00", closes: "18:00" },
      ]),
    ).toThrow("closed entry");
    expect(() =>
      validateOpeningHours([
        { id: "inverted", isClosed: false, opens: "18:00", closes: "09:00" },
      ]),
    ).toThrow("must close after");
  });

  it("rejects empty fields and HTML in editorial content", () => {
    expect(() =>
      validateServices([
        { id: "invalid", name: "Service", summary: "<strong>Markup</strong>" },
      ]),
    ).toThrow("must not contain HTML");
  });

  it("rejects invalid portfolio content", () => {
    expect(() => validatePortfolio([])).toThrow(
      "portfolio must contain at least one item",
    );
    expect(() =>
      validatePortfolio([
        {
          id: "generic-alt",
          title: "Projeto",
          image: {
            src: "/images/project.webp",
            alt: "foto do trabalho",
            width: 800,
            height: 600,
            decorative: false,
          },
        },
      ]),
    ).toThrow("must describe the visual content");
  });
});
