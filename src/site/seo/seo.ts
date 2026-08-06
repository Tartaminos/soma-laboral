import type { SeoConfiguration } from "@/domain/seo";

export const seo = {
  defaultTitle: "Soma Laboral",
  titleTemplate: "%s | Soma Laboral",
  defaultDescription:
    "Ginástica Laboral, Quick Massage e ações para SIPAT organizadas para a rotina e as necessidades de cada equipe.",
  locale: "pt_BR",
  structuredDataType: "ProfessionalService",
} as const satisfies SeoConfiguration;
