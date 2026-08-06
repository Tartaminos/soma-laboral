import { SectionShell, Stack } from "@/components/layout/layout";
import { ActionLink } from "@/components/ui/action-link";
import { ContentImage } from "@/components/ui/content-image";
import { Surface } from "@/components/ui/surface";
import type { PortfolioSection as PortfolioSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./portfolio.module.css";

export function PortfolioSection({
  action,
  description,
  featuredPortfolioItemId,
  id,
  items,
  title,
  variant,
}: PortfolioSectionProps) {
  return (
    <SectionShell id={id} surface={variant === "mosaic" ? "alternate" : "default"}>
      <Stack gap="large">
        <SectionHeading description={description} title={title} />
        <ul
          className={`${styles.portfolioList} ${
            variant === "featured" ? styles.featuredList : ""
          } ${variant === "mosaic" ? styles.mosaicList : ""}`}
        >
          {items.map((item) => {
            const isFeatured =
              variant === "featured" && item.id === featuredPortfolioItemId;
            const figure = (
              <figure className={styles.figure}>
                <ContentImage image={item.image} />
                <figcaption>
                  {item.category ? (
                    <p className={shared.meta}>{item.category}</p>
                  ) : null}
                  <h3 className={shared.cardTitle}>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </figcaption>
              </figure>
            );

            return (
              <li
                className={isFeatured ? styles.featuredItem : undefined}
                key={item.id}
              >
                {variant === "mosaic" ? figure : (
                  <Surface featured={isFeatured}>{figure}</Surface>
                )}
              </li>
            );
          })}
        </ul>
        {action ? (
          <div className={styles.action}>
            <ActionLink action={action} variant="secondary" />
          </div>
        ) : null}
      </Stack>
    </SectionShell>
  );
}
