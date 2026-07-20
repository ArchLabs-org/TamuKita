import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { ROUTES, AUTH_ROUTES, PROTECTED_ROUTES } from "@/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Refresh the session and get the authenticated user.
  // updateSession MUST be called before any redirect logic so that
  // session cookies are always kept fresh.
  const { response, user } = await updateSession(request);

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  // Unauthenticated user trying to access a protected page → redirect to login
  if (isProtectedRoute && !user) {
    const loginUrl = new URL(ROUTES.login, request.url);
    // Preserve the intended destination so we can redirect back after login
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user visiting an auth page (login / register) → send to dashboard
  if (isAuthRoute && user) {
    // Honour an explicit redirectTo param if it exists and is a safe path
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    const safeRedirect =
      redirectTo && redirectTo.startsWith("/") ? redirectTo : ROUTES.dashboard;
    return NextResponse.redirect(new URL(safeRedirect, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     * - common image extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
