import { createClient } from "@/lib/supabase/server";
import type { Guest } from "@/types/wedding";
import type { ApiResponse } from "@/types/api";

export async function getGuestsByWedding(weddingId: string): Promise<ApiResponse<Guest[]>> {
  const supabase = await createClient();

  if (!supabase) {
    return { data: [], error: null, status: 200 };
  }

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("name", { ascending: true });

  if (error) {
    return { data: null, error: error.message, status: 500 };
  }

  return { data, error: null, status: 200 };
}
