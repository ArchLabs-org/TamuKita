import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { ROUTES, AUTH_ROUTES, PROTECTED_ROUTES } from "@/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const result = await updateSession(request);

  // If Supabase is not configured, pass through
  if (!("user" in result)) {
    return result as NextResponse;
  }

  const { response, user } = result as { response: NextResponse; user: unknown };

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname as (typeof AUTH_ROUTES)[number]);

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !user) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
