import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingsByUserId } from "@/lib/db/weddings";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Pernikahan Saya",
  noIndex: true,
});

export default async function WeddingsPage() {
  const user = await requireAuth();
  const weddings = await getWeddingsByUserId(user.id);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Daftar Undangan Pernikahan
          </h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">
            Kelola semua undangan pernikahan digital yang telah kalian buat.
          </p>
        </div>
        <Button variant="brand" size="sm" asChild className="gap-1.5 rounded-full text-xs">
          <Link href="/dashboard/create">
            <Plus size={15} aria-hidden="true" />
            Buat Undangan Baru
          </Link>
        </Button>
      </div>

      {weddings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Heart size={22} className="text-brand-500" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Belum ada undangan</h3>
          <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-muted-foreground">
            Buat undangan pernikahan pertama kalian sekarang dalam 5 menit.
          </p>
          <Button variant="brand" size="sm" className="mt-5 rounded-full text-xs" asChild>
            <Link href="/dashboard/create">
              <Plus size={15} aria-hidden="true" />
              Buat Undangan Pertama
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weddings.map((w) => (
            <div
              key={w.id}
              className="shadow-xs flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {w.bride_name} &amp; {w.groom_name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-brand-600">/{w.slug}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[9px] font-semibold ${
                      w.is_published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {w.is_published ? "Aktif" : "Draft"}
                  </span>
                </div>

                {w.wedding_date && (
                  <p className="mt-3 font-sans text-xs text-muted-foreground">
                    📅 {formatDate(w.wedding_date)}
                  </p>
                )}
                {w.venue && (
                  <p className="mt-1 font-sans text-xs text-muted-foreground">📍 {w.venue}</p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/50 pt-3">
                <Button variant="outline" size="sm" className="flex-1 rounded-full text-xs" asChild>
                  <Link href={`/${w.slug}`} target="_blank">
                    Buka Undangan
                  </Link>
                </Button>

                <Button variant="brand" size="sm" className="flex-1 rounded-full text-xs" asChild>
                  <Link href={ROUTES.guests}>Tamu</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
