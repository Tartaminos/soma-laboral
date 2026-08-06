import { describe, expect, it } from "vitest";

import {
  createStructuredData,
  resolveCanonical,
  serializeJsonLd,
} from "@/composition/seo";

describe("SEO helpers", () => {
  it("normalizes canonical URLs with trailing slashes", () => {
    expect(resolveCanonical("https://example.org", "/about")).toBe(
      "https://example.org/about/",
    );
    expect(resolveCanonical("https://example.org", "/")).toBe(
      "https://example.org/",
    );
  });

  it("prevents JSON-LD from closing its script element", () => {
    const serialized = serializeJsonLd({ value: "</script><script>" });
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual({ value: "</script><script>" });
  });

  it("omits business details that have not been confirmed", () => {
    const data = createStructuredData({
      baseUrl: "https://example.org",
      business: {
        id: "soma-laboral",
        name: "Soma Laboral",
        shortDescription: "Ginástica Laboral, Quick Massage e SIPAT.",
      },
      openingHours: [],
      sameAs: [],
      type: "ProfessionalService",
    });
    const serialized = JSON.stringify(data);

    expect(serialized).not.toContain("telephone");
    expect(serialized).not.toContain("email");
    expect(serialized).not.toContain("address");
    expect(serialized).not.toContain("openingHoursSpecification");
  });
});
