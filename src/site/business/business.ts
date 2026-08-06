import type {
  ContactChannel,
  OpeningHours,
  ServiceArea,
  SocialLink,
} from "@/domain/business";
import type { BusinessIdentity } from "@/domain/site";

export const whatsappPhone = "+55 19 99746-2703";

export const business = {
  id: "soma-laboral",
  name: "Soma Laboral",
  shortDescription:
    "Ginástica Laboral, Quick Massage e ações para SIPAT pensadas para a rotina de cada equipe.",
  phone: whatsappPhone,
} as const satisfies BusinessIdentity;

export const contactChannels = [] as const satisfies readonly ContactChannel[];
export const openingHours = [] as const satisfies readonly OpeningHours[];
export const socialLinks = [
  {
    id: "instagram",
    href: "https://www.instagram.com/somaginasticalaboral/",
    label: "Abrir Instagram da Soma Laboral",
  },
] as const satisfies readonly SocialLink[];

export const serviceArea = {
  city: "Americana",
  region: "SP",
  country: "BR",
  label: "Americana/SP",
} as const satisfies ServiceArea;

export const availabilityText = "Segunda a sexta, em horário comercial.";
