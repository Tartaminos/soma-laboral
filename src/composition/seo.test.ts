import { describe, expect, it } from "vitest";

import {
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
});
