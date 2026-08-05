import type { Action } from "@/domain/content";

export const primaryContactAction = {
  id: "contact",
  label: "Fale com a gente",
  href: "#contact",
  kind: "internal",
} as const satisfies Action;
