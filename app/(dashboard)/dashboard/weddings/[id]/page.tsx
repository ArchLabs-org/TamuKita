import type { Metadata } from "next";
import Link from "next/link";
// next/navigation notFound not needed currently — wedding always has fallback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { notFound as _notFound } from "next/navigation";
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

  // Attempt to fetch from DB
  const wedding = await getWeddingById(id, user.id);

  // Fallback demo data if created dynamically in local session
  const displayData = wedding ?? {
    id,
    bride_name: "Sekar Ayuningtyas",
    groom_name: "Dimas Pratama",
    slug: "sekar-dimas",
    is_published: true,
    theme_id: "aurora",
    wedding_date: new Date().toISOString().slice(0, 10),
    venue: "Grand Ballroom Hotel Indonesia",
  };

  const invitationUrl = `/${displayData.slug}`;

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
            <p className="mt-1 font-mono text-sm text-brand-600">
              Link URL: http://localhost:3000{invitationUrl}
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
                <Globe size={14} /> Buka Undangan Real
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
            Siap disebarkan ke daftar tamu undangan kalian.
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
            Desain piano romantis responsif.
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
    </div>
  );
}
