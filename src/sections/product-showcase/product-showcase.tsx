import { SectionShell, Stack } from "@/components/layout/layout";
import { ContentImage } from "@/components/ui/content-image";
import { Surface } from "@/components/ui/surface";
import type { ProductShowcaseSection as ProductShowcaseSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./product-showcase.module.css";

export function ProductShowcaseSection({
  description,
  featuredProductId,
  id,
  items,
  title,
  variant,
}: ProductShowcaseSectionProps) {
  return (
    <SectionShell id={id}>
      <Stack gap="large">
        <SectionHeading description={description} title={title} />
        <ul className={shared.gridList}>
          {items.map((product) => (
            <li key={product.id}>
              <Surface
                featured={variant === "spotlight" && product.id === featuredProductId}
              >
                <Stack gap="medium">
                  {product.image ? <ContentImage image={product.image} /> : null}
                  <div>
                    {product.category ? (
                      <p className={shared.meta}>{product.category}</p>
                    ) : null}
                    <h3 className={shared.cardTitle}>{product.name}</h3>
                    <p>{product.summary}</p>
                    {product.commercialInfo ? (
                      <p className={styles.commercial}>{product.commercialInfo}</p>
                    ) : null}
                  </div>
                </Stack>
              </Surface>
            </li>
          ))}
        </ul>
      </Stack>
    </SectionShell>
  );
}
