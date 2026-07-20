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
        "[TamuKita] NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diset di .env.local",
      );
    }
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
