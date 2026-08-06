import type { Metadata } from "next";

import type {
  Address,
  OpeningHours,
  ServiceArea,
  SocialLink,
} from "@/domain/business";
import type { PageDefinition } from "@/domain/pages";
import type { SeoConfiguration } from "@/domain/seo";
import type { BusinessIdentity, DeployEnvironment } from "@/domain/site";

function withTrailingSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function resolveCanonical(baseUrl: string, path: string): string {
  return new URL(withTrailingSlash(path), baseUrl).toString();
}

interface MetadataInput {
  readonly baseUrl: string;
  readonly deployEnvironment: DeployEnvironment;
  readonly page: PageDefinition;
  readonly seo: SeoConfiguration;
}

export function resolveMetadata({
  baseUrl,
  deployEnvironment,
  page,
  seo,
}: MetadataInput): Metadata {
  const title = page.seo?.title ?? seo.defaultTitle;
  const description = page.seo?.description ?? seo.defaultDescription;
  const isIndexable =
    deployEnvironment === "production" && page.seo?.isIndexable !== false;
  const canonical = resolveCanonical(
    baseUrl,
    page.seo?.canonicalPath ?? page.route,
  );
  const image = page.seo?.image ?? seo.socialImage;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: title, template: seo.titleTemplate },
    description,
    alternates: { canonical },
    robots: { index: isIndexable, follow: isIndexable },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      locale: seo.locale,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

interface StructuredDataInput {
  readonly address?: Address;
  readonly baseUrl: string;
  readonly business: BusinessIdentity;
  readonly logoPath?: `/${string}`;
  readonly openingHours: readonly OpeningHours[];
  readonly serviceArea?: ServiceArea;
  readonly sameAs: readonly SocialLink[];
  readonly type: SeoConfiguration["structuredDataType"];
}

export function createStructuredData({
  address,
  baseUrl,
  business,
  logoPath,
  openingHours,
  serviceArea,
  sameAs,
  type,
}: StructuredDataInput) {
  const openingHoursSpecification = openingHours
    .filter((entry) => !entry.isClosed)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    }));
  const socialProfiles = sameAs.map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${baseUrl}#business`,
    name: business.name,
    description: business.shortDescription,
    url: baseUrl,
    telephone: business.phone,
    email: business.email,
    logo: logoPath ? new URL(logoPath, baseUrl).toString() : undefined,
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: `${address.street}, ${address.number}`,
          addressLocality: address.city,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        }
      : undefined,
    areaServed: serviceArea
      ? {
          "@type": "City",
          name: serviceArea.city,
          addressRegion: serviceArea.region,
          addressCountry: serviceArea.country,
        }
      : undefined,
    openingHoursSpecification:
      openingHoursSpecification.length > 0
        ? openingHoursSpecification
        : undefined,
    sameAs: socialProfiles.length > 0 ? socialProfiles : undefined,
  };
}

export function serializeJsonLd(value: object): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}
