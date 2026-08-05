import type { PageDefinition, PageSource, PresetDefinition } from "@/domain/pages";
import type {
  PageSection,
  PresetSectionBlueprint,
  SectionContentEntry,
} from "@/domain/sections";
import type { NavigationItem } from "@/domain/content";

function assertSameType(
  blueprint: PresetSectionBlueprint,
  content: SectionContentEntry,
): void {
  if (blueprint.type !== content.type) {
    throw new Error(
      `Section "${blueprint.id}" expected type "${blueprint.type}" but received "${content.type}".`,
    );
  }
}

function validateFeaturedId(
  sectionId: string,
  collectionName: string,
  featuredId: string | undefined,
  items: readonly { readonly id: string }[],
): void {
  if (!featuredId) {
    return;
  }
  if (!items.some((item) => item.id === featuredId)) {
    throw new Error(
      `Section "${sectionId}" references unknown ${collectionName} id "${featuredId}".`,
    );
  }
}

function validatePortfolioItems(
  sectionId: string,
  items: readonly {
    readonly id: string;
    readonly title: string;
    readonly description?: string;
    readonly category?: string;
    readonly image: { readonly alt: string };
  }[],
): void {
  if (items.length === 0) {
    throw new Error(`Section "${sectionId}" requires at least one portfolio item.`);
  }

  const ids = new Set<string>();
  for (const item of items) {
    if (!item.id.trim()) {
      throw new Error(`Section "${sectionId}" has a portfolio item with an empty id.`);
    }
    if (ids.has(item.id)) {
      throw new Error(
        `Section "${sectionId}" has duplicate portfolio item id "${item.id}".`,
      );
    }
    ids.add(item.id);

    if (!item.title.trim()) {
      throw new Error(
        `Section "${sectionId}" portfolio item "${item.id}" requires a title.`,
      );
    }
    if (!item.image.alt.trim() || item.image.alt.trim().toLowerCase() === "foto do trabalho") {
      throw new Error(
        `Section "${sectionId}" portfolio item "${item.id}" requires a descriptive alt text.`,
      );
    }
    for (const [field, value] of [
      ["title", item.title],
      ["description", item.description],
      ["category", item.category],
    ] as const) {
      if (value !== undefined && /<\/?[a-z][\s\S]*>/i.test(value)) {
        throw new Error(
          `Section "${sectionId}" portfolio item "${item.id}" ${field} must not contain HTML.`,
        );
      }
    }
  }
}

function resolvePortfolioSection(
  section: Extract<PageSection, { readonly type: "portfolio" }>,
): Extract<PageSection, { readonly type: "portfolio" }> {
  validatePortfolioItems(section.id, section.items);
  validateFeaturedId(
    section.id,
    "portfolio item",
    section.featuredPortfolioItemId,
    section.items,
  );

  if (section.variant === "featured" && !section.featuredPortfolioItemId) {
    throw new Error(
      `Section "${section.id}" uses the featured portfolio variant without a featuredPortfolioItemId.`,
    );
  }

  if (!section.featuredPortfolioItemId) {
    return section;
  }

  return {
    ...section,
    variant: "featured",
    items: [
      ...section.items.filter(
        (item) => item.id === section.featuredPortfolioItemId,
      ),
      ...section.items.filter(
        (item) => item.id !== section.featuredPortfolioItemId,
      ),
    ],
  };
}

function resolveSection(
  blueprint: PresetSectionBlueprint,
  content: SectionContentEntry,
): PageSection {
  assertSameType(blueprint, content);

  switch (blueprint.type) {
    case "site-header":
      if (content.type !== "site-header") throw new Error("Unreachable section mismatch.");
      return { ...content, variant: blueprint.variant, isNavigable: blueprint.isNavigable };
    case "hero":
      if (content.type !== "hero") throw new Error("Unreachable section mismatch.");
      return {
        ...content,
        variant:
          blueprint.variant === "split" || content.image ? blueprint.variant : "centered",
        isNavigable: blueprint.isNavigable,
      };
    case "services":
      if (content.type !== "services") throw new Error("Unreachable section mismatch.");
      if (content.items.length === 0) {
        throw new Error(`Section "${content.id}" requires at least one service.`);
      }
      validateFeaturedId(
        content.id,
        "service",
        content.featuredServiceId,
        content.items,
      );
      return {
        ...content,
        variant: content.featuredServiceId ? "featured" : blueprint.variant,
        isNavigable: blueprint.isNavigable,
      };
    case "product-showcase":
      if (content.type !== "product-showcase") throw new Error("Unreachable section mismatch.");
      if (content.items.length === 0) {
        throw new Error(`Section "${content.id}" requires at least one product.`);
      }
      validateFeaturedId(
        content.id,
        "product",
        content.featuredProductId,
        content.items,
      );
      return {
        ...content,
        variant: content.featuredProductId ? "spotlight" : blueprint.variant,
        isNavigable: blueprint.isNavigable,
      };
    case "portfolio":
      if (content.type !== "portfolio") throw new Error("Unreachable section mismatch.");
      return resolvePortfolioSection({
        ...content,
        variant: content.featuredPortfolioItemId ? "featured" : blueprint.variant,
        isNavigable: blueprint.isNavigable,
      });
    case "about":
      if (content.type !== "about") throw new Error("Unreachable section mismatch.");
      return {
        ...content,
        variant: content.image ? "media" : "text",
        isNavigable: blueprint.isNavigable,
      };
    case "highlights":
      if (content.type !== "highlights") throw new Error("Unreachable section mismatch.");
      return { ...content, variant: blueprint.variant, isNavigable: blueprint.isNavigable };
    case "professional-profile":
      if (content.type !== "professional-profile") {
        throw new Error("Unreachable section mismatch.");
      }
      return {
        ...content,
        variant: content.professional.image ? "portrait" : "credentials",
        isNavigable: blueprint.isNavigable,
      };
    case "testimonials":
      if (content.type !== "testimonials") throw new Error("Unreachable section mismatch.");
      validateFeaturedId(
        content.id,
        "testimonial",
        content.featuredTestimonialId,
        content.items,
      );
      return {
        ...content,
        variant: content.featuredTestimonialId ? "featured" : blueprint.variant,
        isNavigable: blueprint.isNavigable,
      };
    case "contact":
      if (content.type !== "contact") throw new Error("Unreachable section mismatch.");
      if (content.channels.length === 0 && !content.address) {
        throw new Error(`Section "${content.id}" requires contact information.`);
      }
      return { ...content, variant: blueprint.variant, isNavigable: blueprint.isNavigable };
    case "call-to-action":
      if (content.type !== "call-to-action") throw new Error("Unreachable section mismatch.");
      return { ...content, variant: blueprint.variant, isNavigable: blueprint.isNavigable };
    case "site-footer":
      if (content.type !== "site-footer") throw new Error("Unreachable section mismatch.");
      return { ...content, variant: blueprint.variant, isNavigable: blueprint.isNavigable };
  }
}

function validateUniqueSectionIds(pageId: string, sections: readonly PageSection[]): void {
  const ids = new Set<string>();
  for (const section of sections) {
    if (!section.id.trim()) {
      throw new Error(`Page "${pageId}" has a section with an empty id.`);
    }
    if (ids.has(section.id)) {
      throw new Error(`Page "${pageId}" has duplicate section id "${section.id}".`);
    }
    ids.add(section.id);
  }

  if (sections[0]?.type !== "site-header") {
    throw new Error(`Page "${pageId}" must start with exactly one site header.`);
  }
  if (sections.at(-1)?.type !== "site-footer") {
    throw new Error(`Page "${pageId}" must end with exactly one site footer.`);
  }
  if (sections.filter((section) => section.type === "site-header").length !== 1) {
    throw new Error(`Page "${pageId}" must contain exactly one site header.`);
  }
  if (sections.filter((section) => section.type === "site-footer").length !== 1) {
    throw new Error(`Page "${pageId}" must contain exactly one site footer.`);
  }
  if (sections.filter((section) => section.type === "hero").length !== 1) {
    throw new Error(`Page "${pageId}" must contain exactly one primary hero.`);
  }
}

function getNavigation(sections: readonly PageSection[]): readonly NavigationItem[] {
  const header = sections.find((section) => section.type === "site-header");
  if (!header || header.type !== "site-header") {
    return [];
  }
  const navigableIds = new Set(
    sections.filter((section) => section.isNavigable).map((section) => section.id),
  );
  const navigationIds = new Set<string>();
  for (const item of header.navigation) {
    if (!item.id.trim() || !item.label.trim() || !item.href.trim()) {
      throw new Error(`Navigation item fields must not be empty.`);
    }
    if (navigationIds.has(item.id)) {
      throw new Error(`Navigation contains duplicate item id "${item.id}".`);
    }
    navigationIds.add(item.id);
    if (item.href.startsWith("#") && !navigableIds.has(item.href.slice(1))) {
      throw new Error(
        `Navigation item "${item.id}" points to missing or non-navigable section "${item.href}".`,
      );
    }
  }
  return header.navigation;
}

export function resolvePage(
  source: PageSource,
  preset: PresetDefinition,
): PageDefinition {
  if (source.explicitSections) {
    const explicitSections = source.explicitSections.map((section) =>
      section.type === "portfolio" ? resolvePortfolioSection(section) : section,
    );
    validateUniqueSectionIds(source.id, explicitSections);
    return {
      id: source.id,
      route: source.route,
      title: source.title,
      sections: explicitSections,
      navigation: getNavigation(explicitSections),
      seo: source.seo,
    };
  }

  const contentById = new Map(source.content.map((entry) => [entry.id, entry]));
  const sections: PageSection[] = [];

  for (const blueprint of preset.home) {
    const content = contentById.get(blueprint.id);
    if (!content) {
      if (blueprint.isOptional) {
        continue;
      }
      throw new Error(
        `Page "${source.id}" is missing content for ${blueprint.type} section "${blueprint.id}".`,
      );
    }
    sections.push(resolveSection(blueprint, content));
    contentById.delete(blueprint.id);
  }

  if (contentById.size > 0) {
    throw new Error(
      `Page "${source.id}" contains orphan content: ${[...contentById.keys()].join(", ")}.`,
    );
  }

  validateUniqueSectionIds(source.id, sections);
  return {
    id: source.id,
    route: source.route,
    title: source.title,
    sections,
    navigation: getNavigation(sections),
    seo: source.seo,
  };
}
