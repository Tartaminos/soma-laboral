import { describe, expect, it } from "vitest";

import { resolveDemoPage } from "@/app/demo/_lib/resolve-demo-page";

const expectations = {
  services: {
    included: ["services"],
    excluded: ["product-showcase", "professional-profile"],
  },
  commerce: {
    included: ["product-showcase"],
    excluded: ["services", "professional-profile"],
  },
  professional: {
    included: ["professional-profile", "services"],
    excluded: ["product-showcase"],
  },
} as const;

describe("demo page resolver", () => {
  for (const presetId of ["services", "commerce", "professional"] as const) {
    it(`uses ${presetId} for both content and blueprint resolution`, () => {
      const page = resolveDemoPage(presetId);
      const sectionTypes = page.sections.map((section) => section.type);

      expect(page.id).toBe(`demo-${presetId}`);
      expect(page.route).toBe(`/demo/${presetId}/`);
      expect(page.seo?.isIndexable).toBe(false);
      for (const includedType of expectations[presetId].included) {
        expect(sectionTypes).toContain(includedType);
      }
      for (const excludedType of expectations[presetId].excluded) {
        expect(sectionTypes).not.toContain(excludedType);
      }
    });
  }
});
