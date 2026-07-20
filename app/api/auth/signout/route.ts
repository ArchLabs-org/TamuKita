import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

/**
 * POST /api/auth/signout
 *
 * Signs out the current user and redirects to the home page.
 * Call from a `<form>` with method="POST" or via fetch.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}${ROUTES.home}`, { status: 302 });
}
