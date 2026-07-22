"use client";

import * as React from "react";
import { toast } from "sonner";
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
import { addGuestAction } from "@/lib/actions/guest-actions";
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
  const [userPlan, setUserPlan] = React.useState<string>("free");
  const [showBulkWaModal, setShowBulkWaModal] = React.useState(false);
  const [isSendingBulk, setIsSendingBulk] = React.useState(false);
  const [bulkProgress, setBulkProgress] = React.useState({ sent: 0, total: 0 });

  const weddingSlug = initialWedding?.slug || "sekar-dimas";
  const brideGroom = initialWedding
    ? `${initialWedding.bride_name} & ${initialWedding.groom_name}`
    : "Pernikahan TamuKita";

  // Fetch user plan from session/profile
  React.useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          if (data?.user?.plan) {
            setUserPlan(data.user.plan);
            console.log("[GuestsClient] User plan fetched:", data.user.plan);
          }
        }
      } catch (err) {
        console.error("[GuestsClient] Error fetching user plan:", err);
      }
    };
    fetchUserPlan();
  }, []);

  // Download Excel Template (.xls with title banner & 2 separate formatted columns)
  const handleDownloadTemplate = () => {
    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Daftar Tamu Undangan</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          th, td { font-family: Arial, sans-serif; font-size: 12px; }
        </style>
      </head>
      <body>
        <table border="1" style="border-collapse: collapse; border: 1px solid #d1d5db;">
          <tr>
            <th colspan="2" style="background-color: #8b5cf6; color: #ffffff; font-size: 14px; font-weight: bold; text-align: center; height: 38px; vertical-align: middle;">
              DAFTAR TAMU UNDANGAN PERNIKAHAN — TAMUKITA
            </th>
          </tr>
          <tr>
            <th style="background-color: #f3f4f6; color: #111827; font-weight: bold; width: 250px; text-align: left; padding: 10px;">
              Nama Tamu
            </th>
            <th style="background-color: #f3f4f6; color: #111827; font-weight: bold; width: 200px; text-align: left; padding: 10px;">
              Nomor WhatsApp
            </th>
          </tr>
          <tr>
            <td style="padding: 8px;">Budi Santoso</td>
            <td style="padding: 8px; mso-number-format:'\\@';">081234567890</td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Template-Daftar-Tamu-${weddingSlug}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Template Excel (.xls) 2 kolom berhasil di-download!");
  };

  // Import File Excel / CSV (Smart Parser for .xls, .csv, .tsv)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (!content) return;

      const imported: GuestItem[] = [];

      if (content.includes("<table") || content.includes("<td") || content.includes("<tr")) {
        // Parse HTML Table (.xls)
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const rows = Array.from(doc.querySelectorAll("tr"));

        rows.forEach((row, idx) => {
          const cols = Array.from(row.querySelectorAll("td, th")).map(
            (c) => c.textContent?.trim() || "",
          );
          if (cols.length >= 2) {
            const name = cols[0];
            const phone = cols[1];
            // Skip header or title banner
            if (
              !name ||
              name.toLowerCase().includes("daftar tamu") ||
              name.toLowerCase().includes("nama tamu") ||
              name.toLowerCase().includes("tamukita")
            ) {
              return;
            }
            imported.push({
              id: `imported-${Date.now()}-${idx}`,
              name,
              phone: phone || null,
              email: null,
              rsvp_status: "pending",
              seat_number: null,
              notes: null,
            });
          }
        });
      } else {
        // Parse CSV / TSV (supports semicolon, tab, or comma delimiters)
        const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);

        lines.forEach((line, idx) => {
          const delimiter = line.includes(";") ? ";" : line.includes("\t") ? "\t" : ",";
          const parts = line.split(delimiter);
          const name = parts[0]?.trim().replace(/^["']|["']$/g, "");
          const phone = parts[1]?.trim().replace(/^["']|["']$/g, "");

          if (
            !name ||
            name.toLowerCase().includes("nama tamu") ||
            name.toLowerCase().includes("daftar tamu")
          ) {
            return;
          }

          imported.push({
            id: `imported-${Date.now()}-${idx}`,
            name,
            phone: phone || null,
            email: null,
            rsvp_status: "pending",
            seat_number: null,
            notes: null,
          });
        });
      }

      if (imported.length > 0) {
        setGuests((prev) => [...imported, ...prev]);
        toast.success(`Berhasil mengimpor ${imported.length} tamu!`);
      } else {
        toast.error("Tidak ada data tamu yang valid ditemukan dalam file.");
      }
    };
    reader.readAsText(file);
  };

  const handleAddSingleGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName || !initialWedding) {
      toast.error("Nama tamu dan wedding harus ada");
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Menambah tamu...");

    // Save to database
    const result = await addGuestAction({
      weddingId: initialWedding.id,
      name: newGuestName,
      phone: newGuestPhone || undefined,
    });

    if ("error" in result && result.error) {
      toast.error(result.error, { id: toastId });
      return;
    }

    // Success — add to local state too
    const item: GuestItem = {
      id: result.guest!.id,
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

    toast.success("Tamu berhasil ditambahkan!", { id: toastId });
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

  const handleBulkWhatsAppSend = async () => {
    // Get guests with phone numbers
    const guestsWithPhone = guests.filter((g) => g.phone);

    if (guestsWithPhone.length === 0) {
      toast.error("Tidak ada guest dengan nomor WhatsApp");
      return;
    }

    setIsSendingBulk(true);
    setBulkProgress({ sent: 0, total: guestsWithPhone.length });

    // Send to each guest with delay
    for (let i = 0; i < guestsWithPhone.length; i++) {
      const guest = guestsWithPhone[i];
      const waLink = getWaMessageLink(guest.name, guest.phone);

      // Open WhatsApp in new window
      window.open(waLink, "_blank", "width=600,height=600");

      // Update progress
      setBulkProgress({ sent: i + 1, total: guestsWithPhone.length });

      // Delay between opens (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsSendingBulk(false);
    setShowBulkWaModal(false);
    toast.success(`Berhasil membuka ${guestsWithPhone.length} chat WhatsApp!`);
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
      {(userPlan === "free" || userPlan === "starter") && (
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
      )}

      {/* WhatsApp Bulk Send Banner - For Professional/Enterprise */}
      {(userPlan === "professional" || userPlan === "enterprise") && (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
              <Send size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-bold text-foreground">
                  Kirim Semua Undangan via WhatsApp
                </span>
                <span className="shadow-xs flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  <Check size={10} /> AKTIF
                </span>
              </div>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                Kirim link undangan ke semua tamu sekaligus — WhatsApp akan membuka satu per satu.
              </p>
            </div>
          </div>
          <Button
            variant="brand"
            size="sm"
            onClick={() => setShowBulkWaModal(true)}
            disabled={guests.filter((g) => g.phone).length === 0}
            className="rounded-full text-xs font-semibold shadow-brand-sm"
          >
            <Send size={12} /> Kirim Sekarang
          </Button>
        </div>
      )}

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
          {/* Mobile Card List View (For screens < 768px) */}
          <div className="block divide-y divide-border md:hidden">
            {guests.map((g) => {
              const status = rsvpLabel[g.rsvp_status] ?? rsvpLabel.pending;
              return (
                <div key={g.id} className="space-y-3 bg-card p-4 hover:bg-muted/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-sans text-sm font-bold text-brand-700">
                        {g.name[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-sans text-sm font-semibold text-foreground">
                          {g.name}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {g.phone || "Tanpa No. WA"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium",
                        status.style,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Catatan / Pesan Tamu */}
                  {g.notes && (
                    <div className="break-words rounded-xl border border-brand-200/60 bg-brand-50/40 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                      <span className="font-semibold text-brand-700">💬 Pesan:</span> {g.notes}
                    </div>
                  )}

                  {/* Slug Link Button */}
                  <div>
                    <button
                      onClick={() => copyGuestLink(g.name, g.id)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 font-mono text-xs text-brand-600 hover:bg-muted"
                    >
                      <span className="truncate">?to={encodeURIComponent(g.name)}</span>
                      {copiedId === g.id ? (
                        <span className="flex shrink-0 items-center gap-1 font-bold text-emerald-600">
                          <Check size={13} /> Tersalin!
                        </span>
                      ) : (
                        <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
                          <Copy size={13} /> Salin Link
                        </span>
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Action Buttons */}
                  <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-1">
                    <div className="flex items-center gap-2">
                      {g.phone ? (
                        <a
                          href={getWaMessageLink(g.name, g.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="shadow-xs flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 font-sans text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          <MessageSquare size={13} />
                          <span>Kirim WA</span>
                        </a>
                      ) : (
                        <span className="font-sans text-[11px] italic text-muted-foreground">
                          No WA belum diisi
                        </span>
                      )}
                    </div>
                    <div>
                      {userPlan === "professional" || userPlan === "enterprise" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-sans text-[10px] font-semibold text-emerald-700">
                          <Check size={11} /> Auto-WA
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowProModal(true)}
                          className="h-7 gap-1 rounded-full border-amber-300 bg-amber-50 text-[10px] font-semibold text-amber-800"
                        >
                          <Crown size={10} className="text-amber-600" /> Auto-WA Pro
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View (For screens >= 768px) */}
          <div className="hidden overflow-x-auto md:block">
            <div className="min-w-[800px]">
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
                      <div className="col-span-3 flex min-w-0 items-center gap-2.5">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-sans text-xs font-bold text-brand-700">
                          {g.name[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-sans font-semibold text-foreground">
                            {g.name}
                          </p>
                          {g.notes && (
                            <p
                              className="mt-0.5 line-clamp-2 break-words font-sans text-[11px] text-muted-foreground"
                              title={g.notes}
                            >
                              💬 {g.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 truncate font-mono text-xs text-muted-foreground">
                        {g.phone || "—"}
                      </div>

                      <div className="col-span-2">
                        <span
                          className={cn(
                            "whitespace-nowrap rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium",
                            status.style,
                          )}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="col-span-3">
                        <button
                          onClick={() => copyGuestLink(g.name, g.id)}
                          className="flex max-w-full items-center gap-1.5 truncate rounded-lg border border-border bg-muted/30 px-2.5 py-1 font-mono text-xs text-brand-600 hover:bg-muted"
                          title="Klik untuk salin link undangan tamu"
                        >
                          {copiedId === g.id ? (
                            <>
                              <Check size={12} className="shrink-0 text-emerald-500" /> Tersalin!
                            </>
                          ) : (
                            <>
                              <Copy size={12} className="shrink-0" /> ?to=
                              {encodeURIComponent(g.name)}
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
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100"
                            title="Kirim Manual via WhatsApp Web"
                          >
                            <MessageSquare size={14} />
                          </a>
                        ) : null}

                        {/* Auto-WA Pro Button - Only for pro plans */}
                        {userPlan === "professional" || userPlan === "enterprise" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="h-8 gap-1 whitespace-nowrap rounded-full border-emerald-300 bg-emerald-100 text-[11px] text-emerald-700"
                            title="Fitur Auto-WA sudah aktif untuk plan Anda"
                          >
                            <Check size={11} className="text-emerald-600" /> Auto-WA
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowProModal(true)}
                            className="h-8 gap-1 whitespace-nowrap rounded-full border-emerald-300 bg-emerald-50/50 text-[11px] text-emerald-700 hover:bg-emerald-100"
                          >
                            <Sparkles size={11} className="text-emerald-500" /> Auto-WA
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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

      {/* Bulk WhatsApp Send Modal */}
      {showBulkWaModal && (
        <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-emerald-200 bg-card p-6 text-center shadow-2xl">
            {isSendingBulk ? (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Send size={28} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Mengirim Undangan...
                </h3>
                <p className="mt-2 font-sans text-xs text-muted-foreground">
                  Sabar sebentar, sistem sedang membuka chat WhatsApp untuk setiap tamu.
                </p>

                {/* Progress Bar */}
                <div className="my-6 rounded-full bg-muted p-1">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                    style={{
                      width: `${(bulkProgress.sent / bulkProgress.total) * 100}%`,
                    }}
                  />
                </div>

                <p className="font-sans text-sm font-semibold text-foreground">
                  {bulkProgress.sent} / {bulkProgress.total} tamu
                </p>
                <p className="mt-1 font-sans text-xs text-muted-foreground">
                  Jangan tutup halaman ini sampai proses selesai
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Send size={28} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Kirim Undangan Ke Semua Tamu?
                </h3>
                <p className="mt-2 font-sans text-xs text-muted-foreground">
                  Sistem akan membuka chat WhatsApp ke setiap tamu dengan link undangan personal.
                  Proses ini akan membuka banyak tab browser.
                </p>

                <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-left font-sans text-xs text-foreground">
                  <p className="font-semibold text-emerald-700">📊 Rincian Pengiriman:</p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>Total tamu dengan nomor: {guests.filter((g) => g.phone).length}</li>
                    <li>Delay antar tamu: 1.5 detik</li>
                    <li>Format: Link personal ?to=Nama+Tamu</li>
                  </ul>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowBulkWaModal(false)}
                    className="rounded-full text-xs"
                  >
                    Batal
                  </Button>
                  <Button
                    variant="brand"
                    onClick={handleBulkWhatsAppSend}
                    disabled={isSendingBulk}
                    className="rounded-full text-xs font-semibold shadow-brand-md"
                  >
                    <Send size={12} /> Ya, Kirim Sekarang
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
