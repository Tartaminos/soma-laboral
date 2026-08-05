import type { PresetDefinition } from "@/domain/pages";

export const servicesPreset = {
  id: "services",
  home: [
    { id: "header", type: "site-header", variant: "standard" },
    { id: "home", type: "hero", variant: "split" },
    { id: "services", type: "services", variant: "grid", isNavigable: true },
    {
      id: "portfolio",
      type: "portfolio",
      variant: "grid",
      isNavigable: true,
      isOptional: true,
    },
    { id: "highlights", type: "highlights", variant: "cards", isNavigable: true },
    { id: "about", type: "about", variant: "text", isNavigable: true },
    {
      id: "testimonials",
      type: "testimonials",
      variant: "grid",
      isNavigable: true,
      isOptional: true,
    },
    { id: "contact", type: "contact", variant: "split", isNavigable: true },
    {
      id: "cta",
      type: "call-to-action",
      variant: "banner",
      isOptional: true,
    },
    { id: "footer", type: "site-footer", variant: "standard" },
  ],
} as const satisfies PresetDefinition;
