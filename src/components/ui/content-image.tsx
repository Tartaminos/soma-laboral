import Image from "next/image";

import type { ImageAsset } from "@/domain/assets";

import styles from "./content-image.module.css";

interface ContentImageProps {
  readonly image: ImageAsset;
  readonly className?: string;
}

export function ContentImage({ className, image }: ContentImageProps) {
  return (
    <Image
      alt={image.decorative ? "" : image.alt}
      className={`${styles.image} ${className ?? ""}`}
      height={image.height}
      priority={image.priority}
      src={image.src}
      width={image.width}
    />
  );
}
