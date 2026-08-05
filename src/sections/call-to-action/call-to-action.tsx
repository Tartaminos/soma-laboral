import { Cluster, SectionShell, Stack } from "@/components/layout/layout";
import { ActionLink } from "@/components/ui/action-link";
import { Heading, Text } from "@/components/ui/typography";
import type { CallToActionSection as CallToActionSectionProps } from "@/domain/sections";

import styles from "./call-to-action.module.css";

export function CallToActionSection({
  action,
  description,
  id,
  title,
  variant,
}: CallToActionSectionProps) {
  return (
    <SectionShell id={id} surface="contrast">
      <div className={`${styles.content} ${styles[variant]}`}>
        <Stack gap="small">
          <Heading level={2} size="large">
            {title}
          </Heading>
          {description ? <Text>{description}</Text> : null}
        </Stack>
        <Cluster>
          <ActionLink action={action} variant="secondary" />
        </Cluster>
      </div>
    </SectionShell>
  );
}
