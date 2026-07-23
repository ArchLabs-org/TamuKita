"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ParallaxContainerProps {
  speed?: number; // e.g. -0.15 for 15% upward speed
  children: React.ReactNode;
  className?: string;
}

export function ParallaxContainer({ speed = -0.15, children, className }: ParallaxContainerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
