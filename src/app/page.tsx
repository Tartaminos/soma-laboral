import { PresetDemoSwitcher } from "@/app/demo/_components/preset-demo-switcher";
import { PageComposer } from "@/composition/page-composer";
import { resolvePage } from "@/composition/resolve-page";
import {
  createStructuredData,
  serializeJsonLd,
} from "@/composition/seo";
import { resolvePreset } from "@/presets/resolve-preset";
import { site } from "@/site";
import { brandLogo } from "@/site/assets/brand";
import {
  address,
  openingHours,
  socialLinks,
} from "@/site/business/business";
import { homePageSource } from "@/site/pages/home";

export default function Home() {
  const page = resolvePage(
    homePageSource,
    resolvePreset(site.settings.presetId),
  );
  const structuredData = createStructuredData({
    address,
    baseUrl: site.settings.baseUrl,
    business: site.business,
    logoPath: brandLogo.src,
    openingHours,
    sameAs: socialLinks,
    type: site.seo.structuredDataType,
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        type="application/ld+json"
      />
      <PageComposer page={page} />
      {process.env.NODE_ENV === "development" ? (
        <PresetDemoSwitcher currentPresetId={site.settings.presetId} />
      ) : null}
    </>
  );
}
