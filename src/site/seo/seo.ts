import type { SeoConfiguration } from "@/domain/seo";

export const seo = {
  defaultTitle: "Soma Laboral | Ginástica Laboral para Empresas",
  titleTemplate: "%s | Soma Laboral",
  defaultDescription:
    "Ginástica Laboral, Quick Massage e ações para SIPAT em empresas de todo o Brasil, com atividades organizadas para cada equipe.",
  locale: "pt_BR",
  socialImage: "/images/social/soma-laboral-og.webp",
  structuredDataType: "ProfessionalService",
} as const satisfies SeoConfiguration;
