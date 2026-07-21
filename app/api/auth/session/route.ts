import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/session
 *
 * Returns the current authenticated user as JSON with plan.
 * Useful for client-side code that needs to check auth state and plan.
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

  // If user is authenticated, fetch their plan from profiles table
  if (user) {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

      if (profileData?.plan) {
        return NextResponse.json({ user: { ...user, plan: profileData.plan } }, { status: 200 });
      }
    } catch (err) {
      console.error("[session] Error fetching profile:", err);
    }
  }

  return NextResponse.json({ user }, { status: 200 });
}
