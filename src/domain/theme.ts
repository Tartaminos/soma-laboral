export interface ThemeDefinition {
  readonly id: "default";
  readonly colors: {
    readonly background: string;
    readonly backgroundAlt: string;
    readonly surface: string;
    readonly text: string;
    readonly textMuted: string;
    readonly border: string;
    readonly action: string;
    readonly actionHover: string;
    readonly onAction: string;
    readonly focus: string;
    readonly success: string;
    readonly error: string;
  };
  readonly typography: {
    readonly body: string;
    readonly display: string;
    readonly normalWeight: string;
    readonly strongWeight: string;
  };
  readonly shape: {
    readonly radiusSmall: string;
    readonly radiusLarge: string;
    readonly shadow: string;
    readonly contentWidth: string;
  };
}
