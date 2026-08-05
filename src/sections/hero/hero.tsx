import {
  Cluster,
  Grid,
  SectionShell,
  Stack,
} from "@/components/layout/layout";
import { ActionLink } from "@/components/ui/action-link";
import { ContentImage } from "@/components/ui/content-image";
import { Heading, Text } from "@/components/ui/typography";
import type { HeroSection as HeroSectionProps } from "@/domain/sections";

import shared from "@/sections/shared/sections.module.css";
import styles from "./hero.module.css";

export function HeroSection({
  actions,
  description,
  eyebrow,
  id,
  image,
  title,
  variant,
}: HeroSectionProps) {
  const content = (
    <Stack className={variant === "centered" ? shared.centered : undefined} gap="large">
      <Stack gap="small">
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading level={1} size="display">
          {title}
        </Heading>
        <Text tone="muted">{description}</Text>
      </Stack>
      <Cluster align={variant === "centered" ? "center" : "start"}>
        {actions.map((action, index) => (
          <ActionLink
            action={action}
            key={action.id}
            variant={index === 0 ? "primary" : "secondary"}
          />
        ))}
      </Cluster>
    </Stack>
  );

  return (
    <SectionShell className={styles.hero} id={id}>
      {variant === "split" && image ? (
        <Grid gap="large" minimum="wide">
          {content}
          <ContentImage image={image} />
        </Grid>
      ) : (
        content
      )}
    </SectionShell>
  );
}
