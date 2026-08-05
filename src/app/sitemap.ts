import type { MetadataRoute } from "next";

import { resolveCanonical } from "@/composition/seo";
import type { PageSource } from "@/domain/pages";
import { site } from "@/site";
import { homePageSource } from "@/site/pages/home";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const page: PageSource = homePageSource;
  if (
    site.deployEnvironment !== "production" ||
    page.seo?.isIndexable === false
  ) {
    return [];
  }

  return [
    {
      url: resolveCanonical(site.settings.baseUrl, page.route),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
