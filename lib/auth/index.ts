/**
 * Barrel export for auth utilities.
 *
 * Server-side helpers (Server Components, Route Handlers):
 *   import { getUser, requireAuth } from "@/lib/auth/helpers";
 *
 * Server Actions (forms, mutations):
 *   import { signInWithPassword, signUp, signOut } from "@/lib/auth/actions";
 */

export { getUser, getSession, getUserProfile, requireAuth, requireGuest } from "./helpers";
export { signInWithPassword, signUp, signOut, resetPassword, updatePassword } from "./actions";
