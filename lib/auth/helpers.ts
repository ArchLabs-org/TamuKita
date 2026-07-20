import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Returns the currently authenticated Supabase user, or `null`.
 *
 * Uses `auth.getUser()` which validates the session server-side.
 * Safe to call from Server Components and Route Handlers.
 */
export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return user;
}

/**
 * Returns the current session, or `null`.
 *
 * Prefer `getUser()` for security-sensitive checks.
 * Sessions are validated locally without a server round-trip.
 */
export async function getSession() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) return null;

  return session;
}

/**
 * Returns the `profiles` row for the currently authenticated user.
 * Returns `null` if not authenticated or profile does not exist.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("[auth] getUserProfile error:", error.message);
    return null;
  }

  return data;
}

/**
 * Asserts that a user is authenticated.
 * Redirects to /login if not — for use in protected Server Components.
 *
 * @example
 * const user = await requireAuth();
 * // user is guaranteed to be defined here
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect(ROUTES.login);
  }
  return user;
}

/**
 * Asserts that no user is authenticated.
 * Redirects to /dashboard if already signed in — for use in auth pages.
 */
export async function requireGuest() {
  const user = await getUser();
  if (user) {
    redirect(ROUTES.dashboard);
  }
}
