import type { SeoConfiguration } from "@/domain/seo";

export const seo = {
  defaultTitle: "Estúdio Horizonte",
  titleTemplate: "%s | Estúdio Horizonte",
  defaultDescription:
    "Soluções claras e cuidadosas para negócios que valorizam relações duradouras.",
  locale: "pt_BR",
  structuredDataType: "ProfessionalService",
} as const satisfies SeoConfiguration;
