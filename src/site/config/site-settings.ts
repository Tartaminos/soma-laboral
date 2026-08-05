import type { SiteSettings } from "@/domain/site";

export const siteSettings = {
  name: "Estúdio Horizonte",
  language: "pt-BR",
  locale: "pt_BR",
  baseUrl: "https://example.com",
  presetId: "services",
  themeId: "default",
} as const satisfies SiteSettings;
