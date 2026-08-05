import Link from "next/link";

import type { Action } from "@/domain/content";

import styles from "./action.module.css";

interface ActionLinkProps {
  readonly action: Action;
  readonly variant?: "primary" | "secondary";
}

export function ActionLink({
  action,
  variant = "primary",
}: ActionLinkProps) {
  const isExternal = action.kind === "external";
  const className = `${styles.action} ${styles[variant]}`;

  if (action.kind === "internal") {
    return (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={action.href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {action.label}
      {isExternal ? <span className={styles.newWindow}> (abre em nova aba)</span> : null}
    </a>
  );
}
