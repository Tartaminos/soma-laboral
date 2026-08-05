import type { PresetDefinition } from "@/domain/pages";
import type { PresetId } from "@/domain/site";
import { commercePreset } from "@/presets/commerce/commerce-preset";
import { professionalPreset } from "@/presets/professional/professional-preset";
import { servicesPreset } from "@/presets/services/services-preset";

export function resolvePreset(presetId: PresetId): PresetDefinition {
  switch (presetId) {
    case "services":
      return servicesPreset;
    case "commerce":
      return commercePreset;
    case "professional":
      return professionalPreset;
  }
}
