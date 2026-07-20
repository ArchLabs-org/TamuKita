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
  title: "Pernikahan",
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
            Pernikahan
          </h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">
            Kelola semua undangan pernikahan kalian
          </p>
        </div>
        <Button variant="brand" size="sm">
          <Plus size={15} aria-hidden="true" />
          Buat Undangan
        </Button>
      </div>

      {weddings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Heart size={22} className="text-brand-500" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Belum ada undangan
          </h3>
          <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-muted-foreground">
            Buat undangan pernikahan pertama kalian sekarang.
          </p>
          <Button variant="brand" size="sm" className="mt-5">
            <Plus size={15} aria-hidden="true" />
            Buat Undangan Pertama
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weddings.map((w) => (
            <div
              key={w.id}
              className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-base font-medium text-foreground">
                  {w.bride_name} & {w.groom_name}
                </h3>
                <span
                  className={`ml-2 flex-shrink-0 rounded-full px-2 py-0.5 font-sans text-[9px] font-medium ${
                    w.is_published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {w.is_published ? "Aktif" : "Draft"}
                </span>
              </div>

              {w.wedding_date && (
                <p className="mt-1.5 font-sans text-xs text-muted-foreground">
                  📅 {formatDate(w.wedding_date)}
                </p>
              )}
              {w.venue && (
                <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                  📍 {w.venue}
                </p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  asChild
                >
                  <Link href={`${ROUTES.weddings}/${w.id}`}>Kelola</Link>
                </Button>
                <Button
                  variant="soft"
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  asChild
                >
                  <Link
                    href={`/${w.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pratinjau
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
