import type {
  PageSection,
  PresetSectionBlueprint,
  SectionContentEntry,
} from "@/domain/sections";
import type { NavigationItem } from "@/domain/content";

export interface PageSeo {
  readonly title?: string;
  readonly description?: string;
  readonly canonicalPath?: string;
  readonly image?: `/${string}`;
  readonly isIndexable?: boolean;
}

export interface PageDefinition {
  readonly id: string;
  readonly route: `/${string}` | "/";
  readonly title: string;
  readonly sections: readonly PageSection[];
  readonly navigation: readonly NavigationItem[];
  readonly seo?: PageSeo;
}

export interface PresetDefinition {
  readonly id: "services" | "commerce" | "professional";
  readonly home: readonly PresetSectionBlueprint[];
}

export interface PageSource {
  readonly id: string;
  readonly route: `/${string}` | "/";
  readonly title: string;
  readonly content: readonly SectionContentEntry[];
  readonly explicitSections?: readonly PageSection[];
  readonly seo?: PageSeo;
}
