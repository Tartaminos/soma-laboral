import type {
  Highlight,
  PortfolioItem,
  Product,
  Professional,
  Service,
  Testimonial,
} from "@/domain/content";

interface Identified {
  readonly id: string;
}

interface HoursEntry extends Identified {
  readonly isClosed: boolean;
  readonly opens?: string;
  readonly closes?: string;
}

export function validateUniqueIds(
  collectionName: string,
  items: readonly Identified[],
): void {
  const ids = new Set<string>();

  for (const item of items) {
    if (!item.id.trim()) {
      throw new Error(`${collectionName}: item id must not be empty.`);
    }
    if (ids.has(item.id)) {
      throw new Error(`${collectionName}: duplicate id "${item.id}".`);
    }
    ids.add(item.id);
  }
}

export function validateOpeningHours(items: readonly HoursEntry[]): void {
  validateUniqueIds("openingHours", items);
  for (const item of items) {
    if (item.isClosed && (item.opens || item.closes)) {
      throw new Error(
        `openingHours: closed entry "${item.id}" cannot define an interval.`,
      );
    }
    if (!item.isClosed && (!item.opens || !item.closes)) {
      throw new Error(
        `openingHours: open entry "${item.id}" requires opens and closes.`,
      );
    }
    if (!item.isClosed && item.opens && item.closes && item.opens >= item.closes) {
      throw new Error(
        `openingHours: entry "${item.id}" must close after it opens.`,
      );
    }
  }
}

function requireText(context: string, value: string): void {
  if (!value.trim()) {
    throw new Error(`${context} must not be empty.`);
  }
  if (/<\/?[a-z][\s\S]*>/i.test(value)) {
    throw new Error(`${context} must not contain HTML.`);
  }
}

export function validateServices(items: readonly Service[]): void {
  validateUniqueIds("services", items);
  for (const item of items) {
    requireText(`services.${item.id}.name`, item.name);
    requireText(`services.${item.id}.summary`, item.summary);
    if (item.description !== undefined) {
      requireText(`services.${item.id}.description`, item.description);
    }
  }
}

export function validateProducts(items: readonly Product[]): void {
  validateUniqueIds("products", items);
  for (const item of items) {
    requireText(`products.${item.id}.name`, item.name);
    requireText(`products.${item.id}.summary`, item.summary);
  }
}

export function validatePortfolio(items: readonly PortfolioItem[]): void {
  validateUniqueIds("portfolio", items);
  if (items.length === 0) {
    throw new Error("portfolio must contain at least one item.");
  }

  for (const item of items) {
    requireText(`portfolio.${item.id}.title`, item.title);
    requireText(`portfolio.${item.id}.image.alt`, item.image.alt);
    if (item.image.alt.trim().toLowerCase() === "foto do trabalho") {
      throw new Error(
        `portfolio.${item.id}.image.alt must describe the visual content.`,
      );
    }
    if (item.description !== undefined) {
      requireText(`portfolio.${item.id}.description`, item.description);
    }
    if (item.category !== undefined) {
      requireText(`portfolio.${item.id}.category`, item.category);
    }
  }
}

export function validateHighlights(items: readonly Highlight[]): void {
  validateUniqueIds("highlights", items);
  for (const item of items) {
    requireText(`highlights.${item.id}.title`, item.title);
    requireText(`highlights.${item.id}.description`, item.description);
  }
}

export function validateTestimonials(items: readonly Testimonial[]): void {
  validateUniqueIds("testimonials", items);
  for (const item of items) {
    requireText(`testimonials.${item.id}.author`, item.author);
    requireText(`testimonials.${item.id}.quote`, item.quote);
  }
}

export function validateProfessional(profile: Professional): void {
  requireText("professional.id", profile.id);
  requireText("professional.name", profile.name);
  requireText("professional.role", profile.role);
  requireText("professional.biography", profile.biography);
  validateUniqueIds("professional.credentials", profile.credentials);
  for (const credential of profile.credentials) {
    requireText(
      `professional.credentials.${credential.id}.title`,
      credential.title,
    );
  }
}
