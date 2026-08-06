import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve(process.cwd(), "out");
const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "demo/services/index.html",
  "demo/commerce/index.html",
  "demo/professional/index.html",
  "brand/soma-laboral-logo.webp",
  "brand/soma-laboral-mark.webp",
  "images/hero/soma-laboral-hero.mp4",
  "images/hero/soma-laboral-hero-poster.webp",
  "images/social/soma-laboral-og.webp",
  "images/portfolio/ginastica-laboral-equipe-01.webp",
  "images/portfolio/ginastica-laboral-equipe-02.webp",
  "images/portfolio/ginastica-laboral-equipe-03.webp",
];

for (const relativePath of requiredFiles) {
  if (!existsSync(path.join(outputDirectory, relativePath))) {
    throw new Error(`Static output is missing "${relativePath}".`);
  }
}

const html = readFileSync(path.join(outputDirectory, "index.html"), "utf8");
for (const expected of [
  'lang="pt-BR"',
  'rel="canonical"',
  'type="application/ld+json"',
  'id="main-content"',
  "Soma Laboral",
  "https://somalaboral.com.br/",
  "https://wa.me/5519997462703",
  "https://www.instagram.com/somaginasticalaboral/",
  "Desenvolvido por Contestech",
  'areaServed',
]) {
  if (!html.includes(expected)) {
    throw new Error(`Static home does not include ${expected}.`);
  }
}

for (const forbidden of [
  "https://example.com",
  "OpeningHoursSpecification",
  "PostalAddress",
  "+55 19 99746-2703</a>",
]) {
  if (html.includes(forbidden)) {
    throw new Error(`Static home must not include ${forbidden}.`);
  }
}

if (html.includes("Alternar preset de demonstração")) {
  throw new Error("Static home must not include the preset demo switcher.");
}

const demoExpectations = {
  services: ['id="services"'],
  commerce: ['id="products"'],
  professional: ['id="profile"'],
};

for (const [presetId, expectedSections] of Object.entries(demoExpectations)) {
  const demoHtml = readFileSync(
    path.join(outputDirectory, "demo", presetId, "index.html"),
    "utf8",
  );

  for (const expected of [
    'name="robots" content="noindex, nofollow"',
    "Alternar preset de demonstração",
    ...expectedSections,
  ]) {
    if (!demoHtml.includes(expected)) {
      throw new Error(
        `Static ${presetId} demo does not include ${expected}.`,
      );
    }
  }

  if (demoHtml.includes('type="application/ld+json"')) {
    throw new Error(`Static ${presetId} demo must not include JSON-LD.`);
  }
  if (presetId === "commerce" && demoHtml.includes('id="portfolio"')) {
    throw new Error("Static commerce demo must not include portfolio.");
  }
}

const sitemap = readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");
if (sitemap.includes("/demo/")) {
  throw new Error("Sitemap must not include demonstration routes.");
}

process.stdout.write("Static output validation passed.\n");
