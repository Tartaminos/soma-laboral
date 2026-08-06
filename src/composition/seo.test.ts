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

  it("publishes confirmed contact and service area without invented hours", () => {
    const data = createStructuredData({
      baseUrl: "https://somalaboral.com.br",
      business: {
        id: "soma-laboral",
        name: "Soma Laboral",
        shortDescription: "Ginástica Laboral, Quick Massage e SIPAT.",
        phone: "+55 19 99746-2703",
      },
      logoPath: "/brand/soma-laboral-logo.webp",
      openingHours: [],
      sameAs: [
        {
          id: "instagram",
          label: "Abrir Instagram da Soma Laboral",
          href: "https://www.instagram.com/somaginasticalaboral/",
        },
      ],
      serviceArea: {
        type: "country",
        name: "Brasil",
        countryCode: "BR",
        label: "Em todo o Brasil",
      },
      type: "ProfessionalService",
    });

    expect(data).toMatchObject({
      telephone: "+55 19 99746-2703",
      sameAs: ["https://www.instagram.com/somaginasticalaboral/"],
      areaServed: {
        "@type": "Country",
        name: "Brasil",
        identifier: "BR",
      },
    });
    expect(JSON.stringify(data)).not.toContain("OpeningHoursSpecification");
    expect(JSON.stringify(data)).not.toContain("PostalAddress");
  });
});
