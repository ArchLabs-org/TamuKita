export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Palette, CheckCircle2, Sparkles, Globe, Share2 } from "lucide-react";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingById } from "@/lib/db/weddings";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return constructMetadata({
    title: `Kelola Undangan — ${id}`,
    noIndex: true,
  });
}

export default async function WeddingDetailPage({ params }: PageProps) {
  const user = await requireAuth();
  const { id } = await params;

  // Fetch from DB with user ownership validation
  const wedding = await getWeddingById(id, user.id);

  if (!wedding) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <h1 className="font-display text-lg font-semibold text-destructive">
            Undangan Tidak Ditemukan
          </h1>
          <p className="mt-1 font-sans text-xs text-destructive/80">
            Undangan dengan ID {id} tidak ditemukan atau Anda tidak memiliki akses.
          </p>
          <Link href={ROUTES.weddings}>
            <Button variant="outline" size="sm" className="mt-4 gap-1.5 rounded-full text-xs">
              <ArrowLeft size={14} /> Kembali ke Daftar
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayData = wedding;
  const invitationUrl = `/${displayData.slug}`;
  const productionUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fullInvitationUrl = `${productionUrl}${invitationUrl}`;

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link href={ROUTES.weddings}>
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-full text-xs">
            <ArrowLeft size={14} /> Kembali ke Daftar Pernikahan
          </Button>
        </Link>
        <span
          className={`rounded-full px-3 py-1 font-sans text-xs font-semibold ${
            displayData.is_published
              ? "bg-emerald-100 text-emerald-700"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {displayData.is_published ? "● Undangan Aktif" : "Draft"}
        </span>
      </div>

      {/* Main Banner Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-600">
              Detail Undangan Digital
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {displayData.bride_name} &amp; {displayData.groom_name}
            </h1>
            <p className="mt-2 break-all font-mono text-xs text-brand-600">
              Link URL: {fullInvitationUrl}
            </p>
            {displayData.wedding_date && (
              <p className="mt-2 font-sans text-xs text-muted-foreground">
                📅 Tanggal Acara: {formatDate(displayData.wedding_date)}
              </p>
            )}
            {displayData.venue && (
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                📍 Lokasi: {displayData.venue}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5 sm:w-56">
            <Button
              variant="brand"
              size="sm"
              asChild
              className="gap-1.5 rounded-full text-xs shadow-md"
            >
              <Link href={invitationUrl} target="_blank">
                <Globe size={14} /> Buka Undangan
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild className="gap-1.5 rounded-full text-xs">
              <Link href={ROUTES.guests}>
                <Users size={14} /> Kelola Daftar Tamu
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild className="gap-1.5 rounded-full text-xs">
              <Link href={ROUTES.themes}>
                <Palette size={14} /> Ubah Tema Undangan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Dashboard Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="shadow-xs rounded-2xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between text-brand-600">
            <span className="font-sans text-xs font-semibold text-muted-foreground">
              Status Undangan
            </span>
            <CheckCircle2 size={18} />
          </div>
          <p className="font-display text-xl font-bold text-foreground">
            {displayData.is_published ? "Sudah Terbit" : "Draft"}
          </p>
          <p className="mt-1 font-sans text-[11px] text-muted-foreground">
            {displayData.is_published
              ? "Siap disebarkan ke daftar tamu undangan kalian."
              : "Selesaikan data sebelum menerbitkan."}
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between text-purple-600">
            <span className="font-sans text-xs font-semibold text-muted-foreground">
              Tema Dipakai
            </span>
            <Sparkles size={18} />
          </div>
          <p className="font-display text-xl font-bold capitalize text-foreground">
            {displayData.theme_id || "Aurora"}
          </p>
          <p className="mt-1 font-sans text-[11px] text-muted-foreground">
            Desain tema pernikahan premium responsif.
          </p>
        </div>

        <div className="shadow-xs rounded-2xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between text-emerald-600">
            <span className="font-sans text-xs font-semibold text-muted-foreground">
              Personalisasi Link
            </span>
            <Share2 size={18} />
          </div>
          <p className="font-display text-xl font-bold text-foreground">Otomatis Tamu</p>
          <p className="mt-1 font-sans text-[11px] text-muted-foreground">
            Sertakan ?to=Nama+Tamu pada link undangan.
          </p>
        </div>
      </div>

      {/* Wedding Details Section */}
      <div className="mt-8 space-y-6">
        {/* Couple Info */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Informasi Mempelai</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-sans text-xs font-semibold text-muted-foreground">
                Mempelai Wanita
              </p>
              <p className="mt-1 font-display text-base font-semibold text-foreground">
                {displayData.bride_name}
              </p>
              {displayData.bride_parents && (
                <p className="mt-1 font-sans text-xs text-muted-foreground">
                  {displayData.bride_parents}
                </p>
              )}
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-muted-foreground">Mempelai Pria</p>
              <p className="mt-1 font-display text-base font-semibold text-foreground">
                {displayData.groom_name}
              </p>
              {displayData.groom_parents && (
                <p className="mt-1 font-sans text-xs text-muted-foreground">
                  {displayData.groom_parents}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Event Schedule */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">Jadwal Acara</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {displayData.akad_date && (
              <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4">
                <p className="font-sans text-[11px] font-semibold uppercase text-amber-900">
                  Akad Nikah
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-amber-950">
                  {formatDate(displayData.akad_date)}
                </p>
                {displayData.akad_time && (
                  <p className="mt-1 font-sans text-xs text-amber-900">{displayData.akad_time}</p>
                )}
                {displayData.akad_venue && (
                  <p className="mt-2 font-sans text-xs font-semibold text-amber-950">
                    {displayData.akad_venue}
                  </p>
                )}
                {displayData.akad_address && (
                  <p className="mt-1 font-sans text-xs text-amber-900">
                    {displayData.akad_address}
                  </p>
                )}
              </div>
            )}
            {(displayData.reception_date || displayData.wedding_date) && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <p className="font-sans text-[11px] font-semibold uppercase text-emerald-900">
                  Resepsi Pernikahan
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-emerald-950">
                  {formatDate(displayData.reception_date || displayData.wedding_date)}
                </p>
                {displayData.reception_time && (
                  <p className="mt-1 font-sans text-xs text-emerald-900">
                    {displayData.reception_time}
                  </p>
                )}
                {displayData.venue && (
                  <p className="mt-2 font-sans text-xs font-semibold text-emerald-950">
                    {displayData.venue}
                  </p>
                )}
                {displayData.reception_address && (
                  <p className="mt-1 font-sans text-xs text-emerald-900">
                    {displayData.reception_address}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Love Story */}
        {displayData.love_story && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Kisah Cinta</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground">
              {displayData.love_story}
            </p>
          </div>
        )}

        {/* Timeline */}
        {Array.isArray(displayData.timeline) && displayData.timeline.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Perjalanan Cinta</h2>
            <div className="mt-4 space-y-3">
              {(displayData.timeline as any[]).map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <p className="font-sans text-xs font-bold text-brand-600">{item.year}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className="mt-1 font-sans text-xs text-muted-foreground">{item.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gifts */}
        {Array.isArray(displayData.gifts) && displayData.gifts.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Rekening Angpao Digital
            </h2>
            <div className="mt-4 space-y-2">
              {(displayData.gifts as any[]).map((gift, idx) => (
                <div key={idx} className="rounded-lg bg-muted/20 p-3">
                  <p className="font-sans text-xs font-semibold text-foreground">
                    {gift.bank} - {gift.name}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">{gift.account}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media */}
        {(displayData.bride_photo_url ||
          displayData.groom_photo_url ||
          displayData.cover_photo_url ||
          (Array.isArray(displayData.gallery_urls) && displayData.gallery_urls.length > 0)) && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Media Undangan</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {displayData.bride_photo_url && (
                <div className="h-40 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={displayData.bride_photo_url}
                    alt="Bride"
                    className="h-full w-full object-cover"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              )}
              {displayData.groom_photo_url && (
                <div className="h-40 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={displayData.groom_photo_url}
                    alt="Groom"
                    className="h-full w-full object-cover"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              )}
            </div>
            {Array.isArray(displayData.gallery_urls) && displayData.gallery_urls.length > 0 && (
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {displayData.gallery_urls.map((url, idx) => (
                  <div key={idx} className="h-32 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={url}
                      alt={`Gallery ${idx}`}
                      className="h-full w-full object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
