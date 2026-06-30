import { StaticPaths } from "./StaticPaths";
import { AnimatedPaths } from "./AnimatedPaths";
import type { NetworkPathData } from "./types";

interface NetworkSVGProps {
  paths: NetworkPathData[];
  width: number;
  height: number;
  className?: string;
}

/**
 * Reusable connection-network SVG. Takes its viewBox dimensions and path
 * data as props so the same component renders both the desktop funnel
 * and the mobile trunk-and-branches layout — just point it at a
 * different (paths, width, height) triple from data.ts.
 */
export function NetworkSVG({ paths, width, height, className }: NetworkSVGProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <StaticPaths paths={paths} />
      <AnimatedPaths paths={paths} />
    </svg>
  );
}