import type { ReactNode } from "react";

import type { PageSection } from "@/domain/sections";
import { AboutSection } from "@/sections/about/about";
import { CallToActionSection } from "@/sections/call-to-action/call-to-action";
import { ContactSection } from "@/sections/contact/contact";
import { HeroSection } from "@/sections/hero/hero";
import { HighlightsSection } from "@/sections/highlights/highlights";
import { PortfolioSection } from "@/sections/portfolio/portfolio";
import { ProductShowcaseSection } from "@/sections/product-showcase/product-showcase";
import { ProfessionalProfileSection } from "@/sections/professional-profile/professional-profile";
import { ServicesSection } from "@/sections/services/services";
import { SiteFooterSection } from "@/sections/site-footer/site-footer";
import { SiteHeaderSection } from "@/sections/site-header/site-header";
import { TestimonialsSection } from "@/sections/testimonials/testimonials";

export function renderSection(section: PageSection): ReactNode {
  switch (section.type) {
    case "site-header":
      return <SiteHeaderSection {...section} />;
    case "hero":
      return <HeroSection {...section} />;
    case "services":
      return <ServicesSection {...section} />;
    case "product-showcase":
      return <ProductShowcaseSection {...section} />;
    case "portfolio":
      return <PortfolioSection {...section} />;
    case "about":
      return <AboutSection {...section} />;
    case "highlights":
      return <HighlightsSection {...section} />;
    case "professional-profile":
      return <ProfessionalProfileSection {...section} />;
    case "testimonials":
      return <TestimonialsSection {...section} />;
    case "contact":
      return <ContactSection {...section} />;
    case "call-to-action":
      return <CallToActionSection {...section} />;
    case "site-footer":
      return <SiteFooterSection {...section} />;
  }
}
