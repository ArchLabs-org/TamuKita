"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Graceful degradation — app still renders without Supabase configured
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[TamuKita] Supabase environment variables not set. " +
          "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
      );
    }
    // Return a minimal stub so TypeScript is satisfied
    return null as unknown as ReturnType<typeof createBrowserClient<Database>>;
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  return client;
}
