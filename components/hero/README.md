# Hero Network Section

Recreation of the animated connection-network hero (background photo →
SVG network → floating glass cards → center logo card), built from the
DevTools structure and breakpoint screenshots you sent over.

## Install

```bash
npm install framer-motion lucide-react
```

(Next.js, React, TypeScript, Tailwind assumed already in your project.)

## Usage

```tsx
import { HeroSection } from "@/components/hero-network";

export default function Page() {
  return (
    <HeroSection
      backgroundSrc="/hero-mountains.jpg" // drop your image in /public
      // logo={<YourLogoSvgOrImage />}    // optional, defaults to a placeholder mark
    />
  );
}
```

`backgroundSrc` is required — point it at whatever photo you're using (the
mountain landscape in the reference, or your own SMJMUN/Aceraa art). It's
rendered through `next/image`, so it needs to live in `/public` or be a
remote URL you've allowed in `next.config.js`.

## How the layout system works

Every floating card and every SVG path is authored against the same
734×405 coordinate space (`REFERENCE_WIDTH`/`REFERENCE_HEIGHT` in
`types.ts`). Card positions in `data.ts` are stored as percentages derived
from that space, and the SVG uses the matching `viewBox`. Because both
layers scale off the same aspect-ratio container (`aspect-[734/405]` in
`HeroSection.tsx`), the connection lines stay glued to the card edges at
any width — you never have to hand-tune breakpoints to keep them aligned.

To move a card, change its `left`/`top`/`width` (or the raw pixel values
feeding them) in `data.ts`, then update the matching path's entry point
in `networkPaths` to match. They're deliberately kept in the same file so
the two never drift apart.

## Files

| File | Role |
|---|---|
| `HeroSection.tsx` | Composes all five layers, owns scroll parallax, mobile/desktop split |
| `BackgroundLayer.tsx` | Photo + gradient + blur/desaturation |
| `NetworkSVG.tsx` | Combines the three SVG sub-layers below |
| `StaticPaths.tsx` | Permanent faint connection lines |
| `AnimatedPaths.tsx` | The traveling "packet" dash on top of each static line |
| `ConnectionDots.tsx` | Pulsing junction markers |
| `FloatingCard.tsx` | One glass pill (icon + label) — `compact` prop for the mobile grid |
| `CenterLogo.tsx` | The large glass square the network funnels into (takes `position` prop) |
| `MobileNetworkLayout.tsx` | Mobile's trunk + cross-connector layout |
| `data.ts` | All positions, icons, and path geometry in one place |
| `types.ts` | Shared types + the 734×405 reference constants |

## Notes on a few judgment calls

- **Mobile layout.** Built from your screenshots of the real mobile site:
  it doesn't scale the desktop funnel down, it switches to a single
  vertical trunk (`MobileNetworkLayout.tsx` + `mobileNetworkPaths` in
  `data.ts`) with two static horizontal cross-connectors, one per row of
  side cards. Cards sit in a 1 / 2 / 2 grid (Company Page Visitors alone
  on top, then the two pairs). `NetworkSVG` and `CenterLogo` are now
  parameterized (`paths`/`width`/`height`, and `position`) so the same
  components render both the desktop funnel and the mobile trunk —
  nothing's duplicated, just pointed at different data.
- **Synchronized flow.** All animated paths share `delay: 0` now, both
  desktop's five lines and mobile's trunk — they start and reach the
  center card together as one pulse, not staggered.
- **Icons.** Swapped in the closest `lucide-react` equivalents
  (`PanelTop`, `Copy`, `MessageSquareShare`, `UserSearch`) — none of the
  original icon glyphs are extractable from screenshots at usable
  fidelity, so these are close visual matches rather than exact pixel
  rips.
- **Background image.** No source image file came through, so
  `backgroundSrc` is a required prop rather than a hardcoded asset — wire
  up your own photo via `/public`.
- **Reduced motion.** All infinite loops (dash travel, dot pulse,
  center-card float) check `useReducedMotion()` and freeze on their final
  frame instead of animating, per `prefers-reduced-motion`.
- **Logo.** `CenterLogo` takes `children`, with a generic crossed-line
  placeholder mark as the default — swap in your actual SMJMUN/Aceraa
  mark via the `logo` prop rather than hardcoding a copy of the
  reference's logo.
