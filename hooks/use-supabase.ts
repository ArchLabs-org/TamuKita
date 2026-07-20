"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Returns a stable reference to the Supabase browser client.
 * Returns `null` when the client is not configured (env vars missing).
 *
 * @example
 * const supabase = useSupabase();
 * if (!supabase) return null;
 *
 * const { data } = await supabase.from("weddings").select("*");
 */
export function useSupabase(): SupabaseClient<Database> | null {
  const client = React.useMemo(() => createClient(), []);
  return client;
}
