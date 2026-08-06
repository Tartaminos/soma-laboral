import type { SiteSettings } from "@/domain/site";

export const siteSettings = {
  name: "Soma Laboral",
  language: "pt-BR",
  locale: "pt_BR",
  baseUrl: "https://somalaboral.com.br",
  presetId: "services",
  themeId: "default",
} as const satisfies SiteSettings;
