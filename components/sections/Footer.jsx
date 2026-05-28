"use client";

import React, { useRef } from "react";
import ParticleBackground from "@/components/ui/PartialBg";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const NAV_1 = [
  "Vision",
  "Research",
  "Features",
  "About",
];

const NAV_2 = [
  "Privacy",
  "Terms",
  "Contact",
];

const ease = [0.22, 1, 0.36, 1];

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function Footer() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    [120, -60]
  );

  return (
<footer
  ref={sectionRef}
  className="
    relative
    w-full
    overflow-hidden
    
pt-40
     
  " style={{
  background: `
    linear-gradient(
      180deg,
      #f8fafc 0%,
      #eef2ff 45%,
      #e2e8f0 100%
    )
  `
}}
>{/* Top atmospheric transition */}
<div
  className="
    absolute
    top-0
    left-0
    w-full
    h-[220px]
    overflow-hidden
    pointer-events-none
    z-[20]
  "
>
  {/* Dark fade */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(
          to bottom,
          #020617 0%,
          rgba(2,6,23,0.96) 15%,
          rgba(15,23,42,0.82) 35%,
          rgba(15,23,42,0.35) 65%,
          transparent 100%
        )
      `,
    }}
  />

  {/* Soft cinematic blue */}
  <div
    className="
      absolute
      left-1/2
      top-[40px]
      -translate-x-1/2
      w-[90%]
      h-[120px]
    "
    style={{
      background: `
        radial-gradient(
          ellipse at center,
          rgba(59,130,246,0.22) 0%,
          rgba(59,130,246,0.08) 45%,
          transparent 80%
        )
      `,
      filter: "blur(70px)",
    }}
  />
</div>
{/* Cinematic atmospheric transition */}
<div
  className="
    absolute
    top-0
    left-0
    w-full
    h-[320px]
    overflow-hidden
    pointer-events-none
    z-[30]
  "
>
  {/* Deep black fade */}
  <div
    className="
      absolute
      inset-0
    "
    style={{
      background: `
        linear-gradient(
          to bottom,
          rgba(2,6,23,1) 0%,
          rgba(2,6,23,0.96) 12%,
          rgba(15,23,42,0.82) 28%,
          rgba(30,41,59,0.48) 52%,
          rgba(59,130,246,0.12) 76%,
          transparent 100%
        )
      `,
    }}
  />

  {/* Main cinematic blue glow */}
  <div
    className="
      absolute
      top-[30px]
      left-1/2
      -translate-x-1/2
      w-[140%]
      h-[220px]
      opacity-90
    "
    style={{
      background: `
        radial-gradient(
          ellipse at center,
          rgba(96,165,250,0.42) 0%,
          rgba(59,130,246,0.22) 38%,
          rgba(37,99,235,0.08) 58%,
          transparent 78%
        )
      `,
      filter: "blur(90px)",
    }}
  />

  {/* Secondary soft light */}
  <div
    className="
      absolute
      top-[90px]
      left-1/2
      -translate-x-1/2
      w-[110%]
      h-[140px]
      opacity-70
    "
    style={{
      background: `
        radial-gradient(
          ellipse at center,
          rgba(255,255,255,0.22) 0%,
          transparent 72%
        )
      `,
      filter: "blur(70px)",
    }}
  />

  {/* Subtle blue edge diffusion */}
  <div
    className="
      absolute
      bottom-0
      left-0
      w-full
      h-[120px]
    "
    style={{
      background: `
        linear-gradient(
          to bottom,
          transparent,
          rgba(96,165,250,0.12)
        )
      `,
      filter: "blur(40px)",
    }}
  />
</div>
      {/* ===================================================== */}
      {/* GRAIN */}
      {/* ===================================================== */}

  <div
  className="
    relative
    flex
    justify-center
    items-end
    whitespace-nowrap
    select-none
  "
  style={{
    marginLeft: "-0.05em",
    transform: "translateY(-18%)",
    filter: "blur(0.2px)"
  }}
>
  {/* A */}

  <span
    className="font-cormorant-garamond leading-none"
    style={{
      fontSize: "clamp(180px, 27vw, 520px)",
      lineHeight: 0.8,
      letterSpacing: "-0.08em",

      background: `
        linear-gradient(
          135deg,
          #2563eb 0%,
          #60a5fa 30%,
          #bfdbfe 65%,
          #2563eb 100%
        )
      `,

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    A
  </span>

  {/* cc */}

  <span
    className="
      font-cormorant-garamond
      italic
      leading-none
    "
    style={{
      fontSize: "clamp(165px, 22vw, 430px)",
      lineHeight: 0.9,

      letterSpacing: "-0.12em",

      marginLeft: "-0.16em",
      marginRight: "0.01em",

      background: `
        linear-gradient(
          135deg,
          #2563eb 0%,
          #60a5fa 45%,
          #dbeafe 100%
        )
      `,

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    cc
  </span>

  {/* erra */}

  <span
    className="font-light leading-none"
    style={{
      fontSize: "clamp(180px, 27vw, 520px)",
      lineHeight: 0.8,

      letterSpacing: "-0.1em",

      background: `
        linear-gradient(
          135deg,
          #dbeafe 0%,
          #93c5fd 40%,
          #3b82f6 100%
        )
      `,

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    erra
  </span>

  {/* Grain Overlay */}

  <div
    className="
      absolute
      inset-0
      opacity-[0.18]
      pointer-events-none
      mix-blend-overlay
    "
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />
</div>

      {/* ===================================================== */}
      {/* BLUE CINEMATIC BOTTOM */}
      {/* ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          pt-24
          pb-14
        "
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 30%),
            linear-gradient(
              180deg,
              #60a5fa 0%,
              #3b82f6 30%,
              #2563eb 100%
            )
          `,
        }}
      >
        {/* Floating particles */}

       <ParticleBackground />

        {/* glow overlay */}

        <div
          className="
            absolute
            inset-0
            opacity-60
          "
          style={{
            background: `
              radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 50%)
            `,
          }}
        />

        {/* content */}

        <div
          className="
            relative
            z-10
            max-w-[1400px]
            mx-auto
            px-6
            md:px-12
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-16
            "
          >
            {/* left */}

            <div className="md:col-span-2">
              <p
                className="
                  text-white/90
                  text-xl
                  md:text-2xl
                  leading-relaxed
                  max-w-[480px]
                  font-light
                "
              >
                Built around how students
                actually think, focus,
                forget, recover, and learn.
              </p>
            </div>

            {/* nav 1 */}

            <div className="space-y-5">
              <h3
                className="
                  text-white/60
                  text-xs
                  uppercase
                  tracking-[0.22em]
                "
              >
                Navigation
              </h3>

              <div className="flex flex-col gap-3">
                {NAV_1.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="
                      text-white/85
                      hover:text-white
                      transition-colors
                      duration-300
                      text-sm
                    "
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* nav 2 */}

            <div className="space-y-5">
              <h3
                className="
                  text-white/60
                  text-xs
                  uppercase
                  tracking-[0.22em]
                "
              >
                Company
              </h3>

              <div className="flex flex-col gap-3">
                {NAV_2.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="
                      text-white/85
                      hover:text-white
                      transition-colors
                      duration-300
                      text-sm
                    "
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* divider */}

          <div
            className="
              mt-20
              mb-8
              w-full
              h-px
              bg-white/20
            "
          />

          {/* bottom */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-6
            "
          >
            <p
              className="
                text-white/70
                text-xs
                tracking-wide
              "
            >
              © 2026 Accerra Intelligence
              Systems
            </p>

            <div
              className="
                flex
                items-center
                gap-5
              "
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-white/80
                "
              />

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-white/60
                "
              />

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-white/40
                "
              />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}