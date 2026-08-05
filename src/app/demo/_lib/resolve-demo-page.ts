import type { Metadata } from "next";

import { resolvePage } from "@/composition/resolve-page";
import { resolveMetadata } from "@/composition/seo";
import type { PageDefinition, PageSource } from "@/domain/pages";
import type { PresetId } from "@/domain/site";
import { resolvePreset } from "@/presets/resolve-preset";
import { site } from "@/site";
import { createHomeContent } from "@/site/pages/home-content";

const presetLabels = {
  services: "Serviços",
  commerce: "Comércio",
  professional: "Profissional",
} as const satisfies Readonly<Record<PresetId, string>>;

export function resolveDemoPage(presetId: PresetId): PageDefinition {
  const source = {
    id: `demo-${presetId}`,
    route: `/demo/${presetId}/`,
    title: `Demonstração: ${presetLabels[presetId]}`,
    content: createHomeContent(presetId),
    seo: {
      title: `Demonstração do preset ${presetLabels[presetId]}`,
      isIndexable: false,
    },
  } as const satisfies PageSource;

  return resolvePage(source, resolvePreset(presetId));
}

export function resolveDemoMetadata(presetId: PresetId): Metadata {
  return resolveMetadata({
    baseUrl: site.settings.baseUrl,
    deployEnvironment: site.deployEnvironment,
    page: resolveDemoPage(presetId),
    seo: site.seo,
  });
}
