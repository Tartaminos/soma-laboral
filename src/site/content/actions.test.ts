import { describe, expect, it } from "vitest";

import {
  createWhatsAppAction,
  whatsappMessage,
} from "@/site/content/actions";

describe("WhatsApp action", () => {
  it("normalizes the phone and encodes the short availability message", () => {
    const action = createWhatsAppAction("+55 (11) 99999-9999");
    const url = new URL(action.href);

    expect(action.label).toBe("Contato por WhatsApp");
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5511999999999");
    expect(url.searchParams.get("text")).toBe(whatsappMessage);
    expect(whatsappMessage).toBe(
      "Olá! Gostaria de saber mais sobre os serviços da Soma Laboral. Há disponibilidade para atendimento?",
    );
  });

  it("rejects a phone without digits", () => {
    expect(() => createWhatsAppAction("invalid")).toThrow(
      "must contain digits",
    );
  });

  it("creates the official Soma Laboral destination", async () => {
    const { primaryContactAction } = await import("@/site/content/actions");
    const url = new URL(primaryContactAction.href);

    expect(url.origin + url.pathname).toBe("https://wa.me/5519997462703");
    expect(url.searchParams.get("text")).toBe(whatsappMessage);
  });
});
