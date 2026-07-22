import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/upload/music
 * Direct API route for uploading music files (bypasses Server Action 1MB limit)
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File musik maksimal 5MB." }, { status: 400 });
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase tidak tersedia." }, { status: 500 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Anda harus login untuk upload file." }, { status: 401 });
    }

    const userId = user.id;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp3";
    const rawName = file.name.replace(/\.[^/.]+$/, ""); // strip extension
    const cleanName = rawName
      .replace(/[^a-zA-Z0-9_\-\s]/g, "_")
      .replace(/\s+/g, "_")
      .slice(0, 40);
    const timestamp = Date.now();
    const path = `${userId}/music/${timestamp}_${cleanName}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage.from("picture").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      console.error("[Music Upload API] Upload failed:", uploadError.message);
      return NextResponse.json({ error: `Upload gagal: ${uploadError.message}` }, { status: 500 });
    }

    // Return proxy URL instead of direct Supabase URL
    const proxyUrl = `/api/weddings/music/${encodeURIComponent(path)}`;

    console.log(`[Music Upload API] File uploaded successfully:`, {
      userId,
      path,
      proxyUrl,
      fileType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json({ url: proxyUrl });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Upload error";
    console.error("[Music Upload API] Catch error:", errorMsg);
    return NextResponse.json({ error: `Upload error: ${errorMsg}` }, { status: 500 });
  }
}
