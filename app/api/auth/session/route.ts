import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/session
 *
 * Returns the current authenticated user as JSON.
 * Useful for client-side code that needs to check auth state.
 *
 * Returns 200 with `{ user }` — `user` is `null` if not authenticated.
 */
export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({ user }, { status: 200 });
}
