import type { NetworkPathData } from "./types";

interface StaticPathsProps {
  paths: NetworkPathData[];
}

/**
 * The permanent, always-visible connection lines. Every animated path in
 * AnimatedPaths.tsx has an identical twin here — this is what keeps a
 * faint line on screen even between animation pulses.
 */
export function StaticPaths({ paths }: StaticPathsProps) {
  return (
    <g aria-hidden="true">
      {paths.map((path) => (
        <path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
