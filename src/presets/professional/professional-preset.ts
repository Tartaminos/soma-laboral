import type { PresetDefinition } from "@/domain/pages";

export const professionalPreset = {
  id: "professional",
  home: [
    { id: "header", type: "site-header", variant: "standard" },
    { id: "home", type: "hero", variant: "centered" },
    {
      id: "profile",
      type: "professional-profile",
      variant: "credentials",
      isNavigable: true,
    },
    { id: "services", type: "services", variant: "grid", isNavigable: true },
    {
      id: "portfolio",
      type: "portfolio",
      variant: "featured",
      isNavigable: true,
      isOptional: true,
    },
    { id: "highlights", type: "highlights", variant: "inline", isNavigable: true },
    {
      id: "testimonials",
      type: "testimonials",
      variant: "grid",
      isNavigable: true,
      isOptional: true,
    },
    { id: "contact", type: "contact", variant: "compact", isNavigable: true },
    {
      id: "cta",
      type: "call-to-action",
      variant: "panel",
      isOptional: true,
    },
    { id: "footer", type: "site-footer", variant: "standard" },
  ],
} as const satisfies PresetDefinition;
