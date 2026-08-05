import type { Address, ContactChannel, OpeningHours } from "@/domain/business";
import type {
  Action,
  Highlight,
  NavigationItem,
  PortfolioItem,
  Product,
  Professional,
  Service,
  Testimonial,
} from "@/domain/content";
import type { ImageAsset } from "@/domain/assets";

interface SectionBase {
  readonly id: string;
  readonly isNavigable?: boolean;
}

export interface SiteHeaderSection extends SectionBase {
  readonly type: "site-header";
  readonly variant: "standard" | "compact";
  readonly businessName: string;
  readonly logo?: ImageAsset;
  readonly navigation: readonly NavigationItem[];
  readonly action?: Action;
}

export interface HeroSection extends SectionBase {
  readonly type: "hero";
  readonly variant: "centered" | "split";
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly Action[];
  readonly image?: ImageAsset;
}

export interface ServicesSection extends SectionBase {
  readonly type: "services";
  readonly variant: "grid" | "featured";
  readonly title: string;
  readonly description?: string;
  readonly items: readonly Service[];
  readonly featuredServiceId?: string;
}

export interface ProductShowcaseSection extends SectionBase {
  readonly type: "product-showcase";
  readonly variant: "grid" | "spotlight";
  readonly title: string;
  readonly description?: string;
  readonly items: readonly Product[];
  readonly featuredProductId?: string;
}

export interface PortfolioSection extends SectionBase {
  readonly type: "portfolio";
  readonly variant: "grid" | "featured";
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PortfolioItem[];
  readonly featuredPortfolioItemId?: string;
  readonly action?: Action;
}

export interface AboutSection extends SectionBase {
  readonly type: "about";
  readonly variant: "text" | "media";
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image?: ImageAsset;
}

export interface HighlightsSection extends SectionBase {
  readonly type: "highlights";
  readonly variant: "cards" | "inline";
  readonly title: string;
  readonly items: readonly Highlight[];
}

export interface ProfessionalProfileSection extends SectionBase {
  readonly type: "professional-profile";
  readonly variant: "portrait" | "credentials";
  readonly title: string;
  readonly professional: Professional;
}

export interface TestimonialsSection extends SectionBase {
  readonly type: "testimonials";
  readonly variant: "grid" | "featured";
  readonly title: string;
  readonly items: readonly Testimonial[];
  readonly featuredTestimonialId?: string;
}

export interface ContactSection extends SectionBase {
  readonly type: "contact";
  readonly variant: "split" | "compact";
  readonly title: string;
  readonly description?: string;
  readonly channels: readonly ContactChannel[];
  readonly address?: Address;
  readonly openingHours: readonly OpeningHours[];
}

export interface CallToActionSection extends SectionBase {
  readonly type: "call-to-action";
  readonly variant: "banner" | "panel";
  readonly title: string;
  readonly description?: string;
  readonly action: Action;
}

export interface SiteFooterSection extends SectionBase {
  readonly type: "site-footer";
  readonly variant: "standard" | "compact";
  readonly businessName: string;
  readonly description?: string;
  readonly navigation: readonly NavigationItem[];
  readonly channels: readonly ContactChannel[];
}

export type PageSection =
  | SiteHeaderSection
  | HeroSection
  | ServicesSection
  | ProductShowcaseSection
  | PortfolioSection
  | AboutSection
  | HighlightsSection
  | ProfessionalProfileSection
  | TestimonialsSection
  | ContactSection
  | CallToActionSection
  | SiteFooterSection;

export type SectionType = PageSection["type"];
export type SectionVariant<T extends SectionType> = Extract<
  PageSection,
  { readonly type: T }
>["variant"];

export type SectionContentEntry = {
  readonly [T in SectionType]: Omit<
    Extract<PageSection, { readonly type: T }>,
    "id" | "type" | "variant" | "isNavigable"
  > & {
    readonly id: string;
    readonly type: T;
  };
}[SectionType];

export type PresetSectionBlueprint = {
  readonly [T in SectionType]: {
    readonly id: string;
    readonly type: T;
    readonly variant: SectionVariant<T>;
    readonly isNavigable?: boolean;
    readonly isOptional?: boolean;
  };
}[SectionType];
