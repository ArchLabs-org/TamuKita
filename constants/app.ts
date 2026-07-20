export const APP_NAME = "TamuKita";
export const APP_DESCRIPTION =
  "Platform undangan digital premium untuk hari spesial Anda. Kelola tamu, RSVP, dan undangan dalam satu platform elegan.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tamukita.id";
export const APP_TWITTER = "@tamukita";
export const APP_SUPPORT_EMAIL = "hello@tamukita.id";

export const GUEST_LIMIT = {
  free: 50,
  starter: 250,
  professional: 1000,
  enterprise: Infinity,
} as const;

export const WEDDING_LIMIT = {
  free: 1,
  starter: 3,
  professional: 10,
  enterprise: Infinity,
} as const;
