"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { ActionLink } from "@/components/ui/action-link";
import type { Action, NavigationItem } from "@/domain/content";

import styles from "./site-header.module.css";

interface MobileNavigationProps {
  readonly action?: Action;
  readonly items: readonly NavigationItem[];
}

export function MobileNavigation({ action, items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClose(): void {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className={styles.mobileNavigation}>
      <button
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        className={styles.menuButton}
        onClick={() => setIsOpen((current) => !current)}
        ref={buttonRef}
        type="button"
      >
        Menu
      </button>
      {isOpen ? (
        <div className={styles.mobilePanel} id="mobile-menu">
          <nav aria-label="Navegação móvel">
            <ul className={styles.navigationList}>
              {items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {action ? <ActionLink action={action} /> : null}
          <button className={styles.closeButton} onClick={handleClose} type="button">
            Fechar menu
          </button>
        </div>
      ) : null}
    </div>
  );
}
