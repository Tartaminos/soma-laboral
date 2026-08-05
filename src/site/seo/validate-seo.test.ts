import { describe, expect, it } from "vitest";

import type { SeoConfiguration } from "@/domain/seo";
import { validateSeoConfiguration } from "@/site/seo/validate-seo";

const seo: SeoConfiguration = {
  defaultTitle: "Business",
  titleTemplate: "%s | Business",
  defaultDescription: "Business description",
  locale: "pt_BR",
  structuredDataType: "LocalBusiness",
};

describe("SEO configuration", () => {
  it("rejects empty content and templates without a placeholder", () => {
    expect(() =>
      validateSeoConfiguration({ ...seo, defaultTitle: " " }),
    ).toThrow("seo.defaultTitle");
    expect(() =>
      validateSeoConfiguration({ ...seo, titleTemplate: "Business" }),
    ).toThrow('"%s"');
  });
});
