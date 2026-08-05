import { SectionShell, Stack } from "@/components/layout/layout";
import { ContentImage } from "@/components/ui/content-image";
import { Heading, Text } from "@/components/ui/typography";
import type { ProfessionalProfileSection as ProfessionalProfileSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./professional-profile.module.css";

export function ProfessionalProfileSection({
  id,
  professional,
  title,
  variant,
}: ProfessionalProfileSectionProps) {
  const profile = (
    <Stack gap="medium">
      <SectionHeading title={title} />
      <div>
        <Heading level={3} size="medium">
          {professional.name}
        </Heading>
        <p className={styles.role}>{professional.role}</p>
      </div>
      <Text tone="muted">{professional.biography}</Text>
      {professional.credentials.length > 0 ? (
        <ul className={styles.credentials}>
          {professional.credentials.map((credential) => (
            <li key={credential.id}>
              <strong>{credential.title}</strong>
              {credential.detail ? <span>{credential.detail}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </Stack>
  );

  return (
    <SectionShell id={id}>
      {variant === "portrait" && professional.image ? (
        <div className={shared.split}>
          <ContentImage image={professional.image} />
          {profile}
        </div>
      ) : (
        profile
      )}
    </SectionShell>
  );
}
