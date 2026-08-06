interface SocialIconProps {
  readonly id: string;
}

export function SocialIcon({ id }: SocialIconProps) {
  if (id !== "instagram") {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <rect height="17" rx="5" stroke="currentColor" strokeWidth="2" width="17" x="3.5" y="3.5" />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" fill="currentColor" r="1" />
    </svg>
  );
}
