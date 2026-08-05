import { SectionShell, Stack } from "@/components/layout/layout";
import { Surface } from "@/components/ui/surface";
import type { HighlightsSection as HighlightsSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./highlights.module.css";

export function HighlightsSection({
  id,
  items,
  title,
  variant,
}: HighlightsSectionProps) {
  const itemList = items.map((item) => (
    <li key={item.id}>
      {variant === "cards" ? (
        <Surface>
          <h3 className={shared.cardTitle}>{item.title}</h3>
          <p>{item.description}</p>
        </Surface>
      ) : (
        <div className={styles.inlineItem}>
          <h3 className={shared.cardTitle}>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      )}
    </li>
  ));

  return (
    <SectionShell id={id} surface="alternate">
      <Stack gap="large">
        <SectionHeading title={title} />
        {variant === "cards" ? (
          <ul className={styles.cardList}>
            {itemList}
          </ul>
        ) : (
          <ul className={shared.inlineList}>{itemList}</ul>
        )}
      </Stack>
    </SectionShell>
  );
}
