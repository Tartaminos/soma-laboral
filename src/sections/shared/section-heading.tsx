import { Stack } from "@/components/layout/layout";
import { Heading, Text } from "@/components/ui/typography";

interface SectionHeadingProps {
  readonly title: string;
  readonly description?: string;
}

export function SectionHeading({ description, title }: SectionHeadingProps) {
  return (
    <Stack gap="small">
      <Heading level={2} size="large">
        {title}
      </Heading>
      {description ? <Text tone="muted">{description}</Text> : null}
    </Stack>
  );
}
