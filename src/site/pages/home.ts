import type { PageSource } from "@/domain/pages";
import { siteSettings } from "@/site/config/site-settings";
import { createHomeContent } from "@/site/pages/home-content";

export const homePageSource = {
  id: "home",
  route: "/",
  title: "Início",
  content: createHomeContent(siteSettings.presetId),
  seo: {
    isIndexable: true,
  },
} as const satisfies PageSource;
