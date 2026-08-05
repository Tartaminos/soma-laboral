import type { MetadataRoute } from "next";

import { site } from "@/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isProduction = site.deployEnvironment === "production";
  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/",
    },
    sitemap: new URL("/sitemap.xml", site.settings.baseUrl).toString(),
  };
}
