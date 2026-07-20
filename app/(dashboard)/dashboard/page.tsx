import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Users, Eye, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingsByUserId } from "@/lib/db/weddings";
import { getGuestRsvpSummary } from "@/lib/db/guests";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const user = await requireAuth();

  // Fetch weddings owned by this user
  const weddings = await getWeddingsByUserId(user.id);

  // Aggregate RSVP summary across all weddings
  const rsvpSummaries = await Promise.all(weddings.map((w) => getGuestRsvpSummary(w.id)));

  const totalGuests = rsvpSummaries.reduce((s, r) => s + r.total, 0);
  const totalAttending = rsvpSummaries.reduce((s, r) => s + r.attending, 0);

  const stats = [
    {
      title: "Total Undangan",
      value: String(weddings.length),
      icon: Heart,
      sub: weddings.length === 0 ? "Belum ada undangan" : "Undangan aktif",
    },
    {
      title: "Total Tamu",
      value: String(totalGuests),
      icon: Users,
      sub: totalGuests === 0 ? "Belum ada tamu" : "Tamu terdaftar",
    },
    {
      title: "Konfirmasi Hadir",
      value: String(totalAttending),
      icon: TrendingUp,
      sub: totalAttending === 0 ? "Menunggu konfirmasi" : "Tamu hadir",
    },
    {
      title: "Total Tayangan",
      value: "—",
      icon: Eye,
      sub: "Segera hadir",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">Dashboard</h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">Selamat datang kembali</p>
        </div>
        <Button variant="brand" size="sm" asChild>
          <Link href="/dashboard/create">
            <Plus size={15} aria-hidden="true" />
            Buat Undangan
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, sub }) => (
          <Card key={title} variant="default">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-sans text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <Icon size={16} className="text-brand-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-2xl font-semibold text-foreground">{value}</div>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="shadow-xs mt-8 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Akses Cepat
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link
            href="/dashboard/create"
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 font-sans text-xs font-medium text-foreground transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Plus size={16} />
            </div>
            <span>Buat Undangan</span>
          </Link>

          <Link
            href={ROUTES.guests}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 font-sans text-xs font-medium text-foreground transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Users size={16} />
            </div>
            <span>Kelola Tamu</span>
          </Link>

          <Link
            href={ROUTES.themes}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 font-sans text-xs font-medium text-foreground transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Heart size={16} />
            </div>
            <span>Koleksi Tema</span>
          </Link>

          <Link
            href="/demo/aurora"
            target="_blank"
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 font-sans text-xs font-medium text-foreground transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Eye size={16} />
            </div>
            <span>Lihat Live Demo</span>
          </Link>
        </div>
      </div>

      {/* Empty state or wedding list */}
      {weddings.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Heart size={22} className="text-brand-500" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Mulai perjalanan kalian
          </h3>
          <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-muted-foreground">
            Buat undangan pernikahan pertama dan mulai kelola daftar tamu kalian.
          </p>
          <Button variant="brand" size="sm" className="mt-5 rounded-full" asChild>
            <Link href="/dashboard/create">
              <Plus size={15} aria-hidden="true" />
              Buat Undangan Pertama
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">
            Undangan Terbaru Kalian
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weddings.slice(0, 6).map((w) => (
              <div
                key={w.id}
                className="shadow-xs group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-base font-bold text-foreground">
                        {w.bride_name} &amp; {w.groom_name}
                      </p>
                      <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                        {w.wedding_date
                          ? new Date(w.wedding_date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Tanggal belum diset"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-sans text-[9px] font-semibold ${
                        w.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {w.is_published ? "Aktif" : "Draft"}
                    </span>
                  </div>
                  {w.venue && (
                    <p className="mt-3 font-sans text-xs text-muted-foreground/80">📍 {w.venue}</p>
                  )}
                  <p className="mt-1 font-mono text-[11px] text-brand-600">Slug: /{w.slug}</p>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-border/50 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 rounded-full text-xs"
                  >
                    <Link href={`/${w.slug}`} target="_blank">
                      Buka Undangan
                    </Link>
                  </Button>
                  <Button variant="brand" size="sm" asChild className="flex-1 rounded-full text-xs">
                    <Link href={ROUTES.guests}>Kelola Tamu</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
