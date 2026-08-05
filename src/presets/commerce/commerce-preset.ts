import type { PresetDefinition } from "@/domain/pages";

export const commercePreset = {
  id: "commerce",
  home: [
    { id: "header", type: "site-header", variant: "standard" },
    { id: "home", type: "hero", variant: "split" },
    {
      id: "products",
      type: "product-showcase",
      variant: "grid",
      isNavigable: true,
    },
    { id: "highlights", type: "highlights", variant: "inline", isNavigable: true },
    { id: "about", type: "about", variant: "text", isNavigable: true },
    { id: "contact", type: "contact", variant: "split", isNavigable: true },
    {
      id: "cta",
      type: "call-to-action",
      variant: "panel",
      isOptional: true,
    },
    { id: "footer", type: "site-footer", variant: "standard" },
  ],
} as const satisfies PresetDefinition;
