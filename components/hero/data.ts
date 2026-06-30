import {
  PanelTop,
  Copy,
  MessageSquareShare,
  UserSearch,
} from "lucide-react";
import { LinkedinIcon } from "./LinkedinIcon";
import type { FloatingCardData, NetworkPathData } from "./types";

/**
 * Card geometry below is authored against the same 734x405 reference frame
 * as the SVG paths in `networkPaths`, then converted to percentages.
 * Keeping both in one coordinate space is what keeps the lines glued to
 * the card edges as the section scales across breakpoints.
 */
export const floatingCards: FloatingCardData[] = [
  {
    id: "company-page-visitors",
    label: "KNOWLEDGE GRAPH",
    icon: PanelTop,
    left: (292 / 734) * 100,
    top: (25 / 405) * 100,
    width: (150 / 734) * 100,
    delay: 0.1,
  },
  {
    id: "linkedin-followers",
    label: "Resource Graph",
    icon: LinkedinIcon,
    left: (140 / 734) * 100,
    top: (78 / 405) * 100,
    width: (165 / 734) * 100,
    delay: 0.25,
  },
  {
    id: "post-engagers",
    label: "Learning Intelligence",
    icon: Copy,
    left: (429 / 734) * 100,
    top: (78 / 405) * 100,
    width: (165 / 734) * 100,
    delay: 0.25,
  },
  {
    id: "post-commenters",
    label: "Student Graph",
    icon: MessageSquareShare,
    left: (40 / 734) * 100,
    top: (178 / 405) * 100,
    width: (175 / 734) * 100,
    delay: 0.4,
  },
  {
    id: "post-visitors",
    label: "Memory Graph",
    icon: UserSearch,
    left: (519 / 734) * 100,
    top: (178 / 405) * 100,
    width: (175 / 734) * 100,
    delay: 0.4,
  },
];

/** Where the network funnels into, at the top edge of the center card. */
export const centerCard = {
  left: (267 / 734) * 100,
  top: (345 / 405) * 100,
  width: (200 / 734) * 100,
};

/**
 * Five lines, five distinct entry points along the center card's top edge.
 * Center card straight down, the two mid cards bend from a diagonal into
 * a vertical, the two outer cards run a flat L-shape into a vertical.
 * This mirrors the funnel pattern in the reference exactly.
 *
 * All five share `delay: 0` on purpose — every line starts and arrives at
 * the center card in the same instant, like a single synchronized pulse,
 * rather than packets racing in one after another.
 */
export const networkPaths: NetworkPathData[] = [
  {
    id: "company-page-visitors",
    d: "M367,61 L367,345",
    delay: 0,
    dots: [{ id: "cpv-mid", cx: 367, cy: 210, delay: 0 }],
  },
  {
    id: "linkedin-followers",
    d: "M305,114 L327,150 L327,345",
    delay: 0,
    dots: [
      { id: "li-diag", cx: 316, cy: 132, delay: 0.2 },
      { id: "li-bend", cx: 327, cy: 150, delay: 0.4 },
    ],
  },
  {
    id: "post-engagers",
    d: "M429,114 L407,150 L407,345",
    delay: 0,
    dots: [
      { id: "pe-diag", cx: 418, cy: 132, delay: 0.2 },
      { id: "pe-bend", cx: 407, cy: 150, delay: 0.4 },
    ],
  },
  {
    id: "post-commenters",
    d: "M215,196 L297,196 L297,345",
    delay: 0,
    dots: [
      { id: "pc-mid", cx: 256, cy: 196, delay: 0.2 },
      { id: "pc-bend", cx: 297, cy: 196, delay: 0.4 },
    ],
  },
  {
    id: "post-visitors",
    d: "M519,196 L437,196 L437,345",
    delay: 0,
    dots: [
      { id: "pv-mid", cx: 478, cy: 196, delay: 0.2 },
      { id: "pv-bend", cx: 437, cy: 196, delay: 0.4 },
    ],
  },
];

/**
 * Mobile reference frame (433x320). The reference site doesn't scale the
 * desktop funnel down on mobile — it switches to a single vertical trunk
 * with two horizontal cross-connectors, one per row of side cards. Cards
 * sit in a 1 / 2 / 2 grid: Company Page Visitors on its own row, then
 * LinkedIn Followers + Post Engagers, then Post Commenters + Post Visitors.
 */
export const mobileFloatingCards: FloatingCardData[] = [
  {
    id: "company-page-visitors",
    label: "KNOWLEDGE GRAPH",
    icon: PanelTop,
    left: (126 / 433) * 100,
    top: (5 / 320) * 100,
    width: (180 / 433) * 100,
    delay: 0.1,
  },
  {
    id: "linkedin-followers",
       label: "Resource Graph",
    icon: LinkedinIcon,
    left: (56 / 433) * 100,
    top: (64 / 320) * 100,
    width: (150 / 433) * 100,
    delay: 0.25,
  },
  {
    id: "post-engagers",
    label: "Learning Intelligence",
    icon: Copy,
    left: (227 / 433) * 100,
    top: (64 / 320) * 100,
    width: (150 / 433) * 100,
    delay: 0.25,
  },
  {
    id: "post-commenters",
  label: "Student Graph",
    icon: MessageSquareShare,
    left: (56 / 433) * 100,
    top: (132 / 320) * 100,
    width: (150 / 433) * 100,
    delay: 0.4,
  },
  {
    id: "post-visitors",
    label: "Memory Graph",
    icon: UserSearch,
    left: (227 / 433) * 100,
    top: (132 / 320) * 100,
    width: (150 / 433) * 100,
    delay: 0.4,
  },
];

export const mobileCenterCard = {
  left: (161 / 433) * 100,
  top: (190 / 320) * 100,
  width: (110 / 433) * 100,
};

/**
 * One line per card, same principle as desktop — each card keeps its own
 * identity all the way to the center card instead of merging into a
 * shared trunk. Routing in two phases so nothing crosses a card box:
 *  1. Row-2 cards (LinkedIn/Engagers) drop diagonally into the ~21px gap
 *     between the left/right card columns (x 206–227), the only clear
 *     vertical corridor, and travel straight down through it past row 3.
 *  2. Below row 3 (y 164–190) is fully open, so every line fans out
 *     there to its own distinct entry point along the center card's top
 *     edge — this is the little fan/bundle you see just above the card.
 * All five share `delay: 0`, same as desktop — one synchronized pulse.
 */
export const mobileNetworkPaths: NetworkPathData[] = [
  {
    id: "company-page-visitors",
    d: "M216,37 L216,190",
    delay: 0,
    dots: [{ id: "cpv-mid", cx: 216, cy: 110, delay: 0 }],
  },
  {
    id: "linkedin-followers",
    d: "M131,96 L210,132 L210,164 L197,190",
    delay: 0,
    dots: [
      { id: "li-diag", cx: 170, cy: 114, delay: 0.15 },
      { id: "li-corridor", cx: 210, cy: 148, delay: 0.3 },
    ],
  },
  {
    id: "post-engagers",
    d: "M302,96 L223,132 L223,164 L235,190",
    delay: 0,
    dots: [
      { id: "pe-diag", cx: 262, cy: 114, delay: 0.15 },
      { id: "pe-corridor", cx: 223, cy: 148, delay: 0.3 },
    ],
  },
  {
    id: "post-commenters",
    d: "M131,164 L178,190",
    delay: 0,
    dots: [{ id: "pc-mid", cx: 154, cy: 177, delay: 0.2 }],
  },
  {
    id: "post-visitors",
    d: "M302,164 L254,190",
    delay: 0,
    dots: [{ id: "pv-mid", cx: 278, cy: 177, delay: 0.2 }],
  },
];