import type { SVGProps } from "react";

/**
 * lucide-react doesn't ship brand/logo icons. This is a minimal LinkedIn
 * glyph built to the same API shape (className, strokeWidth ignored) so
 * it drops into the `icon: LucideIcon`-shaped slot in data.ts without
 * special-casing it elsewhere.
 */
export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}
