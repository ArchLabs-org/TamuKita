"use client";

import * as React from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  updateGuestRsvpAction,
  saveGuestRsvpAction,
  findGuestByNameAction,
} from "@/lib/actions/guest-actions";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface RSVPProps {
  config: HeritageRoyaleConfig;
  weddingId?: string;
  guestName?: string;
  guestId?: string;
}

export function RSVP({ config, weddingId, guestName, guestId: initialGuestId }: RSVPProps) {
  const [name, setName] = React.useState(guestName || "");
  const [status, setStatus] = React.useState<"attending" | "maybe" | "not_attending">("attending");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [guestId, setGuestId] = React.useState<string | undefined>(initialGuestId);
  const [loading, setLoading] = React.useState(!initialGuestId && !!weddingId && !!guestName);

  // Sync wishes list with initial ones from client or database
  const [wishes, setWishes] = React.useState([
    {
      name: "Budi Santoso",
      status: "attending",
      message: "Selamat atas pernikahan kalian! Semoga sakinah mawaddah warahmah.",
    },
    {
      name: "Siti Nurhaliza",
      status: "attending",
      message: "Selamat menempuh hidup baru untuk Sekar & Dimas!",
    },
    {
      name: "Andi Wijaya",
      status: "not_attending",
      message: "Selamat ya! Maaf berhalangan hadir karena sedang di luar kota.",
    },
  ]);

  // Lookup guest by name if not provided
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
        console.log("[RSVP] Guest lookup note:", result.error);
        return;
      }

      if ("guestId" in result && result.guestId) {
        setGuestId(result.guestId);
      }
    };

    findGuest();
  }, [weddingId, guestName, initialGuestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Pesan tidak boleh kosong");
      toast.error("Silakan tulis pesan Anda");
      return;
    }

    if (!name.trim()) {
      setError("Nama tidak boleh kosong");
      toast.error("Silakan masukkan nama Anda");
      return;
    }

    setSubmitting(true);
    setError(null);

    const toastId = toast.loading("Menyimpan RSVP...");

    let result;
    if (guestId) {
      result = await updateGuestRsvpAction({
        guestId,
        status,
        notes: message,
      });
    } else if (weddingId) {
      result = await saveGuestRsvpAction({
        weddingId,
        name: name,
        rsvpStatus: status,
        notes: message,
      });
    } else {
      result = { success: true };
    }

    setSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      toast.error(result.error, { id: toastId });
      return;
    }

    // Success
    setSubmitted(true);
    toast.success("RSVP berhasil disimpan! Terima kasih 🎉", { id: toastId });

    // Append to wishes list dynamically
    setWishes((prev) => [{ name: name, status: status, message: message }, ...prev]);

    setMessage("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#EEF2F7" }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              RSVP &amp; UCAPAN DOA
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Konfirmasi Kehadiran &amp; Doa Restu
            </h2>
          </FadeIn>

          {loading && (
            <div className="mx-auto mb-6 mt-4 max-w-md rounded-2xl bg-amber-50 p-3 text-xs text-amber-700">
              Mencari nama Anda di daftar tamu...
            </div>
          )}

          {error && (
            <div className="mx-auto mb-6 mt-4 max-w-md rounded-2xl bg-red-50 p-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-10 text-left lg:grid-cols-2">
            {/* Form */}
            <FadeIn direction="left" className="h-full">
              <div
                className="flex h-full flex-col justify-between rounded-3xl p-6 shadow-xl sm:p-8"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      className="block font-sans text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#4A6984" }}
                    >
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="mt-2 w-full rounded-2xl px-4 py-3 font-sans text-sm outline-none"
                      style={{
                        border: "2px solid #E2E8F0",
                        backgroundColor: "#FBF9F5",
                        color: "#1E3A5F",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#4A6984" }}
                    >
                      Status Kehadiran
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["attending", "maybe", "not_attending"] as const).map((s) => {
                        const labels = {
                          attending: "Hadir",
                          maybe: "Mungkin",
                          not_attending: "Absen",
                        };
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStatus(s)}
                            className="rounded-2xl py-3 font-sans text-xs font-bold transition-all"
                            style={{
                              border: `2px solid ${status === s ? "#1E3A5F" : "#E2E8F0"}`,
                              backgroundColor: status === s ? "#1E3A5F" : "#FBF9F5",
                              color: status === s ? "#FFFFFF" : "#4A6984",
                            }}
                          >
                            {labels[s]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block font-sans text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#4A6984" }}
                    >
                      Pesan &amp; Ucapan Doa
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan ucapan selamat & doa terbaik Anda..."
                      className="mt-2 w-full rounded-2xl px-4 py-3 font-sans text-sm outline-none"
                      style={{
                        border: "2px solid #E2E8F0",
                        backgroundColor: "#FBF9F5",
                        color: "#1E3A5F",
                      }}
                    />
                  </div>

                  {submitted && (
                    <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-600">
                      ✓ Konfirmasi &amp; ucapan Anda berhasil disimpan!
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-sans text-xs font-black uppercase tracking-widest shadow-lg transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Mengirim...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Kirim Konfirmasi
                      </>
                    )}
                  </button>
                </form>
              </div>
            </FadeIn>

            {/* Wishes Display Wall */}
            <FadeIn direction="right" className="h-full">
              <div
                className="flex h-full flex-col justify-between rounded-3xl p-6 shadow-xl sm:p-8"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
              >
                <div>
                  <h3 className="mb-4 font-serif text-lg font-bold" style={{ color: "#1E3A5F" }}>
                    Daftar Ucapan Doa ({wishes.length})
                  </h3>
                  <div className="max-h-[320px] space-y-4 overflow-y-auto pr-2">
                    {wishes.map((w, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl p-4 transition-all"
                        style={{
                          backgroundColor: "#FBF9F5",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className="font-serif text-xs font-bold"
                            style={{ color: "#1E3A5F" }}
                          >
                            {w.name}
                          </span>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold"
                            style={{
                              backgroundColor:
                                w.status === "attending"
                                  ? "#10B98115"
                                  : w.status === "maybe"
                                    ? "#F59E0B15"
                                    : "#EF444415",
                              color:
                                w.status === "attending"
                                  ? "#10B981"
                                  : w.status === "maybe"
                                    ? "#F59E0B"
                                    : "#EF4444",
                            }}
                          >
                            {w.status === "attending"
                              ? "Hadir"
                              : w.status === "maybe"
                                ? "Mungkin"
                                : "Absen"}
                          </span>
                        </div>
                        <p className="font-sans text-xs italic" style={{ color: "#4A6984" }}>
                          &ldquo;{w.message}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <SectionFloralDivider />
    </>
  );
}
