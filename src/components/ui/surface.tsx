import type { ReactNode } from "react";

import styles from "./surface.module.css";

interface SurfaceProps {
  readonly children: ReactNode;
  readonly featured?: boolean;
}

export function Surface({ children, featured = false }: SurfaceProps) {
  return (
    <div className={`${styles.surface} ${featured ? styles.featured : ""}`}>
      {children}
    </div>
  );
}
