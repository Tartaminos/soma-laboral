import type { ImageAsset } from "@/domain/assets";

export const brandLogo = {
  src: "/brand/brand-mark.svg",
  width: 40,
  height: 40,
  decorative: true,
} as const satisfies ImageAsset;
