import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingOrb({
  color = "#5B8CFF",
  size = "600px",
  blur = "180px",
  position = "top-0 left-0",
  opacity = 0.2,
}) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none z-0 mix-blend-screen",
        position,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: "100%",
        background: color,
        filter: `blur(${blur})`,
        opacity: opacity,
      }}
    />
  );
}
