import { createClient } from "@/lib/supabase/server";
import type { Wedding } from "@/types/wedding";
import type { ApiResponse } from "@/types/api";

export async function getWeddingsByUser(userId: string): Promise<ApiResponse<Wedding[]>> {
  const supabase = await createClient();

  if (!supabase) {
    return { data: [], error: null, status: 200 };
  }

  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message, status: 500 };
  }

  return { data, error: null, status: 200 };
}

export async function getWeddingBySlug(slug: string): Promise<ApiResponse<Wedding>> {
  const supabase = await createClient();

  if (!supabase) {
    return { data: null, error: "Not configured", status: 503 };
  }

  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return { data: null, error: error.message, status: error.code === "PGRST116" ? 404 : 500 };
  }

  return { data, error: null, status: 200 };
}
