"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

export interface GuestRsvpData {
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: "pending" | "attending" | "not_attending" | "maybe";
  notes?: string;
}

/**
 * Server Action — save guest RSVP
 */
export async function saveGuestRsvpAction(data: GuestRsvpData) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const { data: guest, error } = await supabase
      .from("guests")
      .insert({
        wedding_id: data.weddingId,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        rsvp_status: data.rsvpStatus,
        notes: data.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("[saveGuestRsvpAction] Insert failed:", error.message);
      return { error: `Gagal menyimpan RSVP: ${error.message}` };
    }

    revalidatePath(ROUTES.guests);

    return { success: true, guestId: guest.id };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[saveGuestRsvpAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
}

/**
 * Server Action — get guests for a wedding
 */
export async function getWeddingGuestsAction(weddingId: string) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const { data: guests, error } = await supabase
      .from("guests")
      .select("*")
      .eq("wedding_id", weddingId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getWeddingGuestsAction] Select failed:", error.message);
      return { error: `Gagal mengambil data tamu: ${error.message}` };
    }

    return { success: true, guests: guests || [] };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[getWeddingGuestsAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
}
