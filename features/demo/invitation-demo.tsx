"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Music2,
  VolumeX,
  MapPin,
  Calendar,
  Clock,
  Heart,
  ChevronDown,
  Copy,
  ExternalLink,
  Gift,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import type { DemoTheme } from "./data";

/* ─────────────────────────────────────────
   Countdown hook
───────────────────────────────────────── */
function useCountdown(target: string) {
  const calc = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = React.useState(calc);
  React.useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

/* ─────────────────────────────────────────
   Floral ornament SVG (reusable)
───────────────────────────────────────── */
function FloralOrnament({
  color,
  size = 80,
  petals = 8,
  opacity = 0.15,
  rotate = 0,
}: {
  color: string;
  size?: number;
  petals?: number;
  opacity?: number;
  rotate?: number;
}) {
  const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
    >
      {angles.map((d) => (
        <g key={d} transform={`rotate(${d} ${size / 2} ${size / 2})`}>
          <ellipse
            cx={size / 2}
            cy={size * 0.18}
            rx={size * 0.055}
            ry={size * 0.18}
            fill={color}
          />
        </g>
      ))}
      <circle cx={size / 2} cy={size / 2} r={size * 0.05} fill={color} />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Section: Cover / Opening
───────────────────────────────────────── */
function CoverSection({ theme, onOpen }: { theme: DemoTheme; onOpen: () => void }) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: theme.palette.bg }}
    >
      {/* Corner ornaments */}
      <div className="pointer-events-none absolute left-4 top-4">
        <FloralOrnament color={theme.palette.accent} size={100} opacity={0.12} />
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 rotate-180">
        <FloralOrnament color={theme.palette.accent} size={80} petals={6} opacity={0.1} />
      </div>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <FloralOrnament color={theme.palette.accent} size={60} petals={6} opacity={0.08} rotate={30} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center px-8 text-center"
      >
        <p
          className="font-sans text-xs uppercase tracking-[0.28em]"
          style={{ color: theme.palette.textMuted }}
        >
          Together with their families
        </p>

        {/* Top line ornament */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px w-16" style={{ background: theme.palette.border }} />
          <FloralOrnament color={theme.palette.accent} size={24} petals={8} opacity={0.6} />
          <div className="h-px w-16" style={{ background: theme.palette.border }} />
        </div>

        <p
          className="font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted, opacity: 0.6 }}
        >
          The Wedding of
        </p>

        <h1
          className="mt-3 font-display text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.bride.split(" ")[0]}
        </h1>
        <div className="my-3 flex items-center gap-4">
          <div className="h-px w-20" style={{ background: theme.palette.border }} />
          <span
            className="font-display text-2xl font-light"
            style={{ color: theme.palette.accent, opacity: 0.7 }}
          >
            &amp;
          </span>
          <div className="h-px w-20" style={{ background: theme.palette.border }} />
        </div>
        <h1
          className="font-display text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.groom.split(" ")[0]}
        </h1>

        {/* Date */}
        <div
          className="mt-6 rounded-full border px-5 py-2 font-sans text-xs uppercase tracking-widest"
          style={{ borderColor: theme.palette.border, color: theme.palette.textMuted }}
        >
          {theme.event.reception.date}
        </div>

        {/* Open button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 flex flex-col items-center gap-2 font-sans text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ color: theme.palette.accent }}
        >
          <span>Buka Undangan</span>
          <ChevronDown size={16} className="animate-bounce" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Countdown
───────────────────────────────────────── */
function CountdownSection({ theme }: { theme: DemoTheme }) {
  const { days, hours, minutes, seconds } = useCountdown(theme.event.countdown);

  const units = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <section
      className="py-20 px-4 text-center"
      style={{ background: theme.palette.bgSecondary }}
    >
      <div className="mx-auto max-w-2xl">
        <FloralOrnament color={theme.palette.accent} size={36} opacity={0.4} />
        <p
          className="mt-4 font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted }}
        >
          Menuju Hari Istimewa
        </p>
        <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6">
          {units.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="flex h-16 w-full items-center justify-center rounded-xl border sm:h-20"
                style={{
                  background: theme.palette.card,
                  borderColor: theme.palette.border,
                }}
              >
                <span
                  className="font-display text-3xl font-light tabular-nums sm:text-4xl"
                  style={{ color: theme.palette.accent }}
                >
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span
                className="font-sans text-[10px] uppercase tracking-widest"
                style={{ color: theme.palette.textMuted }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Bride & Groom
───────────────────────────────────────── */
function CoupleSection({ theme }: { theme: DemoTheme }) {
  return (
    <section className="py-20 px-4" style={{ background: theme.palette.bg }}>
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted }}
        >
          Mempelai
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="h-px flex-1" style={{ background: theme.palette.border }} />
          <FloralOrnament color={theme.palette.accent} size={28} opacity={0.5} />
          <div className="h-px flex-1" style={{ background: theme.palette.border }} />
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {/* Bride */}
          <div className="flex flex-col items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full border-2"
              style={{
                background: theme.palette.accentLight,
                borderColor: theme.palette.border,
              }}
              aria-hidden="true"
            >
              <span className="font-display text-3xl" style={{ color: theme.palette.accent }}>
                {theme.couple.bride[0]}
              </span>
            </div>
            <h2
              className="mt-4 font-display text-2xl font-light"
              style={{ color: theme.palette.text }}
            >
              {theme.couple.bride}
            </h2>
            <p
              className="mt-1 font-sans text-xs leading-relaxed"
              style={{ color: theme.palette.textMuted }}
            >
              {theme.couple.brideParents}
            </p>
          </div>

          {/* Groom */}
          <div className="flex flex-col items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full border-2"
              style={{
                background: theme.palette.accentLight,
                borderColor: theme.palette.border,
              }}
              aria-hidden="true"
            >
              <span className="font-display text-3xl" style={{ color: theme.palette.accent }}>
                {theme.couple.groom[0]}
              </span>
            </div>
            <h2
              className="mt-4 font-display text-2xl font-light"
              style={{ color: theme.palette.text }}
            >
              {theme.couple.groom}
            </h2>
            <p
              className="mt-1 font-sans text-xs leading-relaxed"
              style={{ color: theme.palette.textMuted }}
            >
              {theme.couple.groomParents}
            </p>
          </div>
        </div>

        {/* Love story */}
        <div
          className="mx-auto mt-10 max-w-lg rounded-2xl border p-6"
          style={{ background: theme.palette.bgSecondary, borderColor: theme.palette.border }}
        >
          <Heart
            size={18}
            className="mx-auto mb-3"
            style={{ color: theme.palette.accent }}
            aria-hidden="true"
          />
          <p
            className="font-display text-sm leading-relaxed italic"
            style={{ color: theme.palette.textMuted }}
          >
            &ldquo;{theme.couple.story}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Event Details
───────────────────────────────────────── */
function EventSection({ theme }: { theme: DemoTheme }) {
  return (
    <section
      className="py-20 px-4"
      style={{ background: theme.palette.bgSecondary }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p
            className="font-sans text-xs uppercase tracking-[0.2em]"
            style={{ color: theme.palette.textMuted }}
          >
            Rangkaian Acara
          </p>
          <h2
            className="mt-2 font-display text-3xl font-light"
            style={{ color: theme.palette.text }}
          >
            Hari Istimewa Kami
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            { label: "Akad Nikah", ev: theme.event.akad },
            { label: "Resepsi", ev: theme.event.reception },
          ].map(({ label, ev }) => (
            <div
              key={label}
              className="overflow-hidden rounded-2xl border"
              style={{ background: theme.palette.card, borderColor: theme.palette.border }}
            >
              {/* Card header */}
              <div
                className="px-6 py-3 text-center"
                style={{ background: theme.palette.accentLight }}
              >
                <p
                  className="font-sans text-xs font-semibold uppercase tracking-widest"
                  style={{ color: theme.palette.accent }}
                >
                  {label}
                </p>
              </div>

              <div className="space-y-3 p-6">
                <div className="flex items-start gap-3">
                  <Calendar
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: theme.palette.accent }}
                    aria-hidden="true"
                  />
                  <p
                    className="font-sans text-sm font-medium"
                    style={{ color: theme.palette.text }}
                  >
                    {ev.date}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: theme.palette.accent }}
                    aria-hidden="true"
                  />
                  <p className="font-sans text-sm" style={{ color: theme.palette.textMuted }}>
                    {ev.time}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: theme.palette.accent }}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      className="font-sans text-sm font-medium"
                      style={{ color: theme.palette.text }}
                    >
                      {ev.venue}
                    </p>
                    <p
                      className="mt-0.5 font-sans text-xs leading-relaxed"
                      style={{ color: theme.palette.textMuted }}
                    >
                      {ev.address}
                    </p>
                  </div>
                </div>

                {/* Maps button */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ev.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 font-sans text-xs transition-opacity hover:opacity-70"
                  style={{ color: theme.palette.accent }}
                >
                  <ExternalLink size={11} aria-hidden="true" />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Gallery
───────────────────────────────────────── */
function GallerySection({ theme }: { theme: DemoTheme }) {
  return (
    <section className="py-20 px-4" style={{ background: theme.palette.bg }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p
            className="font-sans text-xs uppercase tracking-[0.2em]"
            style={{ color: theme.palette.textMuted }}
          >
            Galeri
          </p>
          <h2
            className="mt-2 font-display text-3xl font-light"
            style={{ color: theme.palette.text }}
          >
            Momen Berharga
          </h2>
        </div>

        {/* Masonry-style gallery grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {theme.gallery.map((grad, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`overflow-hidden rounded-xl bg-gradient-to-br ${grad} ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
              style={{
                border: `1px solid ${theme.palette.border}`,
              }}
            >
              {/* Overlay with "Photo" label */}
              <div className="flex h-full items-center justify-center opacity-30">
                <span
                  className="font-display text-xs uppercase tracking-widest"
                  style={{ color: theme.palette.accent }}
                >
                  Foto {i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Love Story Timeline
───────────────────────────────────────── */
function TimelineSection({ theme }: { theme: DemoTheme }) {
  return (
    <section
      className="py-20 px-4"
      style={{ background: theme.palette.bgSecondary }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p
            className="font-sans text-xs uppercase tracking-[0.2em]"
            style={{ color: theme.palette.textMuted }}
          >
            Perjalanan Cinta
          </p>
          <h2
            className="mt-2 font-display text-3xl font-light"
            style={{ color: theme.palette.text }}
          >
            Kisah Kita
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute bottom-0 left-[5.5rem] top-0 w-px sm:left-1/2"
            style={{ background: theme.palette.border }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {theme.timeline.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRight ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex items-start gap-4 sm:gap-0"
                >
                  {/* Desktop layout */}
                  <div
                    className={`hidden w-full sm:grid sm:grid-cols-2 sm:gap-8 ${isRight ? "" : "sm:[&>*:first-child]:order-last sm:[&>*:last-child]:order-first"}`}
                  >
                    <div
                      className={`rounded-xl border p-4 ${isRight ? "text-right" : "text-left"}`}
                      style={{
                        background: theme.palette.card,
                        borderColor: theme.palette.border,
                      }}
                    >
                      <span
                        className="font-display text-lg font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {item.year}
                      </span>
                      <p
                        className="mt-0.5 font-sans text-sm font-medium"
                        style={{ color: theme.palette.text }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="mt-1 font-sans text-xs leading-relaxed"
                        style={{ color: theme.palette.textMuted }}
                      >
                        {item.desc}
                      </p>
                    </div>
                    {/* Center dot */}
                    <div className="flex items-center justify-center">
                      <div
                        className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2"
                        style={{
                          background: theme.palette.accentLight,
                          borderColor: theme.palette.accent,
                        }}
                        aria-hidden="true"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ background: theme.palette.accent }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="flex w-full items-start gap-4 sm:hidden">
                    <div className="flex flex-col items-center">
                      <div
                        className="z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2"
                        style={{
                          background: theme.palette.accentLight,
                          borderColor: theme.palette.accent,
                        }}
                        aria-hidden="true"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ background: theme.palette.accent }}
                        />
                      </div>
                    </div>
                    <div
                      className="flex-1 rounded-xl border p-4"
                      style={{
                        background: theme.palette.card,
                        borderColor: theme.palette.border,
                      }}
                    >
                      <span
                        className="font-display text-base font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {item.year}
                      </span>
                      <p
                        className="mt-0.5 font-sans text-sm font-medium"
                        style={{ color: theme.palette.text }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="mt-1 font-sans text-xs leading-relaxed"
                        style={{ color: theme.palette.textMuted }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: RSVP Preview
───────────────────────────────────────── */
function RsvpSection({ theme }: { theme: DemoTheme }) {
  const [selected, setSelected] = React.useState<"hadir" | "tidak" | null>(null);
  const [name, setName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name && selected) setSubmitted(true);
  }

  return (
    <section className="py-20 px-4" style={{ background: theme.palette.bg }}>
      <div className="mx-auto max-w-md text-center">
        <p
          className="font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted }}
        >
          Konfirmasi Kehadiran
        </p>
        <h2
          className="mt-2 font-display text-3xl font-light"
          style={{ color: theme.palette.text }}
        >
          RSVP
        </h2>
        <p
          className="mt-3 font-sans text-sm leading-relaxed"
          style={{ color: theme.palette.textMuted }}
        >
          Mohon konfirmasi kehadiran Anda sebelum{" "}
          <strong style={{ color: theme.palette.text }}>1 Oktober 2025</strong>
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl border p-8"
            style={{ background: theme.palette.bgSecondary, borderColor: theme.palette.border }}
          >
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: theme.palette.accentLight }}
            >
              <Check size={24} style={{ color: theme.palette.accent }} aria-hidden="true" />
            </div>
            <p
              className="font-display text-lg font-light"
              style={{ color: theme.palette.text }}
            >
              Terima kasih, {name}!
            </p>
            <p
              className="mt-2 font-sans text-sm"
              style={{ color: theme.palette.textMuted }}
            >
              {selected === "hadir"
                ? "Kami sangat senang Anda akan hadir. Sampai jumpa di hari istimewa kami!"
                : "Sayang sekali Anda tidak bisa hadir. Doa dan restu Anda sangat berarti bagi kami."}
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="rsvp-name"
                className="block font-sans text-xs font-medium uppercase tracking-wide"
                style={{ color: theme.palette.textMuted }}
              >
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
                className="mt-1.5 w-full rounded-xl border bg-transparent px-4 py-3 font-sans text-sm outline-none transition-colors placeholder:opacity-40"
                style={{
                  borderColor: theme.palette.border,
                  color: theme.palette.text,
                  background: theme.palette.card,
                }}
              />
            </div>

            <div>
              <p
                className="mb-2 font-sans text-xs font-medium uppercase tracking-wide"
                style={{ color: theme.palette.textMuted }}
              >
                Kehadiran
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "hadir" as const, label: "✓ Hadir" },
                  { value: "tidak" as const, label: "✗ Tidak Hadir" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelected(opt.value)}
                    className="rounded-xl border py-3 font-sans text-sm font-medium transition-all"
                    style={{
                      borderColor:
                        selected === opt.value ? theme.palette.accent : theme.palette.border,
                      background:
                        selected === opt.value
                          ? theme.palette.accentLight
                          : theme.palette.card,
                      color:
                        selected === opt.value
                          ? theme.palette.accent
                          : theme.palette.textMuted,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!name || !selected}
              className="w-full rounded-xl py-3 font-sans text-sm font-medium uppercase tracking-widest text-white transition-opacity disabled:opacity-40"
              style={{ background: theme.palette.accent }}
            >
              Kirim Konfirmasi
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Wedding Gift
───────────────────────────────────────── */
function GiftSection({ theme }: { theme: DemoTheme }) {
  const [copied, setCopied] = React.useState<string | null>(null);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <section
      className="py-20 px-4"
      style={{ background: theme.palette.bgSecondary }}
    >
      <div className="mx-auto max-w-md text-center">
        <Gift
          size={22}
          className="mx-auto mb-4"
          style={{ color: theme.palette.accent }}
          aria-hidden="true"
        />
        <p
          className="font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted }}
        >
          Hadiah Pernikahan
        </p>
        <h2
          className="mt-2 font-display text-3xl font-light"
          style={{ color: theme.palette.text }}
        >
          Amplop Digital
        </h2>
        <p
          className="mt-3 font-sans text-sm leading-relaxed"
          style={{ color: theme.palette.textMuted }}
        >
          Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami. Namun jika
          Anda berkenan memberikan hadiah, berikut informasinya.
        </p>

        <div className="mt-8 space-y-3">
          {theme.gifts.map((gift, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border p-4"
              style={{ background: theme.palette.card, borderColor: theme.palette.border }}
            >
              <div className="text-left">
                <p
                  className="font-sans text-xs font-semibold uppercase tracking-wide"
                  style={{ color: theme.palette.accent }}
                >
                  {gift.bank}
                </p>
                <p
                  className="mt-0.5 font-sans text-base font-medium tracking-widest"
                  style={{ color: theme.palette.text }}
                >
                  {gift.account}
                </p>
                <p
                  className="font-sans text-xs"
                  style={{ color: theme.palette.textMuted }}
                >
                  a/n {gift.name}
                </p>
              </div>
              <button
                onClick={() => copy(gift.account, `${i}`)}
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 font-sans text-xs transition-all hover:opacity-70"
                style={{
                  borderColor: theme.palette.border,
                  color: copied === `${i}` ? theme.palette.accent : theme.palette.textMuted,
                }}
                aria-label={`Salin nomor rekening ${gift.bank}`}
              >
                {copied === `${i}` ? (
                  <><Check size={11} aria-hidden="true" /> Disalin</>
                ) : (
                  <><Copy size={11} aria-hidden="true" /> Salin</>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Section: Closing
───────────────────────────────────────── */
function ClosingSection({ theme }: { theme: DemoTheme }) {
  return (
    <section
      className="relative overflow-hidden py-24 px-4 text-center"
      style={{ background: theme.palette.bg }}
    >
      {/* Background ornaments */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <FloralOrnament color={theme.palette.accent} size={400} petals={12} opacity={1} />
      </div>

      <div className="relative mx-auto max-w-md">
        <FloralOrnament
          color={theme.palette.accent}
          size={48}
          opacity={0.4}
        />

        <h2
          className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.bride.split(" ")[0]}
          <br />
          <span className="font-display text-2xl font-light opacity-60">&amp;</span>
          <br />
          {theme.couple.groom.split(" ")[0]}
        </h2>

        <div className="my-6 flex items-center justify-center gap-4">
          <div className="h-px w-16" style={{ background: theme.palette.border }} />
          <span className="font-display text-sm" style={{ color: theme.palette.accent }}>✦</span>
          <div className="h-px w-16" style={{ background: theme.palette.border }} />
        </div>

        <p
          className="font-display text-sm italic leading-relaxed"
          style={{ color: theme.palette.textMuted }}
        >
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tentram
          kepadanya.&rdquo;
        </p>
        <p
          className="mt-2 font-sans text-xs uppercase tracking-widest"
          style={{ color: theme.palette.textMuted, opacity: 0.5 }}
        >
          QS. Ar-Rum: 21
        </p>

        <p
          className="mt-8 font-sans text-sm leading-relaxed"
          style={{ color: theme.palette.textMuted }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu.
        </p>

        <p
          className="mt-6 font-display text-lg"
          style={{ color: theme.palette.text }}
        >
          Kami yang berbahagia,
        </p>
        <p
          className="mt-1 font-display text-xl font-light"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.bride} & {theme.couple.groom}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12" style={{ background: theme.palette.border }} />
          <Heart
            size={14}
            style={{ color: theme.palette.accent, fill: theme.palette.accent }}
            aria-hidden="true"
          />
          <div className="h-px w-12" style={{ background: theme.palette.border }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Demo navigation bar
───────────────────────────────────────── */
function DemoNav({ theme }: { theme: DemoTheme }) {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md"
      style={{
        background: `${theme.palette.bg}e0`,
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
      aria-label="Demo navigation"
    >
      <Link
        href="/demo"
        className="flex items-center gap-2 font-sans text-sm transition-opacity hover:opacity-70"
        style={{ color: theme.palette.textMuted }}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Kembali ke Galeri
      </Link>

      <div className="flex items-center gap-1.5">
        <span
          className="rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wide"
          style={{
            background: theme.palette.accentLight,
            borderColor: theme.palette.border,
            color: theme.palette.accent,
          }}
        >
          {theme.name}
        </span>
        <span
          className="rounded-full bg-muted px-2.5 py-0.5 font-sans text-[10px] text-muted-foreground"
        >
          Demo
        </span>
      </div>

      <Button variant="brand" size="sm" asChild className="h-8 rounded-full px-4 text-xs">
        <Link href={ROUTES.register}>Gunakan Tema</Link>
      </Button>
    </nav>
  );
}

/* ─────────────────────────────────────────
   Music toggle button (floating)
───────────────────────────────────────── */
function MusicButton({ theme }: { theme: DemoTheme }) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-soft transition-all hover:scale-105 active:scale-95"
      style={{
        background: theme.palette.card,
        borderColor: theme.palette.border,
        color: playing ? theme.palette.accent : theme.palette.textMuted,
      }}
      aria-label={playing ? "Matikan musik" : "Putar musik"}
      title={playing ? "Musik: Menyala" : "Musik: Mati (Demo)"}
    >
      {playing ? (
        <Music2 size={18} className="animate-pulse" aria-hidden="true" />
      ) : (
        <VolumeX size={18} aria-hidden="true" />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   Main export: InvitationDemo
───────────────────────────────────────── */
export function InvitationDemo({ theme }: { theme: DemoTheme }) {
  const [opened, setOpened] = React.useState(false);

  return (
    <div className="min-h-screen" style={{ background: theme.palette.bg }}>
      <DemoNav theme={theme} />
      <MusicButton theme={theme} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CoverSection theme={theme} onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pt-14"
          >
            <CountdownSection theme={theme} />
            <CoupleSection theme={theme} />
            <GallerySection theme={theme} />
            <EventSection theme={theme} />
            <TimelineSection theme={theme} />
            <RsvpSection theme={theme} />
            <GiftSection theme={theme} />
            <ClosingSection theme={theme} />

            {/* Bottom CTA bar */}
            <div
              className="border-t py-10 text-center"
              style={{
                background: theme.palette.bgSecondary,
                borderColor: theme.palette.border,
              }}
            >
              <p
                className="font-sans text-xs"
                style={{ color: theme.palette.textMuted }}
              >
                Undangan ini dibuat dengan
              </p>
              <p
                className="mt-1 font-display text-lg"
                style={{ color: theme.palette.accent }}
              >
                TamuKita
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button
                  variant="brand"
                  size="sm"
                  asChild
                  className="h-9 rounded-full px-5 text-xs"
                >
                  <Link href={ROUTES.register}>Buat Undangan Saya</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-9 rounded-full px-5 text-xs"
                >
                  <Link href="/demo">Lihat Tema Lain</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
