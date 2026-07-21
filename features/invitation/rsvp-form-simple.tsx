"use client";

import * as React from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateGuestRsvpAction, findGuestByNameAction } from "@/lib/actions/guest-actions";
import type { DemoTheme } from "@/features/demo/data";

export interface RsvpFormSimpleProps {
  theme: DemoTheme;
  weddingId?: string;
  guestName?: string; // passed from ?to= param
  guestId?: string; // guest ID from pre-populated list
}

export function RsvpFormSimple({
  theme,
  weddingId,
  guestName,
  guestId: initialGuestId,
}: RsvpFormSimpleProps) {
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"attending" | "maybe" | "not_attending">("attending");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [guestId, setGuestId] = React.useState<string | undefined>(initialGuestId);
  const [loading, setLoading] = React.useState(!initialGuestId && !!weddingId && !!guestName);

  // If guestName and weddingId provided but no guestId, find the guest
  React.useEffect(() => {
    if (initialGuestId) {
      setGuestId(initialGuestId);
      setLoading(false);
      return;
    }

    if (!weddingId || !guestName) {
      setLoading(false);
      return;
    }

    const findGuest = async () => {
      setLoading(true);
      const result = await findGuestByNameAction(weddingId, guestName);
      setLoading(false);

      if ("error" in result && result.error) {
        console.warn("[RsvpFormSimple] Guest lookup failed:", result.error);
        setError(result.error);
        return;
      }

      setGuestId(result.guestId);
    };

    findGuest();
  }, [weddingId, guestName, initialGuestId]);

  // Demo wishes for display
  const [wishes, setWishes] = React.useState([
    { name: "Budi Santoso", status: "attending", message: "Selamat atas pernikahan kalian!" },
    { name: "Siti Nurhaliza", status: "attending", message: "Semoga bahagia selamanya" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Pesan tidak boleh kosong");
      toast.error("Silakan tulis pesan Anda");
      return;
    }

    if (!guestName) {
      setError("Nama tamu tidak ditemukan");
      toast.error("Nama Anda tidak ditemukan di daftar tamu");
      return;
    }

    if (!guestId) {
      setError("ID Tamu tidak valid");
      toast.error("Terjadi kesalahan, silakan coba lagi");
      return;
    }

    setSubmitting(true);
    setError(null);

    // Show loading toast
    const toastId = toast.loading("Menyimpan RSVP...");

    // Update existing guest
    const result = await updateGuestRsvpAction({
      guestId,
      status,
      notes: message,
    });

    setSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      toast.error(result.error, { id: toastId });
      return;
    }

    // Success
    setMessage("");
    setSubmitted(true);

    toast.success("RSVP berhasil disimpan! Terima kasih 🎉", { id: toastId });

    setTimeout(() => setSubmitted(false), 3000);

    // Add to demo wishes for display
    setWishes((prev) => [...prev, { name: guestName, status, message }]);
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* RSVP Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border p-6 text-left shadow-xl"
        style={{ borderColor: theme.palette.border, background: theme.palette.card }}
      >
        <div>
          <h3 className="font-display text-sm font-semibold" style={{ color: theme.palette.text }}>
            Konfirmasi Kehadiran
          </h3>
          <p className="mt-1 font-sans text-xs" style={{ color: theme.palette.textMuted }}>
            Halo {guestName || "Tamu Spesial"}, silakan konfirmasi kehadiran Anda
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-lg bg-amber-50 p-2 text-xs text-amber-700">
            Mencari nama Anda di daftar tamu...
          </div>
        )}

        {/* Error or Not Found State */}
        {!loading && error && (
          <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600">{error}</div>
        )}

        {/* Status Selection */}
        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Status Kehadiran
          </Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            disabled={submitting || loading || !!error}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2"
            style={{ "--tw-ring-color": theme.palette.accent } as React.CSSProperties}
          >
            <option value="attending">✓ Akan Hadir</option>
            <option value="maybe">? Mungkin Hadir</option>
            <option value="not_attending">✗ Tidak Bisa Hadir</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Pesan & Ucapan
          </Label>
          <textarea
            placeholder="Tulis doa dan ucapan terbaik Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting || loading || !!error}
            rows={4}
            className="w-full rounded-lg border border-input bg-background p-2 text-xs outline-none focus:ring-2"
            style={{ "--tw-ring-color": theme.palette.accent } as React.CSSProperties}
          />
        </div>

        {submitted && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-600">
            <CheckCircle2 size={14} /> Terima kasih atas ucapan Anda!
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting || submitted || loading || !!error || !guestId}
          className="gap-1.5 text-xs"
          style={{
            background: submitted ? "#10b981" : theme.palette.accent,
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={13} className="animate-spin" /> Mengirim...
            </>
          ) : submitted ? (
            <>
              <CheckCircle2 size={13} /> Terkirim!
            </>
          ) : (
            <>
              <Send size={13} /> Kirim Ucapan
            </>
          )}
        </Button>
      </form>

      {/* Wishes List */}
      <div
        className="flex flex-col gap-3 rounded-3xl border p-6 shadow-xl"
        style={{ borderColor: theme.palette.border, background: theme.palette.card }}
      >
        <h3 className="font-display text-sm font-semibold" style={{ color: theme.palette.text }}>
          Daftar Ucapan ({wishes.length})
        </h3>
        <div className="max-h-96 space-y-3 overflow-y-auto">
          {wishes.length === 0 ? (
            <p className="text-xs" style={{ color: theme.palette.textMuted }}>
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          ) : (
            wishes.map((wish, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border/20 p-3"
                style={{ background: theme.palette.bg }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold" style={{ color: theme.palette.text }}>
                    {wish.name}
                  </span>
                  <span
                    className="rounded-full px-2 py-1 text-[10px] font-medium"
                    style={{
                      background:
                        wish.status === "attending"
                          ? "#10b98120"
                          : wish.status === "maybe"
                            ? "#f59e0b20"
                            : "#ef444420",
                      color:
                        wish.status === "attending"
                          ? "#10b981"
                          : wish.status === "maybe"
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  >
                    {wish.status === "attending"
                      ? "Hadir"
                      : wish.status === "maybe"
                        ? "Mungkin"
                        : "Tidak Hadir"}
                  </span>
                </div>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: theme.palette.textMuted }}
                >
                  {wish.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
