/**
 * Barrel export for Supabase clients.
 *
 * Usage:
 *
 * Server Components / Route Handlers / Server Actions:
 *   import { createClient } from "@/lib/supabase/server";
 *
 * Client Components:
 *   import { createClient } from "@/lib/supabase/client";
 *
 * Middleware (middleware.ts only):
 *   import { updateSession } from "@/lib/supabase/middleware";
 *
 * Admin (server-only, never expose to browser):
 *   import { createAdminClient } from "@/lib/supabase/admin";
 */

export { createClient as createServerClient } from "./server";
export { createClient as createBrowserClient } from "./client";
export { updateSession } from "./middleware";
export { createAdminClient } from "./admin";
