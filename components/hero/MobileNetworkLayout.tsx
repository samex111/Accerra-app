import type { ReactNode } from "react";
import { NetworkSVG } from "./NetworkSVG";
import { FloatingCard } from "./FloatingCard";
import { CenterLogo } from "./CenterLogo";
import {
  mobileFloatingCards,
  mobileCenterCard,
  mobileNetworkPaths,
} from "./data";
import { MOBILE_REFERENCE_WIDTH, MOBILE_REFERENCE_HEIGHT } from "./types";

/**
 * Below `sm`. The reference site doesn't shrink the desktop funnel down —
 * it switches to a single vertical trunk with two horizontal
 * cross-connectors (see mobileNetworkPaths in data.ts). Same component
 * shapes as desktop (NetworkSVG, FloatingCard, CenterLogo), just a
 * different coordinate space and a `compact` card variant.
 */
export function MobileNetworkLayout({ logo }: { logo: ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[433/320] w-full max-w-sm sm:hidden">
      <NetworkSVG
        paths={mobileNetworkPaths}
        width={MOBILE_REFERENCE_WIDTH}
        height={MOBILE_REFERENCE_HEIGHT}
      />
      {mobileFloatingCards.map((card) => (
        <FloatingCard key={card.id} card={card} compact />
      ))}
      <CenterLogo position={mobileCenterCard}>{logo}</CenterLogo>
    </div>
  );
}