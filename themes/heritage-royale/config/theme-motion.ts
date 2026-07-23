import type { Variants, Transition } from "framer-motion";

/**
 * Heritage Royale — Apple-Grade Motion Curves & Transition Specifications
 */

export const heritageEasings = {
  apple: [0.16, 1, 0.3, 1] as const, // Spring-like fluid deceleration
  outExpo: [0.19, 1, 0.22, 1] as const, // Quick entrance deceleration
  smoothInOut: [0.65, 0, 0.35, 1] as const, // Continuous loop oscillation
};

export const heritageDurations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  hero: 1.2,
};

export const heritageTransitions = {
  default: {
    duration: heritageDurations.normal,
    ease: heritageEasings.apple,
  } as Transition,
  hero: {
    duration: heritageDurations.hero,
    ease: heritageEasings.apple,
  } as Transition,
  slow: {
    duration: heritageDurations.slow,
    ease: heritageEasings.outExpo,
  } as Transition,
};

export const heritageVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: heritageTransitions.default,
    },
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: heritageTransitions.default,
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  envelopeUnfold: {
    sealed: { rotateX: 0, opacity: 1 },
    unfolding: {
      rotateX: -180,
      opacity: 0,
      transition: heritageTransitions.hero,
    },
  },
  shimmerPulse: {
    animate: {
      boxShadow: [
        "0px 0px 12px rgba(212, 175, 55, 0.2)",
        "0px 0px 24px rgba(212, 175, 55, 0.5)",
        "0px 0px 12px rgba(212, 175, 55, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: heritageEasings.smoothInOut,
      },
    },
  },
};
