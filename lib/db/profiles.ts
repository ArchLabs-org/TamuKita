import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

/**
 * Fetch a single profile by user ID.
 */
export async function getProfileById(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("[db/profiles] getProfileById error:", error.message);
    return null;
  }

  return data;
}

/**
 * Update a profile. Returns the updated row or null on failure.
 */
export async function updateProfile(
  userId: string,
  updates: ProfileUpdate,
): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("[db/profiles] updateProfile error:", error.message);
    return null;
  }

  return data;
}

/**
 * Upsert a profile row — called after auth.signUp to seed the profiles table.
 */
export async function upsertProfile(
  profile: Database["public"]["Tables"]["profiles"]["Insert"],
): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("[db/profiles] upsertProfile error:", error.message);
    return null;
  }

  return data;
}
