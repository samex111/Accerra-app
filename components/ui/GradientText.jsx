import React from "react";
import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
  gradient = "linear-gradient(135deg, #5B8CFF, #8BE28B, #A68CFF)",
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent transition-all duration-300",
        className,
      )}
      style={{ backgroundImage: gradient, WebkitBackgroundClip: "text" }}
    >
      {children}
    </span>
  );
}
