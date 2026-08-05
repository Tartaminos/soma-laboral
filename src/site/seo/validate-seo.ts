import type { SeoConfiguration } from "@/domain/seo";

export function validateSeoConfiguration(seo: SeoConfiguration): void {
  for (const [field, value] of [
    ["defaultTitle", seo.defaultTitle],
    ["titleTemplate", seo.titleTemplate],
    ["defaultDescription", seo.defaultDescription],
    ["locale", seo.locale],
  ] as const) {
    if (!value.trim()) {
      throw new Error(`seo.${field} must not be empty.`);
    }
  }
  if (!seo.titleTemplate.includes("%s")) {
    throw new Error('seo.titleTemplate must include the "%s" placeholder.');
  }
}
