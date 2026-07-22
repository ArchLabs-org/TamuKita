"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

export interface GuestRsvpData {
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus?: "pending" | "attending" | "not_attending" | "maybe";
  notes?: string;
}

export interface AddGuestData {
  weddingId: string;
  name: string;
  phone?: string;
  notes?: string;
}

export interface UpdateGuestRsvpData {
  guestId: string;
  status: "pending" | "attending" | "not_attending" | "maybe";
  notes?: string;
}

/**
 * Server Action — add single guest to pre-populated list
 */
export async function addGuestAction(data: AddGuestData) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Silakan login terlebih dahulu." };
    }

    // Fetch user profile plan
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const plan = profile?.plan || "free";

    if (plan === "free") {
      return {
        error:
          "Batas Akun Gratis: Akun Coba-coba hanya bisa membuat preview. Silakan upgrade ke Paket Starter (maks 50 tamu) atau Professional (maks 1.000 tamu) untuk mengelola daftar tamu.",
      };
    }

    // Check existing count of guests for this wedding
    const { count } = await supabase
      .from("guests")
      .select("id", { count: "exact", head: true })
      .eq("wedding_id", data.weddingId);

    const currentCount = count || 0;
    let maxGuests = 50;
    if (plan === "professional") maxGuests = 1000;
    if (plan === "enterprise") maxGuests = 999999;

    if (currentCount >= maxGuests) {
      return {
        error: `Batas Tamu Tercapai: Paket ${plan.toUpperCase()} Anda dibatasi maksimal ${maxGuests} tamu. Silakan upgrade paket Anda.`,
      };
    }

    const { data: guest, error } = await supabase
      .from("guests")
      .insert({
        wedding_id: data.weddingId,
        name: data.name,
        phone: data.phone || null,
        notes: data.notes || null,
        rsvp_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("[addGuestAction] Insert failed:", error.message);
      return { error: `Gagal menambah tamu: ${error.message}` };
    }

    revalidatePath(ROUTES.guests);

    return { success: true, guest };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[addGuestAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
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
        rsvp_status: data.rsvpStatus || "pending",
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

/**
 * Server Action — update guest RSVP status and notes
 */
export async function updateGuestRsvpAction(data: UpdateGuestRsvpData) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const { data: guest, error } = await supabase
      .from("guests")
      .update({
        rsvp_status: data.status,
        notes: data.notes || null,
      })
      .eq("id", data.guestId)
      .select()
      .single();

    if (error) {
      console.error("[updateGuestRsvpAction] Update failed:", error.message);
      return { error: `Gagal mengupdate RSVP: ${error.message}` };
    }

    revalidatePath(ROUTES.guests);

    return { success: true, guest };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[updateGuestRsvpAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
}

/**
 * Server Action — find guest by wedding ID and name
 */
export async function findGuestByNameAction(weddingId: string, name: string) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const { data: guest, error } = await supabase
      .from("guests")
      .select("id")
      .eq("wedding_id", weddingId)
      .eq("name", name)
      .maybeSingle();

    if (error) {
      console.error("[findGuestByNameAction] Query failed:", error.message);
      return { error: `Gagal mencari tamu: ${error.message}` };
    }

    if (!guest) {
      return { error: "Tamu tidak ditemukan di daftar" };
    }

    return { success: true, guestId: guest.id };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[findGuestByNameAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
}
