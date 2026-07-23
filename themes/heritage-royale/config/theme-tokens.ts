/**
 * Heritage Royale — Layout, Spacing, Radius, Shadow & Blur Tokens
 */

export const heritageTokens = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px",
    "5xl": "96px",
    "6xl": "128px",
    "7xl": "160px",
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    full: "9999px",
  },
  shadow: {
    sm: "0px 2px 8px -2px rgba(11, 43, 34, 0.06)",
    md: "0px 8px 24px -4px rgba(11, 43, 34, 0.10)",
    lg: "0px 16px 40px -8px rgba(11, 43, 34, 0.16)",
    gold: "0px 12px 32px 0px rgba(212, 175, 55, 0.25)",
    inner: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
  },
  blur: {
    sm: "blur(4px)",
    md: "blur(12px)",
    lg: "blur(24px)",
    xl: "blur(40px)",
  },
  zIndex: {
    background: 0,
    canvas: 10,
    decorations: 20,
    stickyNav: 30,
    modal: 40,
    toast: 50,
  },
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },
  container: {
    narrow: "680px",
    standard: "960px",
    wide: "1140px",
    full: "1320px",
  },
} as const;

export type HeritageTokens = typeof heritageTokens;
