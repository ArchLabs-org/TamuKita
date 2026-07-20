import type { Metadata } from "next";
import { Users } from "lucide-react";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingsByUserId } from "@/lib/db/weddings";
import { getGuestsByWeddingId } from "@/lib/db/guests";
import { cn } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Tamu",
  noIndex: true,
});

const rsvpLabel: Record<string, { label: string; style: string }> = {
  attending: { label: "Hadir", style: "bg-emerald-100 text-emerald-700" },
  not_attending: { label: "Tidak Hadir", style: "bg-rose-100 text-rose-700" },
  maybe: { label: "Mungkin", style: "bg-amber-100 text-amber-700" },
  pending: { label: "Menunggu", style: "bg-muted text-muted-foreground" },
};

export default async function GuestsPage() {
  const user = await requireAuth();

  // Get first wedding — later this can be filterable
  const weddings = await getWeddingsByUserId(user.id);
  const activeWedding = weddings[0] ?? null;
  const guests = activeWedding
    ? await getGuestsByWeddingId(activeWedding.id)
    : [];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Manajemen Tamu
          </h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">
            {activeWedding
              ? `${activeWedding.bride_name} & ${activeWedding.groom_name}`
              : "Buat undangan terlebih dahulu"}
          </p>
        </div>
      </div>

      {!activeWedding || guests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Users size={22} className="text-brand-500" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {!activeWedding ? "Belum ada undangan" : "Belum ada tamu"}
          </h3>
          <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-muted-foreground">
            {!activeWedding
              ? "Buat undangan pernikahan terlebih dahulu untuk mengelola tamu."
              : "Tambahkan tamu atau import dari file Excel."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
            <div className="col-span-4 font-sans text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Nama
            </div>
            <div className="col-span-3 font-sans text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Email / Telepon
            </div>
            <div className="col-span-2 font-sans text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Status RSVP
            </div>
            <div className="col-span-2 font-sans text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Kursi
            </div>
            <div className="col-span-1" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border">
            {guests.map((guest) => {
              const status = rsvpLabel[guest.rsvp_status] ?? rsvpLabel.pending;
              return (
                <div
                  key={guest.id}
                  className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/30"
                >
                  <div className="col-span-4 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-sans text-[10px] font-semibold text-brand-700">
                      {guest.name[0]?.toUpperCase()}
                    </div>
                    <span className="font-sans text-sm text-foreground">
                      {guest.name}
                    </span>
                  </div>
                  <div className="col-span-3 font-sans text-xs text-muted-foreground">
                    {guest.email ?? guest.phone ?? "—"}
                  </div>
                  <div className="col-span-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-sans text-[9px] font-medium",
                        status.style,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="col-span-2 font-sans text-xs text-muted-foreground">
                    {guest.seat_number ?? "—"}
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      className="rounded p-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      aria-label={`Opsi untuk ${guest.name}`}
                    >
                      •••
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer count */}
          <div className="border-t border-border bg-muted/20 px-4 py-2.5">
            <p className="font-sans text-xs text-muted-foreground">
              {guests.length} tamu terdaftar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
