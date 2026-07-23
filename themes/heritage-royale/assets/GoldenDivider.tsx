"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { heritageColors } from "../config/theme-colors";

interface GoldenDividerProps {
  className?: string;
  color?: string;
}

export function GoldenDivider({
  className = "",
  color = heritageColors.champagne[500],
}: GoldenDividerProps) {
  return (
    <div className={`my-8 flex items-center justify-center ${className}`}>
      <svg
        width="280"
        height="24"
        viewBox="0 0 280 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M0 12 H110 M170 12 H280 M140 2 L150 12 L140 22 L130 12 Z M120 12 A 2 2 0 1 1 116 12 A 2 2 0 1 1 120 12 Z M164 12 A 2 2 0 1 1 160 12 A 2 2 0 1 1 164 12 Z"
          stroke={color}
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
