"use client";

import { useEffect, useRef, useState } from "react";

import { ContentImage } from "@/components/ui/content-image";
import type { VideoAsset } from "@/domain/assets";

import styles from "./hero.module.css";

interface HeroVideoProps {
  readonly asset: VideoAsset;
}

function hasDataSavingConnection(
  value: Navigator,
): value is Navigator & { readonly connection: { readonly saveData?: boolean } } {
  return "connection" in value;
}

export function HeroVideo({ asset }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const activeVideo: HTMLVideoElement = video;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldSaveData =
      hasDataSavingConnection(navigator) &&
      navigator.connection.saveData === true;

    function synchronizePlayback(): void {
      if (motionPreference.matches || shouldSaveData) {
        activeVideo.pause();
        activeVideo.currentTime = 0;
        return;
      }

      void activeVideo.play().catch(() => activeVideo.pause());
    }

    synchronizePlayback();
    motionPreference.addEventListener("change", synchronizePlayback);
    return () => {
      motionPreference.removeEventListener("change", synchronizePlayback);
      activeVideo.pause();
    };
  }, []);

  if (hasFailed) {
    return <ContentImage className={styles.video} image={asset.poster} />;
  }

  return (
    <video
      aria-hidden="true"
      className={styles.video}
      height={asset.height}
      loop
      muted
      onError={() => setHasFailed(true)}
      playsInline
      poster={asset.poster.src}
      preload="metadata"
      ref={videoRef}
      tabIndex={-1}
      width={asset.width}
    >
      <source src={asset.src} type="video/mp4" />
    </video>
  );
}
