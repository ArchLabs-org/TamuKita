import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase admin client using the Service Role key.
 *
 * ⚠️  ONLY use this in server-side code (Route Handlers, Server Actions,
 *     scripts). NEVER expose the service role key to the browser.
 *
 * The admin client bypasses Row Level Security — use with caution.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "[TamuKita] Admin client requires NEXT_PUBLIC_SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      // Disable auto session refresh — the admin client is stateless
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
