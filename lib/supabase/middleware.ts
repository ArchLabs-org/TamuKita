import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

/**
 * Refreshes the user's Supabase session on every request.
 *
 * Must be called from `middleware.ts`. Returns the updated response
 * and the authenticated user (or `null` if not signed in).
 *
 * IMPORTANT: The session cookie must be forwarded from the request
 * to the response so that the browser stays in sync.
 */
export async function updateSession(request: NextRequest): Promise<{
  response: NextResponse;
  user: Database["public"]["Tables"]["profiles"]["Row"] | null | unknown;
}> {
  // Start with a passthrough response — we will mutate its cookies below
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, pass through without auth checks
  if (!supabaseUrl || !supabaseAnonKey) {
    return { response: supabaseResponse, user: null };
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Step 1 — update the request cookies (for downstream middleware)
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        // Step 2 — rebuild the response so it carries the updated cookies
        supabaseResponse = NextResponse.next({ request });

        // Step 3 — write the cookies into the response
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: Do NOT write any logic between createServerClient and
  // auth.getUser(). A mistake here can cause hard-to-debug auth issues.
  //
  // auth.getUser() is the only method that actually validates the session
  // against Supabase servers. getSession() uses the JWT locally without
  // server-side validation and must NOT be used in middleware.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response: supabaseResponse, user: user ?? null };
}
