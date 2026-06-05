"use client";

import { useEffect, useRef } from "react";
import { LAYOUT } from "../constants";

export function useScrollParallax() {
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (leftRef.current) {
          leftRef.current.style.transform = `translateY(${y * LAYOUT.PARALLAX_LEFT}px)`;
        }
        if (centerRef.current) {
          centerRef.current.style.transform = `translateY(${y * LAYOUT.PARALLAX_CENTER}px)`;
        }
        if (rightRef.current) {
          rightRef.current.style.transform = `translateY(${y * LAYOUT.PARALLAX_RIGHT}px)`;
        }
        rafId.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { leftRef, centerRef, rightRef };
}
