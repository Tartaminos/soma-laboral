import { describe, expect, it } from "vitest";

import {
  createWhatsAppAction,
  whatsappMessage,
} from "@/site/content/actions";

describe("WhatsApp action", () => {
  it("normalizes the phone and encodes the approved qualification message", () => {
    const action = createWhatsAppAction("+55 (11) 99999-9999");
    const url = new URL(action.href);

    expect(action.label).toBe("Contato por WhatsApp");
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5511999999999");
    expect(url.searchParams.get("text")).toBe(whatsappMessage);
  });

  it("rejects a phone without digits", () => {
    expect(() => createWhatsAppAction("invalid")).toThrow(
      "must contain digits",
    );
  });
});
