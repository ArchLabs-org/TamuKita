export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { getWeddingBySlug } from "@/lib/db/weddings";
import { demoThemes, type DemoTheme } from "@/features/demo/data";
import { InvitationDemo } from "@/features/demo/invitation-demo";
import { constructMetadata } from "@/lib/helpers/metadata";
import { getTemplateMusic } from "@/config/template-music";
import { extractCleanMusicTitle } from "@/lib/utils";
import type { Database } from "@/types/database";

type WeddingRow = Database["public"]["Tables"]["weddings"]["Row"];

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wedding = await getWeddingBySlug(slug);

  if (wedding) {
    return constructMetadata({
      title: `Undangan Pernikahan ${wedding.bride_name} & ${wedding.groom_name}`,
      description: `Momen bahagia pernikahan ${wedding.bride_name} & ${wedding.groom_name}`,
    });
  }

  const demoTheme = demoThemes.find((t) => t.id === slug);
  if (demoTheme) {
    return constructMetadata({
      title: `Undangan Pernikahan ${demoTheme.couple.bride} & ${demoTheme.couple.groom}`,
      description: `Momen bahagia pernikahan ${demoTheme.couple.bride} & ${demoTheme.couple.groom}`,
    });
  }

  return constructMetadata({
    title: "Undangan Pernikahan — TamuKita",
  });
}

export default async function RealWeddingInvitationPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { to } = await searchParams;
  const guestName = to || "Tamu Undangan Spesial";

  const wedding = await getWeddingBySlug(slug);

  // Debug: log wedding data
  if (wedding) {
    console.log("[Invitation Page] Wedding found:", {
      id: wedding.id,
      slug: wedding.slug,
      gallery_urls: wedding.gallery_urls,
      gallery_urls_length: wedding.gallery_urls?.length || 0,
      bride_photo_url: wedding.bride_photo_url,
      groom_photo_url: wedding.groom_photo_url,
      cover_photo_url: wedding.cover_photo_url,
      music_type: wedding.music_type,
      music_custom_url: wedding.music_custom_url,
    });
  }

  let theme: DemoTheme | null = null;

  if (wedding) {
    // Found wedding in DB — use it
    const w = wedding as WeddingRow;
    const baseTheme = demoThemes.find((t) => t.id === (w.theme_id || "aurora")) ?? demoThemes[0];
    theme = {
      ...baseTheme,
      couple: {
        bride: w.bride_name || baseTheme.couple.bride,
        brideParents: w.bride_parents || baseTheme.couple.brideParents,
        groom: w.groom_name || baseTheme.couple.groom,
        groomParents: w.groom_parents || baseTheme.couple.groomParents,
        // Do NOT fall back to baseTheme.couple.story — empty = hidden
        story: w.love_story || "",
        coupleOrder: (w.couple_order as "bride_first" | "groom_first") || "bride_first",
      },
      event: {
        akad: {
          date: w.akad_date || baseTheme.event.akad.date,
          time: w.akad_time || baseTheme.event.akad.time,
          venue: w.akad_venue || baseTheme.event.akad.venue,
          address: w.akad_address || baseTheme.event.akad.address,
          mapsUrl: w.akad_maps_url || undefined,
        },
        reception: {
          date: w.reception_date || w.wedding_date || baseTheme.event.reception.date,
          time: w.reception_time || baseTheme.event.reception.time,
          venue: w.venue || baseTheme.event.reception.venue,
          address: w.reception_address || baseTheme.event.reception.address,
          mapsUrl: w.reception_maps_url || undefined,
        },
        // Countdown targets RECEPTION date (the main event, second ceremony)
        countdown: w.reception_date
          ? `${w.reception_date}T${w.reception_time ? "12:00:00" : "12:00:00"}`
          : w.wedding_date
            ? `${w.wedding_date}T12:00:00`
            : baseTheme.event.countdown,
      },
      // Do NOT fall back to baseTheme.gifts — empty = section hidden
      gifts: Array.isArray(w.gifts) && w.gifts.length > 0 ? (w.gifts as DemoTheme["gifts"]) : [],
      // Do NOT fall back to baseTheme.timeline — empty = section hidden
      timeline:
        Array.isArray(w.timeline) && w.timeline.length > 0
          ? (w.timeline as DemoTheme["timeline"])
          : [],
    };
  } else {
    // Check if slug matches a demo theme ID
    const demoTheme = demoThemes.find((t) => t.id === slug);
    if (demoTheme) {
      theme = demoTheme;
    }
    // If not found in DB and not a demo theme, return 404
  }

  // If no theme found, return 404
  if (!theme) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground">404</h1>
          <p className="mt-2 font-sans text-lg text-muted-foreground">Undangan tidak ditemukan</p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Slug &quot;{slug}&quot; tidak terdaftar atau telah dihapus.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-2 font-sans text-sm font-medium text-white hover:bg-brand-700"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <InvitationDemo
      theme={theme}
      guestName={guestName}
      weddingId={wedding?.id}
      slug={slug}
      galleryUrls={wedding?.gallery_urls || undefined}
      bridePhotoUrl={wedding?.bride_photo_url || undefined}
      groomPhotoUrl={wedding?.groom_photo_url || undefined}
      coverPhotoUrl={wedding?.cover_photo_url || undefined}
      musicConfig={
        wedding?.music_type === "custom" && wedding?.music_custom_url
          ? {
              themeId: theme.id,
              title: extractCleanMusicTitle(wedding.music_custom_url),
              artist: "Musik Pilihan",
              file: wedding.music_custom_url,
            }
          : getTemplateMusic(theme.id)
      }
    />
  );
}
