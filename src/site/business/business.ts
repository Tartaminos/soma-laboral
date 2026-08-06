import type { ContactChannel, OpeningHours, SocialLink } from "@/domain/business";
import type { BusinessIdentity } from "@/domain/site";

// O número será publicado aqui somente depois da confirmação do WhatsApp oficial.
export const whatsappPhone: string | undefined = undefined;

export const business = {
  id: "soma-laboral",
  name: "Soma Laboral",
  shortDescription:
    "Ginástica Laboral, Quick Massage e ações para SIPAT pensadas para a rotina de cada equipe.",
  phone: whatsappPhone,
} as const satisfies BusinessIdentity;

// Contato, região e horários permanecem ausentes até a confirmação dos dados oficiais.
export const contactChannels = [] as const satisfies readonly ContactChannel[];
export const openingHours = [] as const satisfies readonly OpeningHours[];
export const socialLinks = [] as const satisfies readonly SocialLink[];
