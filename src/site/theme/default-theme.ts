import type { ThemeDefinition } from "@/domain/theme";

export const defaultTheme = {
  id: "default",
  colors: {
    background: "#f4f5ef",
    backgroundAlt: "#ebeae5",
    surface: "#ffffff",
    text: "#251540",
    textMuted: "#665d70",
    border: "#d2cdd3",
    action: "#251540",
    actionHover: "#3a245d",
    onAction: "#ffffff",
    focus: "#9e2c36",
    success: "#456b56",
    error: "#9e2c36",
  },
  typography: {
    body: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    display: "Georgia, \"Times New Roman\", serif",
    normalWeight: "400",
    strongWeight: "700",
  },
  shape: {
    radiusSmall: "0.4rem",
    radiusLarge: "1rem",
    shadow: "0 1rem 2.5rem rgb(37 21 64 / 0.08)",
    contentWidth: "76rem",
  },
} as const satisfies ThemeDefinition;
