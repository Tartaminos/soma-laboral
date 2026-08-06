import Link from "next/link";

import { Container, Stack } from "@/components/layout/layout";
import type { SiteFooterSection as SiteFooterSectionProps } from "@/domain/sections";

import styles from "./site-footer.module.css";

export function SiteFooterSection({
  attribution,
  businessName,
  channels,
  description,
  navigation,
  variant,
}: SiteFooterSectionProps) {
  return (
    <footer className={`${styles.footer} ${styles[variant]}`}>
      <Container>
        <div className={styles.content}>
          <Stack gap="small">
            <strong>{businessName}</strong>
            {description ? <p>{description}</p> : null}
          </Stack>
          {navigation.length > 0 ? (
            <nav aria-label="Navegação do rodapé">
              <ul className={styles.list}>
                {navigation.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {channels.length > 0 ? (
            <address className={styles.address}>
              {channels.map((channel) => (
                <a href={channel.href} key={`${channel.type}-${channel.href}`}>
                  {channel.value}
                </a>
              ))}
            </address>
          ) : null}
        </div>
        <div className={styles.legal}>
          <p>
            © {new Date().getFullYear()} {businessName}. Todos os direitos reservados.
          </p>
          {attribution ? (
            <a
              className={styles.attribution}
              href={attribution.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {attribution.label}
              <span className={styles.newWindow}> (abre em nova aba)</span>
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
