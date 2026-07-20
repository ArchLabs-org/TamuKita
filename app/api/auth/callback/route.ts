import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/callback
 *
 * Handles the OAuth and Magic Link callback from Supabase.
 * Exchanges the `code` search parameter for a user session,
 * then redirects to the intended destination.
 *
 * Supabase calls this URL after:
 *  - Email confirmation on sign-up
 *  - OAuth provider sign-in (Google, etc.)
 *  - Password reset emails
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  // Prevent open redirect — only allow relative paths
  const redirectTo = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();

    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }

      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
    }
  }

  // Something went wrong — redirect to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
