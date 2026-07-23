"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { heritageColors } from "../config/theme-colors";

interface GununganFiligreeProps {
  className?: string;
  size?: number;
  color?: string;
}

export function GununganFiligree({
  className = "",
  size = 64,
  color = heritageColors.champagne[500],
}: GununganFiligreeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M50 5 L15 110 L85 110 Z M50 20 L25 100 L75 100 Z M50 35 L35 90 L65 90 Z M50 50 A 8 8 0 1 0 50 66 A 8 8 0 1 0 50 50 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
