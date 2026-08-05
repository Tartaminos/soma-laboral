import { SectionShell, Stack } from "@/components/layout/layout";
import { Surface } from "@/components/ui/surface";
import type { ServicesSection as ServicesSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./services.module.css";

export function ServicesSection({
  description,
  featuredServiceId,
  id,
  items,
  title,
  variant,
}: ServicesSectionProps) {
  return (
    <SectionShell id={id} surface="alternate">
      <Stack gap="large">
        <SectionHeading description={description} title={title} />
        <ul className={shared.gridList}>
          {items.map((service) => (
            <li key={service.id}>
              <Surface
                featured={variant === "featured" && service.id === featuredServiceId}
              >
                <h3 className={shared.cardTitle}>{service.name}</h3>
                <p>{service.summary}</p>
                {service.description ? (
                  <p className={styles.description}>{service.description}</p>
                ) : null}
              </Surface>
            </li>
          ))}
        </ul>
      </Stack>
    </SectionShell>
  );
}
