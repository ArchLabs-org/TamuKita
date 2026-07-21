"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Upload a file to Supabase Storage and return its public URL.
 * Bucket: picture
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
      return { error: "Supabase tidak tersedia. Coba lagi nanti." };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Anda harus login untuk upload file." };
    }

    const userId = user.id;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? (folder === "music" ? "mp3" : "jpg");
    const timestamp = Date.now();
    const path = `${userId}/${folder}/${timestamp}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("picture").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      console.error("[uploadPhotoAction] Upload failed:", uploadError.message);
      return { error: `Upload gagal: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("picture").getPublicUrl(path);

    // For music files, return proxy URL instead of direct Supabase URL
    // This ensures music files can be accessed even if Supabase Storage RLS restricts public access
    const finalUrl =
      folder === "music" ? `/api/weddings/music/${encodeURIComponent(path)}` : publicUrl;

    console.log(`[uploadPhotoAction] File uploaded successfully for folder "${folder}":`, {
      userId,
      path,
      publicUrl,
      finalUrl,
      fileType: file.type,
      fileSize: file.size,
      isProxied: folder === "music",
    });

    return { url: finalUrl };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Upload error";
    console.error("[uploadPhotoAction] Catch error:", errorMsg);
    return { error: `Upload error: ${errorMsg}` };
  }
}
