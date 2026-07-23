"use client";

import * as React from "react";
import { heritageColors } from "../config/theme-colors";

interface CornerBotanicalProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function CornerBotanical({ position = "top-left", className = "" }: CornerBotanicalProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div
      className={`pointer-events-none absolute z-20 w-28 opacity-80 sm:w-44 md:w-56 ${positionClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full text-amber-500/70"
      >
        <path
          d="M10 10 Q 90 20 180 100 Q 190 150 195 195 M10 10 Q 20 90 100 180 Q 150 190 195 195"
          stroke={heritageColors.champagne[500]}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="40" r="4" fill={heritageColors.champagne[400]} />
        <circle cx="80" cy="70" r="3" fill={heritageColors.champagne[400]} />
        <circle cx="120" cy="120" r="5" fill={heritageColors.champagne[400]} />
        <path
          d="M30 30 Q 60 40 70 80 M70 80 Q 100 110 140 140"
          stroke={heritageColors.champagne[400]}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
