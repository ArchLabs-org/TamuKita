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
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    if (supabase) {
      const { data: ownerProfile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", wedding.user_id)
        .single();

      const ownerPlan = ownerProfile?.plan || "free";

      if (ownerPlan === "free") {
        return (
          <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-12 text-center text-white">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
              Undangan Belum Diterbitkan
            </h1>
            <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-zinc-400">
              Undangan digital ini masih dalam mode{" "}
              <span className="font-semibold text-amber-400">Draf / Preview</span>. Link URL publik
              hanya dapat diaktifkan setelah melakukan Upgrade ke{" "}
              <span className="font-semibold text-white">Paket Starter</span> atau{" "}
              <span className="font-semibold text-white">Professional</span>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 font-sans text-xs font-semibold text-zinc-950 transition-all hover:bg-amber-400"
              >
                Upgrade Paket Sekarang
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-6 py-2.5 font-sans text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        );
      }
    }

    // Found wedding in DB and plan is active — use it
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
