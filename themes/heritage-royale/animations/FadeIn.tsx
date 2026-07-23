"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: boolean;
  children: React.ReactNode;
}

/**
 * Ultra-smooth Apple/Linear grade reveal animation wrapper with subtle scaling, spring inertia, and blur transition.
 */
export function FadeIn({
  delay = 0,
  direction = "up",
  distance = 40,
  scale = true,
  children,
  className,
  ...props
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(6px)",
        scale: scale ? 0.94 : 1,
        ...directionOffsets[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple spring curve
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
