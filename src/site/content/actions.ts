import type { Action } from "@/domain/content";
import { whatsappPhone } from "@/site/business/business";

export const whatsappMessage =
  "Olá! Gostaria de saber mais sobre os serviços da Soma Laboral. Há disponibilidade para atendimento?";

export function createWhatsAppAction(phone: string): Action {
  const digits = phone.replace(/\D/g, "");

  if (!digits) {
    throw new Error("WhatsApp phone must contain digits.");
  }

  return {
    id: "whatsapp-contact",
    label: "Contato por WhatsApp",
    href: `https://wa.me/${digits}?text=${encodeURIComponent(whatsappMessage)}`,
    kind: "external",
  };
}

export const primaryContactAction = createWhatsAppAction(whatsappPhone);
