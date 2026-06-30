import Image from "next/image";
import type { CSSProperties } from "react";

interface BackgroundLayerProps {
  src: string;
  alt?: string;
  /** Parallax transform is applied by the parent (HeroSection owns scroll). */
  style?: CSSProperties;
}

/**
 * The bottom-most layer: photo + dark gradient + slight blur/desaturation
 * so the SVG network and glass cards stay legible on top of it without
 * the photo fighting for attention.
 */
export function BackgroundLayer({ src, alt = "", style }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover [filter:saturate(0.85)_blur(1px)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
    </div>
  );
}
