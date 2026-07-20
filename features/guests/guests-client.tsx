"use client";

import * as React from "react";
import {
  Users,
  Download,
  Upload,
  Plus,
  Send,
  Sparkles,
  Check,
  Copy,
  MessageSquare,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuestItem {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  rsvp_status: "pending" | "attending" | "not_attending" | "maybe";
  seat_number: string | null;
  notes: string | null;
}

interface WeddingItem {
  id: string;
  bride_name: string;
  groom_name: string;
  slug: string;
}

const rsvpLabel: Record<string, { label: string; style: string }> = {
  attending: { label: "Hadir", style: "bg-emerald-100 text-emerald-700" },
  not_attending: { label: "Tidak Hadir", style: "bg-rose-100 text-rose-700" },
  maybe: { label: "Mungkin", style: "bg-amber-100 text-amber-700" },
  pending: { label: "Menunggu", style: "bg-muted text-muted-foreground" },
};

export function GuestsClient({
  initialWedding,
  initialGuests,
}: {
  initialWedding: WeddingItem | null;
  initialGuests: GuestItem[];
}) {
  const [guests, setGuests] = React.useState<GuestItem[]>(initialGuests);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showProModal, setShowProModal] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [newGuestName, setNewGuestName] = React.useState("");
  const [newGuestPhone, setNewGuestPhone] = React.useState("");

  const weddingSlug = initialWedding?.slug || "sekar-dimas";
  const brideGroom = initialWedding
    ? `${initialWedding.bride_name} & ${initialWedding.groom_name}`
    : "Pernikahan TamuKita";

  // Export CSV Template
  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Nama Tamu,Nomor WhatsApp,Catatan\n" +
      "Budi Santoso,08123456789,Keluarga Besar\n" +
      "Siti Rahma,08987654321,Teman SMA\n" +
      "Andi Wijaya,08556677889,Rekan Kerja";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tamukita-template-tamu-${weddingSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (!content) return;

      const lines = content.split("\n").slice(1); // skip header
      const imported: GuestItem[] = lines
        .map((line, idx) => {
          const parts = line.split(",");
          const name = parts[0]?.trim();
          const phone = parts[1]?.trim();
          const notes = parts[2]?.trim();
          if (!name) return null;
          return {
            id: `imported-${Date.now()}-${idx}`,
            name,
            phone: phone || null,
            email: null,
            rsvp_status: "pending",
            seat_number: null,
            notes: notes || null,
          };
        })
        .filter(Boolean) as GuestItem[];

      setGuests((prev) => [...imported, ...prev]);
    };
    reader.readAsText(file);
  };

  const handleAddSingleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;

    const item: GuestItem = {
      id: `guest-${Date.now()}`,
      name: newGuestName,
      phone: newGuestPhone || null,
      email: null,
      rsvp_status: "pending",
      seat_number: null,
      notes: null,
    };
    setGuests([item, ...guests]);
    setNewGuestName("");
    setNewGuestPhone("");
    setShowAddModal(false);
  };

  const copyGuestLink = (guestName: string, id: string) => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const link = `${baseUrl}/${weddingSlug}?to=${encodeURIComponent(guestName)}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getWaMessageLink = (guestName: string, phone: string | null) => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const link = `${baseUrl}/${weddingSlug}?to=${encodeURIComponent(guestName)}`;
    const msg = `Halo ${guestName},\n\nKami mengundang Anda untuk hadir di pernikahan *${brideGroom}*.\n\nLihat undangan digital kami di link berikut:\n${link}\n\nTerima kasih!`;

    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="p-6">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Manajemen Tamu Undangan
          </h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">
            {brideGroom} — Slug:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-brand-600">
              /{weddingSlug}
            </code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTemplate}
            className="gap-1.5 rounded-full text-xs"
          >
            <Download size={14} /> Download Template Excel
          </Button>

          <label className="cursor-pointer">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="pointer-events-none gap-1.5 rounded-full text-xs"
            >
              <span>
                <Upload size={14} /> Import File Excel / CSV
              </span>
            </Button>
            <input
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <Button
            variant="brand"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="gap-1.5 rounded-full text-xs"
          >
            <Plus size={14} /> Tambah Tamu
          </Button>
        </div>
      </div>

      {/* WhatsApp Auto-Send Pro Banner Teaser */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-warm-50 to-gold-50 p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md">
            <Send size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold text-foreground">
                Kirim Undangan Otomatis via WhatsApp (Auto-WA)
              </span>
              <span className="shadow-xs flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                <Crown size={10} /> FITUR PRO
              </span>
            </div>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              Kirim link undangan kustom berstempel nama tamu ke 500+ nomor WhatsApp sekaligus
              secara otomatis!
            </p>
          </div>
        </div>
        <Button
          variant="brand"
          size="sm"
          onClick={() => setShowProModal(true)}
          className="rounded-full text-xs font-semibold shadow-brand-sm"
        >
          Aktifkan Fitur Auto-WA
        </Button>
      </div>

      {guests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Users size={22} className="text-brand-500" aria-hidden="true" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Belum ada tamu</h3>
          <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-muted-foreground">
            Tambahkan tamu satu per satu atau import file Excel/CSV untuk membuat link undangan
            otomatis.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-12 gap-3 border-b border-border bg-muted/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-3">Nama Tamu</div>
            <div className="col-span-2">No. WhatsApp</div>
            <div className="col-span-2">Status RSVP</div>
            <div className="col-span-3">Link Undangan Kustom (Slug)</div>
            <div className="col-span-2 text-right">Aksi WhatsApp</div>
          </div>

          <div className="divide-y divide-border">
            {guests.map((g) => {
              const status = rsvpLabel[g.rsvp_status] ?? rsvpLabel.pending;
              return (
                <div
                  key={g.id}
                  className="grid grid-cols-12 items-center gap-3 px-4 py-3.5 text-sm transition-colors hover:bg-muted/20"
                >
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-sans text-xs font-bold text-brand-700">
                      {g.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-sans font-medium text-foreground">{g.name}</p>
                      {g.notes && (
                        <p className="font-sans text-[11px] text-muted-foreground">{g.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 font-mono text-xs text-muted-foreground">
                    {g.phone || "—"}
                  </div>

                  <div className="col-span-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium",
                        status.style,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="col-span-3">
                    <button
                      onClick={() => copyGuestLink(g.name, g.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-2.5 py-1 font-mono text-xs text-brand-600 hover:bg-muted"
                      title="Klik untuk salin link undangan tamu"
                    >
                      {copiedId === g.id ? (
                        <>
                          <Check size={12} className="text-emerald-500" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> ?to={encodeURIComponent(g.name)}
                        </>
                      )}
                    </button>
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                    {/* Manual WA Link */}
                    {g.phone ? (
                      <a
                        href={getWaMessageLink(g.name, g.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100"
                        title="Kirim Manual via WhatsApp Web"
                      >
                        <MessageSquare size={14} />
                      </a>
                    ) : null}

                    {/* Auto-WA Pro Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowProModal(true)}
                      className="h-8 gap-1 rounded-full border-emerald-300 bg-emerald-50/50 text-[11px] text-emerald-700 hover:bg-emerald-100"
                    >
                      <Sparkles size={11} className="text-emerald-500" /> Auto-WA
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border bg-muted/20 px-4 py-3">
            <p className="font-sans text-xs text-muted-foreground">
              Total {guests.length} tamu terdaftar dalam daftar sebar undangan
            </p>
          </div>
        </div>
      )}

      {/* Add Single Guest Modal */}
      {showAddModal && (
        <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-foreground">Tambah Tamu Undangan</h3>
            <form onSubmit={handleAddSingleGuest} className="mt-4 space-y-4">
              <div>
                <label className="font-sans text-xs font-medium text-muted-foreground">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="font-sans text-xs font-medium text-muted-foreground">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 08123456789"
                  value={newGuestPhone}
                  onChange={(e) => setNewGuestPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full text-xs"
                >
                  Batal
                </Button>
                <Button type="submit" variant="brand" className="rounded-full text-xs">
                  Simpan Tamu
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pro Auto-WA Teaser Modal */}
      {showProModal && (
        <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-brand-200 bg-card p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-brand-500 text-white shadow-lg">
              <Crown size={28} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
              Fitur Auto-Send WhatsApp Pro
            </h3>
            <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground">
              Fitur otomatisasi ini akan mengirimkan pesan WhatsApp personalisasi (berisi nama tamu
              &amp; link kustom) langsung ke 500+ nomor WhatsApp tamu Anda tanpa perlu klik satu per
              satu!
            </p>

            <div className="my-5 space-y-2 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-4 text-left font-sans text-xs text-foreground">
              <p className="font-semibold text-brand-700">⚡ Keunggulan TamuKita Pro Auto-WA:</p>
              <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                <li>Integrasi WhatsApp Broadcast Gateway 1-Click</li>
                <li>Laporan status pengiriman (Terkirim, Dibaca)</li>
                <li>Generate link unik nama tamu otomatis</li>
              </ul>
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowProModal(false)}
                className="rounded-full text-xs"
              >
                Tutup
              </Button>
              <Button
                variant="brand"
                onClick={() => {
                  alert(
                    "Pengajuan Upgrade Pro telah terikirim! Tim TamuKita akan menghubungi Anda via WhatsApp.",
                  );
                  setShowProModal(false);
                }}
                className="rounded-full text-xs font-semibold shadow-brand-md"
              >
                Upgrade TamuKita Pro Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
