import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Guest = Database["public"]["Tables"]["guests"]["Row"];
type GuestInsert = Database["public"]["Tables"]["guests"]["Insert"];
type GuestUpdate = Database["public"]["Tables"]["guests"]["Update"];

/**
 * Get all guests for a wedding, ordered alphabetically.
 */
export async function getGuestsByWeddingId(weddingId: string): Promise<Guest[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("name", { ascending: true });

  if (error) {
    console.error("[db/guests] getGuestsByWeddingId error:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get a single guest by ID.
 */
export async function getGuestById(id: string): Promise<Guest | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[db/guests] getGuestById error:", error.message);
    return null;
  }

  return data;
}

/**
 * Get RSVP summary counts for a wedding.
 */
export async function getGuestRsvpSummary(weddingId: string): Promise<{
  total: number;
  attending: number;
  not_attending: number;
  maybe: number;
  pending: number;
}> {
  const supabase = await createClient();

  const empty = { total: 0, attending: 0, not_attending: 0, maybe: 0, pending: 0 };
  if (!supabase) return empty;

  const { data, error } = await supabase
    .from("guests")
    .select("rsvp_status")
    .eq("wedding_id", weddingId);

  if (error) {
    console.error("[db/guests] getGuestRsvpSummary error:", error.message);
    return empty;
  }

  return (data ?? []).reduce(
    (acc, g) => {
      acc.total++;
      acc[g.rsvp_status as keyof typeof acc]++;
      return acc;
    },
    { ...empty },
  );
}

/**
 * Create a single guest.
 */
export async function createGuest(guest: GuestInsert): Promise<Guest | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("guests")
    .insert(guest)
    .select()
    .single();

  if (error) {
    console.error("[db/guests] createGuest error:", error.message);
    return null;
  }

  return data;
}

/**
 * Bulk insert guests — for CSV/Excel import.
 */
export async function createGuestsBulk(guests: GuestInsert[]): Promise<Guest[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("guests")
    .insert(guests)
    .select();

  if (error) {
    console.error("[db/guests] createGuestsBulk error:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Update a guest record.
 */
export async function updateGuest(
  id: string,
  updates: GuestUpdate,
): Promise<Guest | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("guests")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[db/guests] updateGuest error:", error.message);
    return null;
  }

  return data;
}

/**
 * Update RSVP status — used by the public invitation page.
 */
export async function updateGuestRsvp(
  id: string,
  status: Guest["rsvp_status"],
): Promise<Guest | null> {
  return updateGuest(id, { rsvp_status: status });
}

/**
 * Delete a guest by ID.
 */
export async function deleteGuest(id: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error("[db/guests] deleteGuest error:", error.message);
    return false;
  }

  return true;
}
