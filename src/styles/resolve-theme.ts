import type { ThemeDefinition } from "@/domain/theme";

export function resolveThemeCss(theme: ThemeDefinition): string {
  return [
    `--color-background:${theme.colors.background}`,
    `--color-background-alt:${theme.colors.backgroundAlt}`,
    `--color-surface:${theme.colors.surface}`,
    `--color-text:${theme.colors.text}`,
    `--color-text-muted:${theme.colors.textMuted}`,
    `--color-border:${theme.colors.border}`,
    `--color-action:${theme.colors.action}`,
    `--color-action-hover:${theme.colors.actionHover}`,
    `--color-on-action:${theme.colors.onAction}`,
    `--color-focus:${theme.colors.focus}`,
    `--color-success:${theme.colors.success}`,
    `--color-error:${theme.colors.error}`,
    `--font-body:${theme.typography.body}`,
    `--font-display:${theme.typography.display}`,
    `--font-normal:${theme.typography.normalWeight}`,
    `--font-strong:${theme.typography.strongWeight}`,
    `--radius-small:${theme.shape.radiusSmall}`,
    `--radius-large:${theme.shape.radiusLarge}`,
    `--shadow:${theme.shape.shadow}`,
    `--content-width:${theme.shape.contentWidth}`,
  ].join(";");
}
