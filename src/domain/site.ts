export type PresetId = "services" | "commerce" | "professional";

export type ThemeId = "default";

export type DeployEnvironment = "local" | "preview" | "production";

export interface SiteSettings {
  readonly name: string;
  readonly language: string;
  readonly locale: string;
  readonly baseUrl: string;
  readonly presetId: PresetId;
  readonly themeId: ThemeId;
}

export interface BusinessIdentity {
  readonly id: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly email: string;
  readonly phone: string;
}
