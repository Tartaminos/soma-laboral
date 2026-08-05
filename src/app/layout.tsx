import type { Metadata } from "next";

import { resolvePage } from "@/composition/resolve-page";
import { resolveMetadata } from "@/composition/seo";
import { resolvePreset } from "@/presets/resolve-preset";
import { site } from "@/site";
import { homePageSource } from "@/site/pages/home";
import { resolveThemeCss } from "@/styles/resolve-theme";

import "./globals.css";

const homePage = resolvePage(
  homePageSource,
  resolvePreset(site.settings.presetId),
);

export const metadata: Metadata = resolveMetadata({
  baseUrl: site.settings.baseUrl,
  deployEnvironment: site.deployEnvironment,
  page: homePage,
  seo: site.seo,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.settings.language}>
      <head>
        <style>{`:root{${resolveThemeCss(site.theme)}}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
