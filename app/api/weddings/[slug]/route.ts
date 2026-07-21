import { NextRequest, NextResponse } from "next/server";
import { getWeddingBySlug } from "@/lib/db/weddings";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const wedding = await getWeddingBySlug(slug);

  if (!wedding) {
    return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: wedding.id,
    slug: wedding.slug,
    bride_name: wedding.bride_name,
    groom_name: wedding.groom_name,
    gallery_urls: wedding.gallery_urls || [],
    gallery_urls_count: (wedding.gallery_urls || []).length,
    theme_id: wedding.theme_id,
    is_published: wedding.is_published,
  });
}
