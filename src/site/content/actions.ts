import type { Action } from "@/domain/content";
import { whatsappPhone } from "@/site/business/business";

export const whatsappMessage = `Olá! Gostaria de conversar sobre os serviços da Soma Laboral.

Empresa:
Cidade:
Número aproximado de colaboradores:
Setores a serem atendidos:
Horários disponíveis:
Frequência desejada:
Serviço de interesse:`;

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

export const primaryContactAction = whatsappPhone
  ? createWhatsAppAction(whatsappPhone)
  : undefined;
