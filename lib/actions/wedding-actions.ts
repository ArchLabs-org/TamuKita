"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

export interface WeddingFormData {
  // Step 1 — Mempelai
  brideName: string;
  brideParents?: string;
  groomName: string;
  groomParents?: string;
  coupleOrder?: "bride_first" | "groom_first";
  // Step 2 — Tema
  themeId: string;
  // Step 3 — Waktu & Lokasi
  weddingDate: string;
  akadDate?: string;
  akadTime?: string;
  akadVenue?: string;
  akadAddress?: string;
  akadMapsUrl?: string;
  receptionDate?: string;
  receptionTime?: string;
  venue?: string;
  receptionAddress?: string;
  receptionMapsUrl?: string;
  // Step 4 — Cerita & Foto
  loveStory?: string;
  timeline?: Array<{ year: string; title: string; desc: string }>;
  bridePhotoUrl?: string;
  groomPhotoUrl?: string;
  coverPhotoUrl?: string;
  galleryUrls?: string[];
  // Step 5 — Musik
  musicType?: "template" | "custom";
  musicCustomUrl?: string;
  // Step 6 — Hadiah
  gifts?: Array<{ bank: string; account: string; name: string }>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30); // Shorter max length
}

function generateUniqueCode(): string {
  // Generate short 4-char code: 2 digits + 2 chars
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Server Action — create a new wedding from the wizard.
 */
export async function createWeddingAction(data: WeddingFormData) {
  // Generate slug from first names only + unique code
  const isGroomFirst = data.coupleOrder === "groom_first";
  const firstFirstName = ((isGroomFirst ? data.groomName : data.brideName) || "first").split(
    " ",
  )[0];
  const secondFirstName = ((isGroomFirst ? data.brideName : data.groomName) || "second").split(
    " ",
  )[0];
  const uniqueCode = generateUniqueCode();

  const baseSlug = slugify(`${firstFirstName}-${secondFirstName}-${uniqueCode}`);
  let slug = baseSlug || "undangan-" + uniqueCode;

  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: "Supabase tidak tersedia." };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || "demo-user-123";

    // Enforce 1 Free Wedding limit per registered user
    const { data: userWeddings } = await supabase
      .from("weddings")
      .select("id")
      .eq("user_id", userId);

    if (userWeddings && userWeddings.length >= 1) {
      return {
        error:
          "Batas Akun Gratis: Anda sudah memiliki 1 undangan aktif. Untuk menambah/membuat undangan baru, silakan lakukan Upgrade ke Paket Premium.",
      };
    }

    // Ensure slug uniqueness (optional, since we already have unique code)
    let attempt = 0;
    while (attempt < 3) {
      const { data: existing } = await supabase
        .from("weddings")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!existing) break;
      attempt++;
      slug = slugify(`${firstFirstName}-${secondFirstName}-${generateUniqueCode()}`);
    }
    while (attempt < 10) {
      const { data: existing } = await supabase
        .from("weddings")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!existing) break;
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }

    const { data: wedding, error } = await supabase
      .from("weddings")
      .insert({
        user_id: userId,
        bride_name: data.brideName || "Sekar",
        groom_name: data.groomName || "Dimas",
        bride_parents: data.brideParents || null,
        groom_parents: data.groomParents || null,
        couple_order: data.coupleOrder || "bride_first",
        wedding_date: data.weddingDate || new Date().toISOString().slice(0, 10),
        akad_date: data.akadDate || null,
        akad_time: data.akadTime || null,
        akad_venue: data.akadVenue || null,
        akad_address: data.akadAddress || null,
        akad_maps_url: data.akadMapsUrl || null,
        reception_date: data.receptionDate || null,
        reception_time: data.receptionTime || null,
        venue: data.venue || null,
        reception_address: data.receptionAddress || null,
        reception_maps_url: data.receptionMapsUrl || null,
        theme_id: data.themeId || "aurora",
        slug,
        love_story: data.loveStory || null,
        timeline: data.timeline || [],
        bride_photo_url: data.bridePhotoUrl || null,
        groom_photo_url: data.groomPhotoUrl || null,
        cover_photo_url: data.coverPhotoUrl || null,
        gallery_urls: data.galleryUrls || [],
        music_type: data.musicType || "template",
        music_custom_url: data.musicCustomUrl || null,
        gifts: data.gifts || [],
        is_published: true,
      })
      .select()
      .single();

    if (error) {
      console.error("[createWeddingAction] Insert failed:", error.message);
      return { error: `Gagal menyimpan undangan: ${error.message}` };
    }

    revalidatePath(ROUTES.weddings);
    revalidatePath(ROUTES.dashboard);

    return { success: true, weddingId: wedding.id, slug: wedding.slug };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[createWeddingAction] Catch error:", errorMsg);
    return { error: `Error: ${errorMsg}` };
  }
}

/**
 * Server Action — update an existing wedding.
 */
export async function updateWeddingAction(weddingId: string, data: Partial<WeddingFormData>) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase belum dikonfigurasi." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Anda harus login terlebih dahulu." };
  }

  const updates: Record<string, unknown> = {};

  if (data.brideName !== undefined) updates.bride_name = data.brideName;
  if (data.groomName !== undefined) updates.groom_name = data.groomName;
  if (data.brideParents !== undefined) updates.bride_parents = data.brideParents;
  if (data.groomParents !== undefined) updates.groom_parents = data.groomParents;
  if (data.coupleOrder !== undefined) updates.couple_order = data.coupleOrder;
  if (data.weddingDate !== undefined) updates.wedding_date = data.weddingDate;
  if (data.themeId !== undefined) updates.theme_id = data.themeId;
  if (data.akadDate !== undefined) updates.akad_date = data.akadDate;
  if (data.akadTime !== undefined) updates.akad_time = data.akadTime;
  if (data.akadVenue !== undefined) updates.akad_venue = data.akadVenue;
  if (data.akadAddress !== undefined) updates.akad_address = data.akadAddress;
  if (data.akadMapsUrl !== undefined) updates.akad_maps_url = data.akadMapsUrl;
  if (data.receptionDate !== undefined) updates.reception_date = data.receptionDate;
  if (data.receptionTime !== undefined) updates.reception_time = data.receptionTime;
  if (data.venue !== undefined) updates.venue = data.venue;
  if (data.receptionAddress !== undefined) updates.reception_address = data.receptionAddress;
  if (data.receptionMapsUrl !== undefined) updates.reception_maps_url = data.receptionMapsUrl;
  if (data.loveStory !== undefined) updates.love_story = data.loveStory;
  if (data.timeline !== undefined) updates.timeline = data.timeline;
  if (data.bridePhotoUrl !== undefined) updates.bride_photo_url = data.bridePhotoUrl;
  if (data.groomPhotoUrl !== undefined) updates.groom_photo_url = data.groomPhotoUrl;
  if (data.coverPhotoUrl !== undefined) updates.cover_photo_url = data.coverPhotoUrl;
  if (data.galleryUrls !== undefined) updates.gallery_urls = data.galleryUrls;
  if (data.musicType !== undefined) updates.music_type = data.musicType;
  if (data.musicCustomUrl !== undefined) updates.music_custom_url = data.musicCustomUrl;
  if (data.gifts !== undefined) updates.gifts = data.gifts;

  updates.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from("weddings")
    .update(updates)
    .eq("id", weddingId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(ROUTES.weddings);
  revalidatePath(`${ROUTES.weddings}/${weddingId}`);

  return { success: true };
}

/**
 * Server Action — toggle publish status.
 */
export async function togglePublishAction(weddingId: string, isPublished: boolean) {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase belum dikonfigurasi." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Tidak terautentikasi." };

  const { error } = await supabase
    .from("weddings")
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq("id", weddingId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath(ROUTES.weddings);
  revalidatePath(`${ROUTES.weddings}/${weddingId}`);

  return { success: true };
}
