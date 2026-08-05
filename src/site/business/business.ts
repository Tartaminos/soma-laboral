import type {
  Address,
  ContactChannel,
  OpeningHours,
  SocialLink,
} from "@/domain/business";
import type { BusinessIdentity } from "@/domain/site";

export const business = {
  id: "estudio-horizonte",
  name: "Estúdio Horizonte",
  shortDescription:
    "Soluções claras e cuidadosas para negócios que valorizam relações duradouras.",
  email: "contato@example.com",
  phone: "+55 11 4000-1234",
} as const satisfies BusinessIdentity;

export const address = {
  street: "Rua das Palmeiras",
  number: "100",
  district: "Centro",
  city: "São Paulo",
  region: "SP",
  postalCode: "01000-000",
  country: "BR",
} as const satisfies Address;

export const contactChannels = [
  {
    type: "phone",
    label: "Telefone",
    value: business.phone,
    href: "tel:+551140001234",
  },
  {
    type: "email",
    label: "E-mail",
    value: business.email,
    href: `mailto:${business.email}`,
  },
] as const satisfies readonly ContactChannel[];

export const openingHours = [
  {
    id: "weekdays",
    days: ["Segunda a sexta"],
    isClosed: false,
    opens: "09:00",
    closes: "18:00",
  },
  {
    id: "weekend",
    days: ["Sábado e domingo"],
    isClosed: true,
  },
] as const satisfies readonly OpeningHours[];

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
] as const satisfies readonly SocialLink[];
