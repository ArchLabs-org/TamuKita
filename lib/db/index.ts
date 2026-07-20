/**
 * Barrel export for all database query helpers.
 *
 * All functions are server-side only (use Supabase server client).
 * Import directly from sub-modules for better tree-shaking:
 *
 *   import { getProfileById } from "@/lib/db/profiles";
 *   import { getWeddingsByUserId } from "@/lib/db/weddings";
 *   import { getGuestsByWeddingId } from "@/lib/db/guests";
 */

export * from "./profiles";
export * from "./weddings";
export * from "./guests";
