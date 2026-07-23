"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
}

export function FloatingBotanicals() {
  const prefersReducedMotion = useReducedMotion();

  // Generate 8 drifting golden leaves and flower petals
  const petals = React.useMemo<Petal[]>(() => {
    const colors = ["#D4AF37", "#E6C687", "#F3E3B6", "#A88322"];
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: 5 + i * 12,
      size: 16 + (i % 4) * 8,
      duration: 12 + i * 2,
      delay: i * 1.5,
      rotation: i * 45,
      color: colors[i % colors.length],
    }));
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: "-10vh",
            x: `${p.left}vw`,
            opacity: 0,
            rotate: p.rotation,
          }}
          animate={{
            y: "110vh",
            x: [`${p.left}vw`, `${p.left + 8}vw`, `${p.left - 5}vw`, `${p.left + 4}vw`],
            opacity: [0, 0.7, 0.7, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute"
        >
          {/* Golden Flower Petal SVG */}
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: p.color }}
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] filter"
          >
            <path
              d="M12 2 C18 6, 22 14, 16 20 C10 24, 4 18, 2 12 C4 4, 8 2, 12 2 Z"
              fill="currentColor"
              fillOpacity="0.65"
            />
            <path d="M12 2 Q14 10 16 20" stroke="#FFF" strokeWidth="0.75" strokeOpacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
