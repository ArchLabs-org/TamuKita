"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

/**
 * Server Action — sign in with email and password.
 */
export async function signInWithPassword(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Layanan autentikasi belum dikonfigurasi." };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.dashboard);
}

/**
 * Server Action — register a new account.
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Layanan autentikasi belum dikonfigurasi." };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Server Action — sign out the current user.
 */
export async function signOut() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect(ROUTES.home);
}

/**
 * Server Action — send a password reset email.
 */
export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Layanan autentikasi belum dikonfigurasi." };
  }

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Server Action — update password after reset.
 */
export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Layanan autentikasi belum dikonfigurasi." };
  }

  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  redirect(ROUTES.dashboard);
}
