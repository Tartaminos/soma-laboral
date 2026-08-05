import type { ReactNode } from "react";

import styles from "./layout.module.css";

type Gap = "small" | "medium" | "large";

interface ChildrenProps {
  readonly children: ReactNode;
  readonly className?: string;
}

interface ContainerProps extends ChildrenProps {
  readonly size?: "content" | "wide";
}

export function Container({
  children,
  className,
  size = "content",
}: ContainerProps) {
  const sizeClass = size === "wide" ? styles.wideSize : "";
  return (
    <div className={`${styles.container} ${sizeClass} ${className ?? ""}`}>
      {children}
    </div>
  );
}

interface StackProps extends ChildrenProps {
  readonly gap?: Gap;
}

export function Stack({ children, className, gap = "medium" }: StackProps) {
  return (
    <div className={`${styles.stack} ${styles[gap]} ${className ?? ""}`}>
      {children}
    </div>
  );
}

interface ClusterProps extends StackProps {
  readonly align?: "start" | "center" | "end";
}

export function Cluster({
  align = "center",
  children,
  className,
  gap = "medium",
}: ClusterProps) {
  return (
    <div
      className={`${styles.cluster} ${styles[gap]} ${styles[align]} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

interface GridProps extends StackProps {
  readonly minimum?: "narrow" | "regular" | "wide";
}

export function Grid({
  children,
  className,
  gap = "medium",
  minimum = "regular",
}: GridProps) {
  const minimumClass =
    minimum === "narrow"
      ? styles.minimumNarrow
      : minimum === "wide"
        ? styles.minimumWide
        : styles.minimumRegular;
  return (
    <div
      className={`${styles.grid} ${styles[gap]} ${minimumClass} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

interface SectionShellProps extends ChildrenProps {
  readonly id?: string;
  readonly surface?: "default" | "alternate" | "contrast";
}

export function SectionShell({
  children,
  className,
  id,
  surface = "default",
}: SectionShellProps) {
  return (
    <section
      className={`${styles.section} ${styles[surface]} ${className ?? ""}`}
      id={id}
    >
      <Container>{children}</Container>
    </section>
  );
}
