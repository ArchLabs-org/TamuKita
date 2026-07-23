/**
 * Heritage Royale — Color Token System
 * Inspired by Imperial Emerald, Champagne Gold, and Alabaster Linen
 */

export const heritageColors = {
  // Backgrounds
  emerald: {
    950: "#0B2B22", // Background Primary Dark (Imperial Emerald)
    900: "#123C30", // Surface Secondary Dark
    800: "#1B4D3F", // Surface Highlight Dark
  },
  champagne: {
    300: "#F3E3B6", // Accent Gold Very Light
    400: "#E6C687", // Accent Gold Light
    500: "#D4AF37", // Accent Gold Base
    600: "#A88322", // Accent Gold Dark
    700: "#7A5E16", // Accent Gold Deep
  },
  linen: {
    100: "#FBF9F5", // Background Primary Light (Alabaster Linen)
    200: "#F3EFE6", // Surface Secondary Light
    300: "#E8E2D3", // Surface Border Light
  },
  obsidian: {
    950: "#0B131F", // Footer & Deep Monolith Surfaces
    900: "#121816", // Primary Text Light
    500: "#5C6A65", // Muted Text Light
  },
  overlay: {
    dark: "rgba(11, 43, 34, 0.85)", // Modal Dimmer Backdrop
    glass: "rgba(251, 249, 245, 0.75)", // Glassmorphism Surface
    goldGlow: "rgba(212, 175, 55, 0.25)",
  },
} as const;

export type HeritageColors = typeof heritageColors;
