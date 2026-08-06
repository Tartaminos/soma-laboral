import type { NavigationItem } from "@/domain/content";
import type { PageSection, SectionContentEntry } from "@/domain/sections";
import type { PresetId } from "@/domain/site";
import { brandMark } from "@/site/assets/brand";
import { heroVideo } from "@/site/assets/hero";
import {
  availabilityText,
  business,
  contactChannels,
  openingHours,
  serviceArea,
  socialLinks,
} from "@/site/business/business";
import { primaryContactAction } from "@/site/content/actions";
import {
  aboutParagraphs,
  highlights,
} from "@/site/content/editorial";
import { products } from "@/site/content/products";
import { professional } from "@/site/content/profile";
import { portfolioItems } from "@/site/content/portfolio";
import { services } from "@/site/content/services";

const primaryNavigation = [
  { id: "services-link", label: "Serviços", href: "#services" },
  {
    id: "highlights-link",
    label: "Como trabalhamos",
    href: "#how-we-work",
  },
  ...(portfolioItems.length > 0
    ? [
        {
          id: "portfolio-link",
          label: "Soma em ação",
          href: "#portfolio",
        },
      ]
    : []),
  { id: "contact-link", label: "Contato", href: "#contact" },
] as const satisfies readonly NavigationItem[];

const heroActions = primaryContactAction ? [primaryContactAction] : [];

export function createSomaHomeSections(): readonly PageSection[] {
  return [
    {
      id: "header",
      type: "site-header",
      variant: "standard",
      businessName: business.name,
      logo: brandMark,
      navigation: primaryNavigation,
    },
    {
      id: "home",
      type: "hero",
      variant: "split",
      eyebrow: "Cuidado com quem faz a empresa acontecer",
      title: "Bem-estar no trabalho começa com atenção às pessoas.",
      description:
        "A Soma Laboral leva Ginástica Laboral, Quick Massage e ações para SIPAT até a sua empresa, com atividades pensadas para a rotina e as necessidades de cada equipe.",
      actions: heroActions,
      media: { type: "video", asset: heroVideo },
    },
    {
      id: "services",
      type: "services",
      variant: "featured",
      isNavigable: true,
      title: "Cuidado que cabe na rotina da sua empresa",
      description:
        "As atividades são organizadas de acordo com o número de colaboradores, os setores, os horários e a frequência necessária.",
      items: services,
      featuredServiceId: "workplace-exercise",
    },
    {
      id: "how-we-work",
      type: "highlights",
      variant: "inline",
      isNavigable: true,
      title: "Um atendimento que olha para a equipe como um todo",
      items: highlights,
    },
    ...(portfolioItems.length > 0
      ? [
          {
            id: "portfolio",
            type: "portfolio" as const,
            variant: "mosaic" as const,
            isNavigable: true,
            title: "Soma em ação",
            description: "Um pouco do trabalho realizado junto às equipes.",
            items: portfolioItems,
          },
        ]
      : []),
    {
      id: "about",
      type: "about",
      variant: "text",
      title: "Sobre a Soma Laboral",
      paragraphs: aboutParagraphs,
    },
    {
      id: "contact",
      type: "contact",
      variant: "split",
      isNavigable: true,
      title: "Vamos entender a rotina da sua empresa",
      description:
        "Para preparar uma proposta mais adequada, conte quantos colaboradores e setores serão atendidos, os melhores horários e quantas vezes por semana você imagina realizar as atividades.",
      action: primaryContactAction,
      channels: contactChannels,
      socialLinks,
      openingHours,
      serviceArea,
      availabilityText,
    },
    {
      id: "footer",
      type: "site-footer",
      variant: "compact",
      businessName: business.name,
      description: "Ginástica Laboral, Quick Massage e SIPAT",
      navigation: primaryNavigation,
      channels: [],
      attribution: {
        label: "Desenvolvido por Contestech",
        href: "https://contestech.com.br/",
      },
    },
  ];
}

function buildSharedContent(navigation: readonly NavigationItem[]) {
  return {
    header: {
      id: "header",
      type: "site-header",
      businessName: business.name,
      logo: brandMark,
      navigation,
    },
    hero: {
      id: "home",
      type: "hero",
      eyebrow: "Cuidado com quem faz a empresa acontecer",
      title: "Bem-estar no trabalho começa com atenção às pessoas.",
      description: business.shortDescription,
      actions: heroActions,
    },
    highlights: {
      id: "highlights",
      type: "highlights",
      title: "Um atendimento que olha para a equipe como um todo",
      items: highlights,
    },
    about: {
      id: "about",
      type: "about",
      title: "Sobre a Soma Laboral",
      paragraphs: aboutParagraphs,
    },
    contact: {
      id: "contact",
      type: "contact",
      title: "Vamos entender a rotina da sua empresa",
      description:
        "Para preparar uma proposta mais adequada, conte quantos colaboradores e setores serão atendidos, os melhores horários e quantas vezes por semana você imagina realizar as atividades.",
      action: primaryContactAction,
      channels: contactChannels,
      socialLinks,
      openingHours,
      serviceArea,
      availabilityText,
    },
    footer: {
      id: "footer",
      type: "site-footer",
      businessName: business.name,
      description: "Ginástica Laboral, Quick Massage e SIPAT",
      navigation,
      channels: [],
    },
  } as const;
}

export function createHomeContent(
  presetId: PresetId,
): readonly SectionContentEntry[] {
  switch (presetId) {
    case "services": {
      const navigation = [
        { id: "services-link", label: "Serviços", href: "#services" },
        {
          id: "highlights-link",
          label: "Como trabalhamos",
          href: "#highlights",
        },
        {
          id: "portfolio-link",
          label: "Soma em ação",
          href: "#portfolio",
        },
        { id: "contact-link", label: "Contato", href: "#contact" },
      ] as const satisfies readonly NavigationItem[];
      const shared = buildSharedContent(navigation);
      return [
        shared.header,
        shared.hero,
        {
          id: "services",
          type: "services",
          title: "Cuidado que cabe na rotina da sua empresa",
          description:
            "As atividades são organizadas de acordo com o número de colaboradores, os setores, os horários e a frequência necessária.",
          items: services,
          featuredServiceId: "workplace-exercise",
        },
        ...(portfolioItems.length > 0
          ? [
              {
                id: "portfolio",
                type: "portfolio" as const,
                title: "Soma em ação",
                description: "Um pouco do trabalho realizado junto às equipes.",
                items: portfolioItems,
              },
            ]
          : []),
        shared.highlights,
        shared.about,
        shared.contact,
        shared.footer,
      ];
    }
    case "commerce": {
      const navigation = [
        { id: "products-link", label: "Produtos", href: "#products" },
        { id: "highlights-link", label: "Diferenciais", href: "#highlights" },
        { id: "about-link", label: "Sobre", href: "#about" },
        { id: "contact-link", label: "Contato", href: "#contact" },
      ] as const satisfies readonly NavigationItem[];
      const shared = buildSharedContent(navigation);
      return [
        shared.header,
        shared.hero,
        {
          id: "products",
          type: "product-showcase",
          title: "Uma seleção feita com atenção",
          description: "Conheça alguns destaques da nossa vitrine.",
          items: products,
          featuredProductId: "essential",
        },
        shared.highlights,
        shared.about,
        shared.contact,
        shared.footer,
      ];
    }
    case "professional": {
      const navigation = [
        { id: "profile-link", label: "Perfil", href: "#profile" },
        { id: "services-link", label: "Serviços", href: "#services" },
        { id: "highlights-link", label: "Diferenciais", href: "#highlights" },
        { id: "contact-link", label: "Contato", href: "#contact" },
      ] as const satisfies readonly NavigationItem[];
      const shared = buildSharedContent(navigation);
      return [
        shared.header,
        {
          ...shared.hero,
          media: professional.image
            ? { type: "image" as const, asset: professional.image }
            : undefined,
        },
        {
          id: "profile",
          type: "professional-profile",
          title: "Experiência e abordagem",
          professional,
        },
        {
          id: "services",
          type: "services",
          title: "Áreas de atuação",
          items: services,
        },
        shared.highlights,
        shared.contact,
        shared.footer,
      ];
    }
  }
}
