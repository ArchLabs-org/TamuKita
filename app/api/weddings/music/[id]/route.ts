import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase credentials in environment");
}

/**
 * GET /api/weddings/music/[id]
 * Proxy endpoint to serve music files from Supabase Storage with proper authentication
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return new Response("Invalid request", { status: 400 });
    }

    // The id parameter contains the full storage path: userId/music/timestamp.ext
    const decodedPath = decodeURIComponent(id);

    console.log(`[Music API] Serving music file: ${decodedPath}`);

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string);

    // Download file from Supabase Storage using service role
    const { data, error } = await supabase.storage.from("picture").download(decodedPath);

    if (error) {
      console.error(`[Music API] Download failed for ${decodedPath}:`, error.message);
      return new Response("File not found", { status: 404 });
    }

    if (!data) {
      console.warn(`[Music API] No data returned for ${decodedPath}`);
      return new Response("File not found", { status: 404 });
    }

    // Determine content type
    let contentType = "audio/mpeg";
    if (decodedPath.endsWith(".mp3")) contentType = "audio/mpeg";
    else if (decodedPath.endsWith(".wav")) contentType = "audio/wav";
    else if (decodedPath.endsWith(".m4a")) contentType = "audio/mp4";
    else if (decodedPath.endsWith(".ogg")) contentType = "audio/ogg";
    else if (decodedPath.endsWith(".webm")) contentType = "audio/webm";

    // Return file with proper headers for streaming
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": data.size.toString(),
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        "Access-Control-Allow-Origin": "*", // Allow CORS
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Music API] Error:`, errorMsg);
    return new Response(`Server error: ${errorMsg}`, { status: 500 });
  }
}
