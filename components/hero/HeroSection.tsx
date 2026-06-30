"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundLayer } from "./BackgroundLayer";
import { NetworkSVG } from "./NetworkSVG";
import { FloatingCard } from "./FloatingCard";
import { CenterLogo } from "./CenterLogo";
import { MobileNetworkLayout } from "./MobileNetworkLayout";
import { floatingCards, centerCard, networkPaths } from "./data";
import { REFERENCE_WIDTH, REFERENCE_HEIGHT } from "./types";

interface HeroSectionProps {
  /** Path to the background photo (place it in /public). */
  backgroundSrc: string;
  /** Your logo mark, rendered inside the center card. Defaults to a placeholder. */
  logo?: ReactNode;
}

const DefaultLogo = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
    <path d="M4 4 L28 28 M28 4 L4 28" stroke="black" strokeWidth={4} strokeLinecap="round" />
  </svg>
);

/**
 * Animated hero network section: background photo, SVG connection
 * network, floating glass cards, and a center logo card that the whole
 * network funnels into.
 *
 * Desktop/tablet (sm+) uses the five-branch funnel from the reference.
 * Mobile uses the reference site's own mobile pattern — a single trunk
 * with two cross-connectors — rather than a scaled-down version of the
 * desktop layout (see MobileNetworkLayout.tsx for why).
 */
export function HeroSection({ backgroundSrc, logo }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background moves slowest, SVG a bit more, cards the most — all subtle.
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 54]);

  const logoMark = logo ?? <DefaultLogo />;

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-black [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <BackgroundLayer src={backgroundSrc} alt="" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-40 pt-20 sm:pb-56 sm:pt-28">
        {/* Desktop / tablet: 734x405 reference frame, five-branch funnel. */}
        <div className="relative mx-auto hidden aspect-[734/405] w-full sm:block">
          <motion.div style={{ y: networkY }} className="absolute inset-0">
            <NetworkSVG paths={networkPaths} width={REFERENCE_WIDTH} height={REFERENCE_HEIGHT} />
          </motion.div>

          <motion.div style={{ y: cardsY }} className="absolute inset-0">
            {floatingCards.map((card) => (
              <FloatingCard key={card.id} card={card} />
            ))}
            <CenterLogo position={centerCard}>{logoMark}</CenterLogo>
          </motion.div>
        </div>

        {/* Mobile: trunk + branches, its own layout entirely. */}
        <MobileNetworkLayout logo={logoMark} />
      </div>
    </section>
  );
}
