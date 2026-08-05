"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import type { PresetId } from "@/domain/site";

import styles from "./preset-demo-switcher.module.css";

const PANEL_ID = "preset-demo-options";

const presetOptions = [
  {
    id: "services",
    label: "Serviços",
    href: "/demo/services/",
  },
  {
    id: "commerce",
    label: "Comércio",
    href: "/demo/commerce/",
  },
  {
    id: "professional",
    label: "Profissional",
    href: "/demo/professional/",
  },
] as const satisfies readonly {
  readonly id: PresetId;
  readonly label: string;
  readonly href: `/demo/${PresetId}/`;
}[];

interface PresetDemoSwitcherProps {
  readonly currentPresetId: PresetId;
}

export function PresetDemoSwitcher({
  currentPresetId,
}: PresetDemoSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleEscape(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key !== "Escape" || !isOpen) {
      return;
    }

    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className={styles.switcher} onKeyDown={handleEscape}>
      {isOpen ? (
        <nav
          aria-label="Presets de demonstração"
          className={styles.panel}
          id={PANEL_ID}
        >
          <p className={styles.title}>Comparar presets</p>
          <ul className={styles.options}>
            {presetOptions.map((option) => {
              const isCurrent = option.id === currentPresetId;

              return (
                <li key={option.id}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={
                      isCurrent ? `${option.label}, atual` : undefined
                    }
                    className={styles.option}
                    href={option.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{option.label}</span>
                    {isCurrent ? (
                      <span className={styles.current}>Atual</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
      <button
        aria-controls={PANEL_ID}
        aria-expanded={isOpen}
        aria-label="Alternar preset de demonstração"
        className={styles.trigger}
        onClick={() => setIsOpen((current) => !current)}
        ref={buttonRef}
        type="button"
      >
        <svg
          aria-hidden="true"
          className={styles.icon}
          viewBox="0 0 24 24"
        >
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />
        </svg>
      </button>
    </div>
  );
}
