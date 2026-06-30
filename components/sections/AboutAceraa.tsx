'use client';

import { useEffect, useState } from 'react';

// ─── SMJ: people, delegates, community ──────────────────────────────────────
const SMJ_IMAGES = [
  '/images/community.jpeg',
  '/images/smj-hero-6.jpeg',
  '/images/community-2.jpeg',
  '/images/smj-hero-9.jpeg',
];

// ─── MUN: institutional, formal, legacy ─────────────────────────────────────
const MUN_IMAGE = '/images/tree-colour-5.png';

const INTERVAL_MS = 1000;
const FADE_MS = 800;

// ─── SMJLetters: stacks all images, crossfades between them ─────────────────
function SMJLetters({ activeIndex }: { activeIndex: number }) {
  return (
    <span
      className="relative inline-block"
      style={{
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        overflow: 'visible',
      }}
      aria-label="SMJ"
    >
      {/* Stack all images; only active one is visible */}
      {SMJ_IMAGES.map((src, i) => (
        <span
          key={src}
          aria-hidden
          className="absolute inset-0"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: i === activeIndex ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            userSelect: 'none',
            filter: 'saturate(1.4) brightness(1.05)',
          }}
        >
          Ace
        </span>
      ))}
      {/* Render text for layout/sizing (invisible) */}
      <span style={{ visibility: 'hidden' }} aria-hidden>SMJ</span>
    </span>
  );
}

export default function AboutWordmark() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SMJ_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{ backgroundColor: 'transparent' }}
      className="relative w-full overflow-x-hidden"
    >
      {/* Top rule */}
      <div className="w-full h-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />

      {/* Section label */}
      {/* <div className="flex justify-center pt-16 md:pt-20">
        <span className="section-label">Who We Are</span>
      </div> */}

      {/* Wordmark */}
      <div className="flex flex-col items-center px-4 pt-8 pb-5 md:pt-10 md:pb-10">
        <div
          className="flex flex-row items-baseline"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 900,
            fontSize: 'clamp(42px, 19.5vw, 200px)',
            lineHeight: 1.35,
            letterSpacing: '0.1em',
            userSelect: 'none',
          }}
        >
          {/* SMJ — animated people imagery */}
          <SMJLetters activeIndex={activeIndex} />

          {/* MUN — static institutional imagery */}
          <span
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              backgroundImage: `url(${MUN_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              backgroundRepeat: 'no-repeat',
              filter: 'saturate(0.65) brightness(0.88) contrast(1.15)',
              display: 'inline-block',
            }}
          >
            raa
          </span>
        </div>

        {/* Editorial statement */}
        <p
          className="mt-8 text-center text-[#7A7A7A] text-sm tracking-[0.08em] max-w-md"
          style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
        >
          Shaping India&apos;s next generation of global leaders since 2023.
        </p>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-px mt-6" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
    </section>
  );
}
