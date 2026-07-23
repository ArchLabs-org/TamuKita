"use client";

import * as React from "react";
import { motion } from "framer-motion";

type FloralVariant = "left" | "right" | "center";

interface SectionFloralDividerProps {
  variant?: FloralVariant;
  className?: string;
}

/**
 * Perfectly centered, robust SVG Floral Divider.
 */
export function SectionFloralDivider({ className = "" }: SectionFloralDividerProps) {
  return (
    <div
      className={`pointer-events-none relative flex w-full items-center justify-center overflow-hidden py-4 ${className}`}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 360 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }}
        className="w-72 sm:w-96"
      >
        {/* Perfectly Symmetrical Stem Lines */}
        <path
          d="M 20 40 H 150 M 210 40 H 340"
          stroke="#1E3A5F"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Center Jewel / Diamond Ornament (Exactly at X=180) */}
        <g transform="translate(180, 40)">
          <path d="M 0 -12 L 10 0 L 0 12 L -10 0 Z" fill="#1E3A5F" opacity="0.85" />
          <circle cx="0" cy="0" r="3" fill="#D4AF37" />
          <circle cx="-16" cy="0" r="2.5" fill="#1E3A5F" opacity="0.6" />
          <circle cx="16" cy="0" r="2.5" fill="#1E3A5F" opacity="0.6" />
        </g>

        {/* LEFT FLORAL CLUSTER (Center at X=70) */}
        <g transform="translate(70, 40)">
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M -25 -5 C -40 -20, -10 -30, -5 -15 Z" fill="#0D1B2A" fillOpacity="0.75" />
            <path d="M -25 5 C -40 20, -10 30, -5 15 Z" fill="#0D1B2A" fillOpacity="0.75" />
            <path d="M 15 -15 C 30 -30, 40 -10, 20 -5 Z" fill="#15263A" fillOpacity="0.7" />
            <path d="M 15 15 C 30 30, 40 10, 20 5 Z" fill="#15263A" fillOpacity="0.7" />
          </motion.g>

          <circle cx="0" cy="0" r="14" fill="#1E3A5F" />
          <path d="M -10 -4 C -6 -12, 6 -12, 10 -4 C 13 4, -13 8, -10 -4 Z" fill="#2B4C7E" />
          <circle cx="0" cy="0" r="4" fill="#D4AF37" />

          <circle cx="-28" cy="-14" r="3" fill="#1E3A5F" />
          <circle cx="-28" cy="14" r="3" fill="#1E3A5F" />
          <circle cx="28" cy="-14" r="2.5" fill="#4A6984" />
          <circle cx="28" cy="14" r="2.5" fill="#4A6984" />
        </g>

        {/* RIGHT FLORAL CLUSTER (Center at X=290) */}
        <g transform="translate(290, 40)">
          <motion.g
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <path d="M 25 -5 C 40 -20, 10 -30, 5 -15 Z" fill="#0D1B2A" fillOpacity="0.75" />
            <path d="M 25 5 C 40 20, 10 30, 5 15 Z" fill="#0D1B2A" fillOpacity="0.75" />
            <path d="M -15 -15 C -30 -30, -40 -10, -20 -5 Z" fill="#15263A" fillOpacity="0.7" />
            <path d="M -15 15 C -30 30, -40 10, -20 5 Z" fill="#15263A" fillOpacity="0.7" />
          </motion.g>

          <circle cx="0" cy="0" r="14" fill="#1E3A5F" />
          <path d="M -10 -4 C -6 -12, 6 -12, 10 -4 C 13 4, -13 8, -10 -4 Z" fill="#2B4C7E" />
          <circle cx="0" cy="0" r="4" fill="#D4AF37" />

          <circle cx="28" cy="-14" r="3" fill="#1E3A5F" />
          <circle cx="28" cy="14" r="3" fill="#1E3A5F" />
          <circle cx="-28" cy="-14" r="2.5" fill="#4A6984" />
          <circle cx="-28" cy="14" r="2.5" fill="#4A6984" />
        </g>
      </motion.svg>
    </div>
  );
}
