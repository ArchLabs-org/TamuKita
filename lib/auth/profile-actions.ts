"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Server Action — update the authenticated user's display name.
 */
export async function updateProfileName(userId: string, fullName: string) {
  const supabase = await createClient();

  if (!supabase) {
    return { error: "Supabase belum dikonfigurasi." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}
