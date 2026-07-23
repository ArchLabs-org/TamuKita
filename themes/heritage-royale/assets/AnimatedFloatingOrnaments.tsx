"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Animated Ambient Parallax Floral Leaves & Floating Petals Engine.
 * Adds slow floating movement, depth blur, and subtle parallax scrolling physics.
 */
export function AnimatedFloatingOrnaments() {
  const { scrollY } = useScroll();

  // Parallax physics with smooth springs
  const ySpring1 = useSpring(useTransform(scrollY, [0, 3000], [0, -150]), {
    stiffness: 40,
    damping: 20,
  });
  const ySpring2 = useSpring(useTransform(scrollY, [0, 3000], [0, 200]), {
    stiffness: 30,
    damping: 15,
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Floating Petal 1 - Top Left Drifter */}
      <motion.div
        style={{ y: ySpring1, top: "12%", left: "4%" }}
        animate={{
          x: [0, 15, -10, 0],
          rotate: [0, 25, -15, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-8 w-8 opacity-40 blur-[0.5px] sm:h-12 sm:w-12"
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 5 C 35 10, 35 30, 20 35 C 5 30, 5 10, 20 5 Z" fill="#1E3A5F" />
        </svg>
      </motion.div>

      {/* Floating Petal 2 - Mid Right Golden Shimmer Leaf */}
      <motion.div
        style={{ y: ySpring2, top: "45%", right: "3%" }}
        animate={{
          x: [0, -20, 15, 0],
          rotate: [0, -35, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute h-7 w-7 opacity-30 blur-[0.3px] sm:h-10 sm:w-10"
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 2 C 38 15, 25 38, 20 38 C 15 38, 2 15, 20 2 Z" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* Floating Petal 3 - Bottom Left Drifter */}
      <motion.div
        style={{ y: ySpring1, top: "78%", left: "6%" }}
        animate={{
          y: [0, -25, 10, 0],
          rotate: [0, 45, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute h-6 w-6 opacity-35 sm:h-9 sm:w-9"
      >
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="10" fill="#2B4C7E" />
          <circle cx="25" cy="15" r="4" fill="#D4AF37" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Floating Petal 4 - Top Center Soft Shimmer Sparkle */}
      <motion.div
        animate={{
          opacity: [0.2, 0.7, 0.2],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[50%] top-[25%] h-4 w-4 -translate-x-1/2"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
            fill="#D4AF37"
            opacity="0.6"
          />
        </svg>
      </motion.div>
    </div>
  );
}
