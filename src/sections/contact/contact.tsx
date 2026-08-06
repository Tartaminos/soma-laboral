import { SectionShell, Stack } from "@/components/layout/layout";
import { ActionLink } from "@/components/ui/action-link";
import type { ContactSection as ContactSectionProps } from "@/domain/sections";
import { SectionHeading } from "@/sections/shared/section-heading";

import { SocialIcon } from "./social-icons";
import shared from "@/sections/shared/sections.module.css";
import styles from "./contact.module.css";

export function ContactSection({
  action,
  address,
  channels,
  description,
  id,
  openingHours,
  socialLinks = [],
  title,
  variant,
}: ContactSectionProps) {
  const hasDetails = channels.length > 0 || Boolean(address);
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
      <Stack className={styles.content} gap="large">
        <SectionHeading description={description} title={title} />
        {action || socialLinks.length > 0 ? (
          <div className={styles.actions}>
            {action ? <ActionLink action={action} /> : null}
            {socialLinks.length > 0 ? (
              <ul className={styles.socialList}>
                {socialLinks.map((socialLink) => (
                  <li key={socialLink.id}>
                    <a
                      aria-label={socialLink.label}
                      className={styles.socialLink}
                      href={socialLink.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SocialIcon id={socialLink.id} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        {variant === "split" && hasDetails && hours ? (
          <div className={shared.split}>
            {details}
            {hours}
          </div>
        ) : hasDetails || hours ? (
          <Stack gap="medium">
            {hasDetails ? details : null}
            {hours}
          </Stack>
        ) : null}
      </Stack>
    </SectionShell>
  );
}
