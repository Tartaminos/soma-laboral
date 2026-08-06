import type { SeoConfiguration } from "@/domain/seo";

export const seo = {
  defaultTitle: "Soma Laboral | Ginástica Laboral em Americana",
  titleTemplate: "%s | Soma Laboral",
  defaultDescription:
    "Ginástica Laboral, Quick Massage e ações para SIPAT em Americana/SP, com atividades organizadas para a rotina e as necessidades de cada equipe.",
  locale: "pt_BR",
  socialImage: "/images/social/soma-laboral-og.webp",
  structuredDataType: "ProfessionalService",
} as const satisfies SeoConfiguration;
