import Link from "next/link";

import { Container } from "@/components/layout/layout";
import { ActionLink } from "@/components/ui/action-link";
import { ContentImage } from "@/components/ui/content-image";
import type { SiteHeaderSection as SiteHeaderSectionProps } from "@/domain/sections";

import { MobileNavigation } from "./mobile-navigation";
import styles from "./site-header.module.css";

export function SiteHeaderSection({
  action,
  businessName,
  logo,
  navigation,
}: SiteHeaderSectionProps) {
  return (
    <header className={styles.header}>
      <Container className={styles.inner} size="wide">
        <Link className={styles.brand} href="/">
          {logo ? <ContentImage image={logo} /> : null}
          <span>{businessName}</span>
        </Link>
        <nav aria-label="Navegação principal" className={styles.desktopNavigation}>
          <ul className={styles.navigationList}>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.desktopAction}>
          {action ? <ActionLink action={action} /> : null}
        </div>
        <MobileNavigation action={action} items={navigation} />
      </Container>
    </header>
  );
}
