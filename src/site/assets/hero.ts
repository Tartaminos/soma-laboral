import type { VideoAsset } from "@/domain/assets";

export const heroVideo = {
  src: "/images/hero/soma-laboral-hero.mp4",
  poster: {
    src: "/images/hero/soma-laboral-hero-poster.webp",
    width: 1280,
    height: 720,
    decorative: true,
    priority: true,
  },
  width: 1280,
  height: 720,
  decorative: true,
} as const satisfies VideoAsset;
