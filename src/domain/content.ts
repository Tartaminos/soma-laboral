import type {
  ImageAsset,
  InformativeImageAsset,
} from "@/domain/assets";

export interface Action {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: "internal" | "external" | "phone" | "email";
}

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface Service {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly description?: string;
  readonly image?: ImageAsset;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly category?: string;
  readonly commercialInfo?: string;
  readonly image?: ImageAsset;
}

export interface PortfolioItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly category?: string;
  readonly image: InformativeImageAsset;
}

export interface Credential {
  readonly id: string;
  readonly title: string;
  readonly detail?: string;
}

export interface Professional {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly biography: string;
  readonly credentials: readonly Credential[];
  readonly image?: ImageAsset;
}

export interface Highlight {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Testimonial {
  readonly id: string;
  readonly author: string;
  readonly quote: string;
  readonly context?: string;
}
