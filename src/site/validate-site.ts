import type {
  BusinessIdentity,
  DeployEnvironment,
  PresetId,
  SiteSettings,
} from "@/domain/site";

const PRESET_IDS: readonly PresetId[] = [
  "services",
  "commerce",
  "professional",
];

function requireText(field: string, value: string): void {
  if (!value.trim()) {
    throw new Error(`${field} must not be empty.`);
  }
}

export function validateSiteConfiguration(
  settings: SiteSettings,
  identity: BusinessIdentity,
): void {
  requireText("site.name", settings.name);
  requireText("site.language", settings.language);
  requireText("site.locale", settings.locale);
  requireText("site.themeId", settings.themeId);
  requireText("business.id", identity.id);
  requireText("business.name", identity.name);
  requireText("business.shortDescription", identity.shortDescription);
  if (identity.email !== undefined) {
    requireText("business.email", identity.email);
  }
  if (identity.phone !== undefined) {
    requireText("business.phone", identity.phone);
  }

  if (!PRESET_IDS.includes(settings.presetId)) {
    throw new Error(`site.presetId "${settings.presetId}" is not supported.`);
  }
  if (settings.themeId !== "default") {
    throw new Error(`site.themeId "${settings.themeId}" is not supported.`);
  }
  if (!settings.locale.startsWith(settings.language.split("-")[0])) {
    throw new Error(
      `site.locale "${settings.locale}" is incompatible with language "${settings.language}".`,
    );
  }

  const baseUrl = new URL(settings.baseUrl);
  if (!["http:", "https:"].includes(baseUrl.protocol) || baseUrl.pathname !== "/") {
    throw new Error("site.baseUrl must be an absolute HTTP(S) origin without a path.");
  }
}

export function resolveDeployEnvironment(
  value: string | undefined = process.env.SITE_DEPLOY_ENV,
): DeployEnvironment {
  const environment = value ?? "local";
  switch (environment) {
    case "local":
    case "preview":
    case "production":
      return environment;
    default:
      throw new Error(
        "SITE_DEPLOY_ENV must be one of: local, preview, production.",
      );
  }
}

export function validateProductionUrl(
  environment: DeployEnvironment,
  baseUrl: string,
): void {
  if (environment !== "production") {
    return;
  }
  const hostname = new URL(baseUrl).hostname;
  if (
    hostname === "example.com" ||
    hostname === "localhost" ||
    hostname.endsWith(".test")
  ) {
    throw new Error(
      "site.baseUrl must use the definitive public domain for production.",
    );
  }
}
