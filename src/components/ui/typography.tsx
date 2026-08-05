import type { ReactNode } from "react";

import styles from "./typography.module.css";

interface HeadingProps {
  readonly children: ReactNode;
  readonly level: 1 | 2 | 3 | 4;
  readonly size?: "small" | "medium" | "large" | "display";
  readonly className?: string;
}

export function Heading({
  children,
  className,
  level,
  size = "medium",
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={`${styles.heading} ${styles[size]} ${className ?? ""}`}>{children}</Tag>;
}

interface TextProps {
  readonly children: ReactNode;
  readonly tone?: "default" | "muted";
  readonly className?: string;
}

export function Text({ children, className, tone = "default" }: TextProps) {
  return (
    <p className={`${styles.text} ${styles[tone]} ${className ?? ""}`}>
      {children}
    </p>
  );
}
