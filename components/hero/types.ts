import type { ComponentType, SVGProps } from "react";

/**
 * A floating glass card ("LinkedIn Followers", "Post Engagers", etc).
 * Position is expressed as a percentage of the 734x405 reference frame,
 * so it lines up 1:1 with the SVG network underneath at any viewport size.
 */
export interface FloatingCardData {
  id: string;
  label: string;
  /** Accepts lucide-react icons as well as plain SVG components (e.g. LinkedinIcon). */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** left/top/width as % of the section's reference frame (734x405) */
  left: number;
  top: number;
  width: number;
  /** stagger delay (seconds) for the entrance animation */
  delay: number;
}

/**
 * A single connection from a floating card into the center logo card.
 * `d` is authored directly in the viewBox coordinate space.
 */
export interface NetworkPathData {
  id: string;
  d: string;
  /** delay (seconds) before the flowing "packet" animation starts. All
   *  paths that should arrive together must share the same delay. */
  delay: number;
  /** set false for a purely static connector (no traveling dash) — used
   *  by the mobile cross-connectors, which don't carry their own flow. */
  animated?: boolean;
  /** points (in viewBox space) where a pulsing connection dot should sit */
  dots: { id: string; cx: number; cy: number; delay: number }[];
}

export const REFERENCE_WIDTH = 734;
export const REFERENCE_HEIGHT = 405;

/** Mobile uses its own simpler trunk-and-branches layout (see data.ts),
 *  authored in its own coordinate space rather than a scaled-down 734x405. */
export const MOBILE_REFERENCE_WIDTH = 433;
export const MOBILE_REFERENCE_HEIGHT = 320;
