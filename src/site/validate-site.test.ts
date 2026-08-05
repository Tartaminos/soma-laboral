import { describe, expect, it } from "vitest";

import type { BusinessIdentity, SiteSettings } from "@/domain/site";
import {
  resolveDeployEnvironment,
  validateProductionUrl,
  validateSiteConfiguration,
} from "@/site/validate-site";

const settings: SiteSettings = {
  name: "Example",
  language: "pt-BR",
  locale: "pt_BR",
  baseUrl: "https://example.org",
  presetId: "services",
  themeId: "default",
};

const identity: BusinessIdentity = {
  id: "example",
  name: "Example",
  shortDescription: "Description",
  email: "contact@example.org",
  phone: "+55 11 99999-9999",
};

describe("site validation", () => {
  it("accepts a complete configuration", () => {
    expect(() => validateSiteConfiguration(settings, identity)).not.toThrow();
  });

  it("rejects an invalid base URL and empty required content", () => {
    expect(() =>
      validateSiteConfiguration({ ...settings, baseUrl: "/relative" }, identity),
    ).toThrow();
    expect(() =>
      validateSiteConfiguration(settings, { ...identity, name: "  " }),
    ).toThrow("business.name");
  });

  it("resolves only known deploy environments", () => {
    expect(resolveDeployEnvironment(undefined)).toBe("local");
    expect(resolveDeployEnvironment("preview")).toBe("preview");
    expect(() => resolveDeployEnvironment("staging")).toThrow(
      "SITE_DEPLOY_ENV",
    );
  });

  it("rejects demonstration domains in production", () => {
    expect(() =>
      validateProductionUrl("production", "https://example.com"),
    ).toThrow("definitive public domain");
    expect(() =>
      validateProductionUrl("preview", "https://example.com"),
    ).not.toThrow();
    expect(() =>
      validateProductionUrl("production", "https://business.example.org"),
    ).not.toThrow();
  });
});
