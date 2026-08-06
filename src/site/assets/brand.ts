import type { ImageAsset } from "@/domain/assets";

export const brandLogo = {
  src: "/brand/soma-laboral-logo.webp",
  width: 500,
  height: 500,
  decorative: true,
} as const satisfies ImageAsset;

export const brandMark = {
  src: "/brand/soma-laboral-mark.webp",
  width: 360,
  height: 360,
  decorative: true,
} as const satisfies ImageAsset;
