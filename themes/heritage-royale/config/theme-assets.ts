/**
 * Heritage Royale — Vector Assets & Filigree Path References
 */

export const heritageAssets = {
  // SVG Gunungan & Filigree Decorative Vectors
  gununganPath:
    "M12 2L3 20h18L12 2zm0 4.5l5.5 11.5h-11L12 6.5zM12 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z",
  diamondDividerPath: "M0 10h100M120 10l10-10 10 10-10 10-10-10zm40 0h100",
  waxSealCrest:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z",

  // Default audio track URL fallback
  defaultAudioUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-113331.mp3",
} as const;

export type HeritageAssets = typeof heritageAssets;
