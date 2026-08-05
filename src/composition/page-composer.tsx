import type { PageDefinition } from "@/domain/pages";
import { renderSection } from "@/composition/section-catalog";

interface PageComposerProps {
  readonly page: PageDefinition;
}

export function PageComposer({ page }: PageComposerProps) {
  return (
    <>
      <a className="skipLink" href="#main-content">
        Pular para o conteúdo principal
      </a>
      {page.sections.map((section) =>
        section.type === "site-header" ? (
          <div key={section.id}>{renderSection(section)}</div>
        ) : null,
      )}
      <main id="main-content">
        {page.sections.map((section) =>
          section.type !== "site-header" && section.type !== "site-footer" ? (
            <div key={section.id}>{renderSection(section)}</div>
          ) : null,
        )}
      </main>
      {page.sections.map((section) =>
        section.type === "site-footer" ? (
          <div key={section.id}>{renderSection(section)}</div>
        ) : null,
      )}
    </>
  );
}
