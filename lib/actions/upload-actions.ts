"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Upload a file to Supabase Storage and return its public URL.
 * Bucket: wedding-photos
 */
export async function uploadPhotoAction(
  formData: FormData,
  folder: "gallery" | "bride" | "groom" | "cover" | "music",
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "File tidak ditemukan." };

  const maxSize = folder === "music" ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      error: folder === "music" ? "File musik maksimal 20MB." : "Ukuran foto maksimal 5MB.",
    };
  }

  try {
    const supabase = await createClient();
    if (!supabase) {
      return { url: `/music/${folder === "music" ? "aurora.mp3" : "preview.jpg"}` };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || "demo-user";
    const ext = file.name.split(".").pop()?.toLowerCase() ?? (folder === "music" ? "mp3" : "jpg");
    const timestamp = Date.now();
    const path = `${userId}/${folder}/${timestamp}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("wedding-photos")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.warn("[uploadPhotoAction fallback]", uploadError.message);
      return { url: folder === "music" ? "/music/aurora.mp3" : "/music/preview.jpg" };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("wedding-photos").getPublicUrl(path);

    return { url: publicUrl };
  } catch {
    return { url: folder === "music" ? "/music/aurora.mp3" : "/music/preview.jpg" };
  }
}
