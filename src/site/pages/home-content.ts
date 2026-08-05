import type { NavigationItem } from "@/domain/content";
import type { SectionContentEntry } from "@/domain/sections";
import type { PresetId } from "@/domain/site";
import { brandLogo } from "@/site/assets/brand";
import {
  address,
  business,
  contactChannels,
  openingHours,
} from "@/site/business/business";
import { primaryContactAction } from "@/site/content/actions";
import {
  aboutParagraphs,
  highlights,
  testimonials,
} from "@/site/content/editorial";
import { products } from "@/site/content/products";
import { professional } from "@/site/content/profile";
import { portfolioItems } from "@/site/content/portfolio";
import { services } from "@/site/content/services";

const baseNavigation = [
  { id: "highlights-link", label: "Diferenciais", href: "#highlights" },
  { id: "contact-link", label: "Contato", href: "#contact" },
] as const satisfies readonly NavigationItem[];

function buildSharedContent(navigation: readonly NavigationItem[]) {
  return {
    header: {
      id: "header",
      type: "site-header",
      businessName: business.name,
      logo: brandLogo,
      navigation,
      action: primaryContactAction,
    },
    hero: {
      id: "home",
      type: "hero",
      eyebrow: "Atendimento próximo e responsável",
      title: "Clareza para escolher. Cuidado para realizar.",
      description: business.shortDescription,
      actions: [primaryContactAction],
    },
    highlights: {
      id: "highlights",
      type: "highlights",
      title: "O que orienta nosso trabalho",
      items: highlights,
    },
    about: {
      id: "about",
      type: "about",
      title: "Sobre o Estúdio",
      paragraphs: aboutParagraphs,
    },
    testimonials: {
      id: "testimonials",
      type: "testimonials",
      title: "Experiências de quem já trabalhou conosco",
      items: testimonials,
      featuredTestimonialId: "marina",
    },
    contact: {
      id: "contact",
      type: "contact",
      title: "Vamos conversar",
      description: "Escolha o canal mais conveniente para você.",
      channels: contactChannels,
      address,
      openingHours,
    },
    cta: {
      id: "cta",
      type: "call-to-action",
      title: "Pronto para dar o próximo passo?",
      description: "Conte brevemente o que você precisa.",
      action: primaryContactAction,
    },
    footer: {
      id: "footer",
      type: "site-footer",
      businessName: business.name,
      description: business.shortDescription,
      navigation,
      channels: contactChannels,
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
        { id: "portfolio-link", label: "Portfólio", href: "#portfolio" },
        { id: "about-link", label: "Sobre", href: "#about" },
        ...baseNavigation,
      ] as const satisfies readonly NavigationItem[];
      const shared = buildSharedContent(navigation);
      return [
        shared.header,
        shared.hero,
        {
          id: "services",
          type: "services",
          title: "Como podemos ajudar",
          description: "Serviços pensados para diferentes momentos do seu negócio.",
          items: services,
          featuredServiceId: "planning",
        },
        {
          id: "portfolio",
          type: "portfolio",
          title: "Trabalhos selecionados",
          description:
            "Uma amostra fictícia de projetos para demonstrar diferentes formatos de imagem.",
          items: portfolioItems,
          action: primaryContactAction,
        },
        shared.highlights,
        shared.about,
        shared.testimonials,
        shared.contact,
        shared.cta,
        shared.footer,
      ];
    }
    case "commerce": {
      const navigation = [
        { id: "products-link", label: "Produtos", href: "#products" },
        { id: "about-link", label: "Sobre", href: "#about" },
        ...baseNavigation,
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
        shared.cta,
        shared.footer,
      ];
    }
    case "professional": {
      const navigation = [
        { id: "profile-link", label: "Perfil", href: "#profile" },
        { id: "services-link", label: "Serviços", href: "#services" },
        { id: "portfolio-link", label: "Portfólio", href: "#portfolio" },
        ...baseNavigation,
      ] as const satisfies readonly NavigationItem[];
      const shared = buildSharedContent(navigation);
      return [
        shared.header,
        { ...shared.hero, image: professional.image },
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
        {
          id: "portfolio",
          type: "portfolio",
          title: "Projetos em destaque",
          description:
            "Trabalhos fictícios apresentados para demonstrar a composição profissional.",
          items: portfolioItems,
          featuredPortfolioItemId: "custom-shelving",
          action: primaryContactAction,
        },
        shared.highlights,
        shared.testimonials,
        shared.contact,
        shared.cta,
        shared.footer,
      ];
    }
  }
}
