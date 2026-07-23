"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function MultiLayerFloralCorners() {
  return (
    <>
      {/* ── TOP-LEFT MULTI-LAYER ANIMATED NAVY FLORAL CORNER ── */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 w-44 select-none overflow-visible sm:w-64 md:w-80">
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full drop-shadow-lg"
        >
          {/* Layer 1: Background Leaves (Deep Shadow Navy & Gentle Swaying) */}
          <motion.g
            animate={{ rotate: [-3, 2, -3], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M 10 10 Q 70 50 140 30 M 10 10 Q 50 70 30 140"
              stroke="#0D1B2A"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Extended Palm/Eucalyptus foliage */}
            <path
              d="M 40 30 C 25 5, 5 25, 30 45 C 55 65, 70 30, 40 30 Z"
              fill="#0D1B2A"
              fillOpacity="0.75"
            />
            <path
              d="M 60 20 C 50 -5, 30 15, 55 30 C 80 45, 90 15, 60 20 Z"
              fill="#15263A"
              fillOpacity="0.7"
            />
            <path
              d="M 20 60 C -5 50, 15 30, 30 55 C 45 80, 15 90, 20 60 Z"
              fill="#0D1B2A"
              fillOpacity="0.7"
            />
          </motion.g>

          {/* Layer 2: Main Floral Stems & Detailed Rose Petals (Middle Layer Sway) */}
          <motion.g
            animate={{ rotate: [1, -2, 1], translateY: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            style={{ transformOrigin: "0px 0px" }}
          >
            {/* Main Navy Rose 1 */}
            <g transform="translate(75, 65)">
              <circle cx="0" cy="0" r="22" fill="#1E3A5F" />
              <path d="M -15 -8 C -10 -20, 10 -20, 15 -8 C 20 5, -20 18, -15 -8 Z" fill="#2B4C7E" />
              <path d="M -10 -4 C -5 -14, 8 -14, 10 -4 C 14 5, -14 12, -10 -4 Z" fill="#3B5998" />
              <circle cx="0" cy="0" r="6" fill="#15263A" />
            </g>

            {/* Navy Rose 2 (Smaller companion) */}
            <g transform="translate(105, 45)">
              <circle cx="0" cy="0" r="15" fill="#2B4C7E" />
              <path d="M -10 -5 C -6 -14, 6 -14, 10 -5 C 13 4, -13 9, -10 -5 Z" fill="#3B5998" />
              <circle cx="0" cy="0" r="4" fill="#0D1B2A" />
            </g>

            {/* Peony / Secondary Blossom */}
            <g transform="translate(45, 95)">
              <circle cx="0" cy="0" r="16" fill="#1E3A5F" />
              <circle cx="-4" cy="-4" r="10" fill="#3B5998" opacity="0.8" />
              <circle cx="2" cy="2" r="6" fill="#4A6984" opacity="0.9" />
            </g>
          </motion.g>

          {/* Layer 3: Foreground Berries & Golden/Accent Petals (Fast Floating Dynamic Layer) */}
          <motion.g
            animate={{ rotate: [-2, 3, -2], translateX: [-2, 2, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            style={{ transformOrigin: "0px 0px" }}
          >
            {/* Elegant Berry Stems */}
            <path
              d="M 10 10 Q 100 80 160 85 M 10 10 Q 80 100 85 160"
              stroke="#4A6984"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="130" cy="55" r="5" fill="#1E3A5F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="150" cy="70" r="4" fill="#2B4C7E" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="165" cy="85" r="4.5" fill="#0D1B2A" stroke="#FFFFFF" strokeWidth="1" />

            <circle cx="55" cy="130" r="5" fill="#1E3A5F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="70" cy="150" r="4" fill="#2B4C7E" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="85" cy="165" r="4.5" fill="#0D1B2A" stroke="#FFFFFF" strokeWidth="1" />

            {/* Golden Sparkle Accent Petals */}
            <circle cx="115" cy="95" r="3" fill="#D4AF37" />
            <circle cx="95" cy="115" r="2.5" fill="#D4AF37" />
          </motion.g>
        </svg>
      </div>

      {/* ── TOP-RIGHT MULTI-LAYER ANIMATED NAVY FLORAL CORNER (MIRRORED) ── */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 w-44 select-none overflow-visible sm:w-64 md:w-80">
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full scale-x-[-1] drop-shadow-lg"
        >
          {/* Layer 1: Background Leaves */}
          <motion.g
            animate={{ rotate: [-3, 2, -3], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M 10 10 Q 70 50 140 30 M 10 10 Q 50 70 30 140"
              stroke="#0D1B2A"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 40 30 C 25 5, 5 25, 30 45 C 55 65, 70 30, 40 30 Z"
              fill="#0D1B2A"
              fillOpacity="0.75"
            />
            <path
              d="M 60 20 C 50 -5, 30 15, 55 30 C 80 45, 90 15, 60 20 Z"
              fill="#15263A"
              fillOpacity="0.7"
            />
            <path
              d="M 20 60 C -5 50, 15 30, 30 55 C 45 80, 15 90, 20 60 Z"
              fill="#0D1B2A"
              fillOpacity="0.7"
            />
          </motion.g>

          {/* Layer 2: Main Floral Stems & Detailed Rose Petals */}
          <motion.g
            animate={{ rotate: [1, -2, 1], translateY: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <g transform="translate(75, 65)">
              <circle cx="0" cy="0" r="22" fill="#1E3A5F" />
              <path d="M -15 -8 C -10 -20, 10 -20, 15 -8 C 20 5, -20 18, -15 -8 Z" fill="#2B4C7E" />
              <path d="M -10 -4 C -5 -14, 8 -14, 10 -4 C 14 5, -14 12, -10 -4 Z" fill="#3B5998" />
              <circle cx="0" cy="0" r="6" fill="#15263A" />
            </g>

            <g transform="translate(105, 45)">
              <circle cx="0" cy="0" r="15" fill="#2B4C7E" />
              <path d="M -10 -5 C -6 -14, 6 -14, 10 -5 C 13 4, -13 9, -10 -5 Z" fill="#3B5998" />
              <circle cx="0" cy="0" r="4" fill="#0D1B2A" />
            </g>

            <g transform="translate(45, 95)">
              <circle cx="0" cy="0" r="16" fill="#1E3A5F" />
              <circle cx="-4" cy="-4" r="10" fill="#3B5998" opacity="0.8" />
              <circle cx="2" cy="2" r="6" fill="#4A6984" opacity="0.9" />
            </g>
          </motion.g>

          {/* Layer 3: Foreground Berries & Accents */}
          <motion.g
            animate={{ rotate: [-2, 3, -2], translateX: [-2, 2, -2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M 10 10 Q 100 80 160 85 M 10 10 Q 80 100 85 160"
              stroke="#4A6984"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="130" cy="55" r="5" fill="#1E3A5F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="150" cy="70" r="4" fill="#2B4C7E" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="165" cy="85" r="4.5" fill="#0D1B2A" stroke="#FFFFFF" strokeWidth="1" />

            <circle cx="55" cy="130" r="5" fill="#1E3A5F" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="70" cy="150" r="4" fill="#2B4C7E" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="85" cy="165" r="4.5" fill="#0D1B2A" stroke="#FFFFFF" strokeWidth="1" />

            <circle cx="115" cy="95" r="3" fill="#D4AF37" />
            <circle cx="95" cy="115" r="2.5" fill="#D4AF37" />
          </motion.g>
        </svg>
      </div>
    </>
  );
}
