import type { ThemeDefinition } from "@/domain/theme";

export const defaultTheme = {
  id: "default",
  colors: {
    background: "#fbfaf7",
    backgroundAlt: "#eef4f0",
    surface: "#ffffff",
    text: "#17221d",
    textMuted: "#52635a",
    border: "#bac9c0",
    action: "#075b45",
    actionHover: "#034536",
    onAction: "#ffffff",
    focus: "#b34700",
    success: "#176b43",
    error: "#a12121",
  },
  typography: {
    body: "var(--font-body), system-ui, sans-serif",
    display: "var(--font-display), Georgia, serif",
    normalWeight: "400",
    strongWeight: "700",
  },
  shape: {
    radiusSmall: "0.5rem",
    radiusLarge: "1.5rem",
    shadow: "0 1rem 3rem rgb(23 34 29 / 0.1)",
    contentWidth: "72rem",
  },
} as const satisfies ThemeDefinition;
