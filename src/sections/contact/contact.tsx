import { SectionShell, Stack } from "@/components/layout/layout";
import type { ContactSection as ContactSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import shared from "@/sections/shared/sections.module.css";
import styles from "./contact.module.css";

export function ContactSection({
  address,
  channels,
  description,
  id,
  openingHours,
  title,
  variant,
}: ContactSectionProps) {
  const details = (
    <Stack gap="medium">
      {channels.length > 0 ? (
        <ul className={styles.contactList}>
          {channels.map((channel) => (
            <li key={`${channel.type}-${channel.href}`}>
              <span>{channel.label}</span>
              <a href={channel.href}>{channel.value}</a>
            </li>
          ))}
        </ul>
      ) : null}
      {address ? (
        <address className={shared.address}>
          {address.street}, {address.number}
          {address.complement ? `, ${address.complement}` : null}
          <br />
          {address.district ? `${address.district} — ` : null}
          {address.city}/{address.region}
          <br />
          {address.postalCode}
        </address>
      ) : null}
    </Stack>
  );

  const hours = openingHours.length > 0 ? (
    <div>
      <h3 className={styles.subheading}>Horários</h3>
      <ul className={styles.hours}>
        {openingHours.map((entry) => (
          <li key={entry.id}>
            <span>{entry.days.join(", ")}</span>
            <span>
              {entry.isClosed ? "Fechado" : `${entry.opens}–${entry.closes}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

  return (
    <SectionShell id={id} surface="alternate">
      <Stack gap="large">
        <SectionHeading description={description} title={title} />
        {variant === "split" ? (
          <div className={shared.split}>
            {details}
            {hours}
          </div>
        ) : (
          <Stack gap="medium">
            {details}
            {hours}
          </Stack>
        )}
      </Stack>
    </SectionShell>
  );
}
