import type { PageSource } from "@/domain/pages";
import { createSomaHomeSections } from "@/site/pages/home-content";

export const homePageSource = {
  id: "home",
  route: "/",
  title: "Início",
  content: [],
  explicitSections: createSomaHomeSections(),
  seo: {
    isIndexable: true,
  },
} as const satisfies PageSource;
