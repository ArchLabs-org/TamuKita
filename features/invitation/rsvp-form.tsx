"use client";

import * as React from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveGuestRsvpAction } from "@/lib/actions/guest-actions";
import type { DemoTheme } from "@/features/demo/data";

interface RsvpFormProps {
  theme: DemoTheme;
  weddingId?: string;
  slug: string;
}

export function RsvpForm({ theme, weddingId, slug }: RsvpFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("attending");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Debug: log props
  React.useEffect(() => {
    console.log("[RsvpForm] weddingId:", weddingId, "slug:", slug);
  }, [weddingId, slug]);

  // Demo wishes (fallback if no weddingId)
  const [wishes, setWishes] = React.useState([
    { name: "Budi Santoso", status: "attending", message: "Selamat atas pernikahan kalian!" },
    { name: "Siti Nurhaliza", status: "attending", message: "Semoga bahagia selamanya" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      setError("Nama dan pesan tidak boleh kosong");
      return;
    }

    setSubmitting(true);
    setError(null);

    // If no wedding ID, show error
    if (!weddingId) {
      setError("ID Undangan tidak ditemukan. Tidak bisa menyimpan RSVP.");
      setSubmitting(false);
      return;
    }

    // Save to database
    const result = await saveGuestRsvpAction({
      weddingId,
      name,
      email: email || undefined,
      rsvpStatus: (status as "attending" | "maybe" | "not_attending") || "pending",
      notes: message,
    });

    setSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    // Success
    setName("");
    setEmail("");
    setMessage("");
    setStatus("attending");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    // Add to demo wishes for immediate feedback
    setWishes((prev) => [
      ...prev,
      { name, status: status as "attending" | "maybe" | "not_attending", message },
    ]);
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border p-6 text-left shadow-xl"
        style={{ borderColor: theme.palette.border, background: theme.palette.card }}
      >
        <h3 className="font-display text-sm font-semibold" style={{ color: theme.palette.text }}>
          Konfirmasi Kehadiran
        </h3>

        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Nama Lengkap
          </Label>
          <Input
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            className="text-xs"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Email (Opsional)
          </Label>
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="text-xs"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Status Kehadiran
          </Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={submitting}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2"
            style={{ "--tw-ring-color": theme.palette.accent } as React.CSSProperties}
          >
            <option value="attending">Akan Hadir</option>
            <option value="maybe">Mungkin Hadir</option>
            <option value="not_attending">Tidak Bisa Hadir</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs" style={{ color: theme.palette.textMuted }}>
            Doa &amp; Ucapan
          </Label>
          <textarea
            placeholder="Tulis doa dan ucapan terbaik Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitting}
            rows={4}
            className="w-full rounded-lg border border-input bg-background p-2 text-xs outline-none focus:ring-2"
            style={{ "--tw-ring-color": theme.palette.accent } as React.CSSProperties}
          />
        </div>

        {error && <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600">{error}</div>}

        {submitted && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-600">
            <CheckCircle2 size={14} /> Terima kasih atas ucapan Anda!
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting || submitted}
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
              <Send size={13} className="mr-2" /> Kirim Ucapan
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
                <div className="flex items-center justify-between gap-2">
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
                  className="mt-1.5 text-[11px] leading-relaxed"
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
