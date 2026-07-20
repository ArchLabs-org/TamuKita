import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Wedding = Database["public"]["Tables"]["weddings"]["Row"];
type WeddingInsert = Database["public"]["Tables"]["weddings"]["Insert"];
type WeddingUpdate = Database["public"]["Tables"]["weddings"]["Update"];

/**
 * Get all weddings owned by a user.
 */
export async function getWeddingsByUserId(userId: string): Promise<Wedding[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("weddings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[db/weddings] getWeddingsByUserId fallback:", error.message);
      return [];
    }

    return data ?? [];
  } catch {
    return [];
  }
}

/**
 * Get a single wedding by its URL slug.
 */
export async function getWeddingBySlug(slug: string): Promise<Wedding | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("weddings").select("*").eq("slug", slug).single();

  if (error) {
    if (error.code !== "PGRST116") {
      // PGRST116 = no rows returned — expected for 404
      console.error("[db/weddings] getWeddingBySlug error:", error.message);
    }
    return null;
  }

  return data;
}

/**
 * Get a single wedding by ID, scoped to its owner.
 */
export async function getWeddingById(id: string, userId: string): Promise<Wedding | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("[db/weddings] getWeddingById error:", error.message);
    return null;
  }

  return data;
}

/**
 * Create a new wedding.
 */
export async function createWedding(wedding: WeddingInsert): Promise<Wedding | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("weddings").insert(wedding).select().single();

  if (error) {
    console.error("[db/weddings] createWedding error:", error.message);
    return null;
  }

  return data;
}

/**
 * Update a wedding. Scoped to owner for RLS safety.
 */
export async function updateWedding(
  id: string,
  userId: string,
  updates: WeddingUpdate,
): Promise<Wedding | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("weddings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("[db/weddings] updateWedding error:", error.message);
    return null;
  }

  return data;
}

/**
 * Delete a wedding. Scoped to owner for RLS safety.
 */
export async function deleteWedding(id: string, userId: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  const { error } = await supabase.from("weddings").delete().eq("id", id).eq("user_id", userId);

  if (error) {
    console.error("[db/weddings] deleteWedding error:", error.message);
    return false;
  }

  return true;
}
