import { business, openingHours } from "@/site/business/business";
import { siteSettings } from "@/site/config/site-settings";
import { highlights } from "@/site/content/editorial";
import { products } from "@/site/content/products";
import { professional } from "@/site/content/profile";
import { portfolioItems } from "@/site/content/portfolio";
import { services } from "@/site/content/services";
import {
  validateHighlights,
  validateOpeningHours,
  validatePortfolio,
  validateProducts,
  validateProfessional,
  validateServices,
} from "@/site/content/validate-content";
import { seo } from "@/site/seo/seo";
import { validateSeoConfiguration } from "@/site/seo/validate-seo";
import { defaultTheme } from "@/site/theme/default-theme";
import {
  resolveDeployEnvironment,
  validateProductionUrl,
  validateSiteConfiguration,
} from "@/site/validate-site";

validateSiteConfiguration(siteSettings, business);
validateServices(services);
validateProducts(products);
if (portfolioItems.length > 0) {
  validatePortfolio(portfolioItems);
}
validateHighlights(highlights);
validateProfessional(professional);
validateOpeningHours(openingHours);
validateSeoConfiguration(seo);

const deployEnvironment = resolveDeployEnvironment();
validateProductionUrl(deployEnvironment, siteSettings.baseUrl);

export const site = {
  settings: siteSettings,
  business,
  seo,
  theme: defaultTheme,
  deployEnvironment,
} as const;
