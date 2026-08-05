import { SectionShell, Stack } from "@/components/layout/layout";
import { ContentImage } from "@/components/ui/content-image";
import type { AboutSection as AboutSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./about.module.css";

export function AboutSection({
  id,
  image,
  paragraphs,
  title,
  variant,
}: AboutSectionProps) {
  const content = (
    <Stack gap="medium">
      <SectionHeading title={title} />
      {paragraphs.map((paragraph) => (
        <p className={styles.paragraph} key={paragraph}>
          {paragraph}
        </p>
      ))}
    </Stack>
  );

  return (
    <SectionShell id={id}>
      {variant === "media" && image ? (
        <div className={shared.split}>
          {content}
          <ContentImage image={image} />
        </div>
      ) : (
        content
      )}
    </SectionShell>
  );
}
