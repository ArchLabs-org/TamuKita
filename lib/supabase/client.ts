"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase client for use in Client Components.
 *
 * Singleton pattern — re-uses the same instance across renders
 * to avoid unnecessary re-initialisation.
 *
 * Returns `null` when environment variables are not configured so the
 * rest of the UI continues to render without Supabase.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[TamuKita] Supabase is not configured.\n" +
          "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
      );
    }
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
