import type { SiteSettings } from "@/domain/site";

export const siteSettings = {
  name: "Soma Laboral",
  language: "pt-BR",
  locale: "pt_BR",
  // A URL de demonstração mantém previews bloqueados para indexação até o domínio ser confirmado.
  baseUrl: "https://example.com",
  presetId: "services",
  themeId: "default",
} as const satisfies SiteSettings;
