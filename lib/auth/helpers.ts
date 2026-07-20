import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export async function getSession() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("[auth] getSession error:", error.message);
    return null;
  }

  return session;
}

export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("[auth] getUser error:", error.message);
    return null;
  }

  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) redirect(ROUTES.login);
  return user;
}

export async function requireGuest() {
  const user = await getUser();
  if (user) redirect(ROUTES.dashboard);
}
