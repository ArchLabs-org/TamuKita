"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Butterfly {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FlyingButterflies() {
  const prefersReducedMotion = useReducedMotion();

  // Generate 5 animated butterflies with different flight trajectories
  const butterflies = React.useMemo<Butterfly[]>(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      startX: -10 + i * 20,
      endX: 110 - i * 15,
      startY: 80 - i * 15,
      endY: -20 + i * 10,
      scale: 0.6 + (i % 3) * 0.2,
      duration: 14 + i * 3,
      delay: i * 2.5,
    }));
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          initial={{
            x: `${b.startX}vw`,
            y: `${b.startY}vh`,
            opacity: 0,
            scale: b.scale,
          }}
          animate={{
            x: [`${b.startX}vw`, `${(b.startX + b.endX) / 2}vw`, `${b.endX}vw`],
            y: [`${b.startY}vh`, `${(b.startY + b.endY) / 2}vh`, `${b.endY}vh`],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          {/* Butterfly Wing Flap Animation */}
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            animate={{
              scaleX: [1, 0.2, 1],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 0.35 + (b.id % 3) * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-amber-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          >
            {/* Left Wing */}
            <path
              d="M24 24 C14 8, 2 12, 4 28 C6 36, 18 32, 24 24 Z"
              fill="currentColor"
              fillOpacity="0.85"
            />
            <path
              d="M24 24 C16 28, 6 38, 12 44 C18 48, 22 36, 24 24 Z"
              fill="url(#butterfly-gold-grad)"
              fillOpacity="0.75"
            />
            {/* Right Wing */}
            <path
              d="M24 24 C34 8, 46 12, 44 28 C42 36, 30 32, 24 24 Z"
              fill="currentColor"
              fillOpacity="0.85"
            />
            <path
              d="M24 24 C32 28, 42 38, 36 44 C30 48, 26 36, 24 24 Z"
              fill="url(#butterfly-gold-grad)"
              fillOpacity="0.75"
            />
            {/* Body */}
            <ellipse cx="24" cy="24" rx="1.5" ry="10" fill="#7A5E16" />
            <defs>
              <linearGradient id="butterfly-gold-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
