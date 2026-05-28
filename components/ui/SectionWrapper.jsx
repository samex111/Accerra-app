import React from "react";
import { cn } from "@/lib/utils";

export function SectionWrapper({
  children,
  theme = "dark",
  className,
  id,
  noPadding = false,
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        !noPadding && "py-[100px] md:py-[140px]",
        theme === "dark"
          ? "bg-[#060810] text-white"
          : "bg-[#F5F5F3] text-[#111827]",
        className,
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {children}
      </div>
    </section>
  );
}
