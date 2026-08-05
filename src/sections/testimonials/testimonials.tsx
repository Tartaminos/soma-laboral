import { SectionShell, Stack } from "@/components/layout/layout";
import { Surface } from "@/components/ui/surface";
import type { TestimonialsSection as TestimonialsSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./testimonials.module.css";

export function TestimonialsSection({
  featuredTestimonialId,
  id,
  items,
  title,
  variant,
}: TestimonialsSectionProps) {
  return (
    <SectionShell className={styles.testimonials} id={id}>
      <Stack gap="large">
        <SectionHeading title={title} />
        <ul className={shared.gridList}>
          {items.map((testimonial) => (
            <li key={testimonial.id}>
              <Surface
                featured={
                  variant === "featured" &&
                  testimonial.id === featuredTestimonialId
                }
              >
                <blockquote>
                  <p className={shared.quote}>“{testimonial.quote}”</p>
                  <footer>
                    <strong>{testimonial.author}</strong>
                    {testimonial.context ? (
                      <span className={shared.meta}> — {testimonial.context}</span>
                    ) : null}
                  </footer>
                </blockquote>
              </Surface>
            </li>
          ))}
        </ul>
      </Stack>
    </SectionShell>
  );
}
