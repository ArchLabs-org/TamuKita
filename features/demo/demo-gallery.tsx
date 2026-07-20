"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { demoThemes, type DemoTheme } from "./data";

/* ── Invitation thumbnail — fully rendered, no images ── */
function InvitationThumbnail({ theme }: { theme: DemoTheme }) {
  const isDark = theme.palette.bg.includes("9%") || theme.id === "sagara";

  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl"
      style={{ background: theme.palette.bg }}
      aria-hidden="true"
    >
      {/* Gradient overlay top */}
      <div
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: `linear-gradient(to bottom, ${theme.palette.accentLight}40, transparent)`,
        }}
      />

      {/* Floral corner ornament — top left */}
      <svg
        viewBox="0 0 120 120"
        className="absolute -left-4 -top-4 w-28 opacity-15"
        fill="none"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <g key={d} transform={`rotate(${d} 60 60)`}>
            <ellipse cx="60" cy="18" rx="4" ry="14" fill={theme.palette.accent} />
          </g>
        ))}
        <circle cx="60" cy="60" r="4" fill={theme.palette.accent} />
      </svg>

      {/* Floral corner ornament — bottom right */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -bottom-4 -right-4 w-24 rotate-180 opacity-10"
        fill="none"
      >
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <g key={d} transform={`rotate(${d} 50 50)`}>
            <ellipse cx="50" cy="14" rx="3.5" ry="12" fill={theme.palette.accent} />
          </g>
        ))}
        <circle cx="50" cy="50" r="3" fill={theme.palette.accent} />
      </svg>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Small top ornament */}
        <div className="mb-4 flex items-center gap-2">
          <div
            className="h-px w-10"
            style={{ background: theme.palette.border }}
          />
          <span className="text-[10px]" style={{ color: theme.palette.accent }}>✦</span>
          <div
            className="h-px w-10"
            style={{ background: theme.palette.border }}
          />
        </div>

        <p
          className="font-sans text-[9px] uppercase tracking-[0.22em]"
          style={{ color: theme.palette.textMuted, opacity: 0.7 }}
        >
          Together We Celebrate
        </p>
        <p
          className="mt-2 font-sans text-[8px] uppercase tracking-[0.18em]"
          style={{ color: theme.palette.textMuted, opacity: 0.5 }}
        >
          The Wedding of
        </p>

        <h3
          className="mt-2 font-display text-3xl font-light leading-tight"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.bride.split(" ")[0]}
        </h3>
        <div className="my-2 flex items-center gap-3">
          <div
            className="h-px w-8"
            style={{ background: theme.palette.border }}
          />
          <span className="font-display text-sm font-light" style={{ color: theme.palette.accent }}>
            &
          </span>
          <div
            className="h-px w-8"
            style={{ background: theme.palette.border }}
          />
        </div>
        <h3
          className="font-display text-3xl font-light leading-tight"
          style={{ color: theme.palette.accent }}
        >
          {theme.couple.groom.split(" ")[0]}
        </h3>

        {/* Date */}
        <div
          className="mt-5 rounded-full px-4 py-1.5 font-sans text-[9px] uppercase tracking-widest"
          style={{
            background: theme.palette.accentLight,
            color: theme.palette.accent,
            border: `1px solid ${theme.palette.border}`,
          }}
        >
          {theme.event.reception.date}
        </div>

        {/* Venue */}
        <p
          className="mt-3 font-sans text-[8px] leading-relaxed"
          style={{ color: theme.palette.textMuted, opacity: 0.6 }}
        >
          {theme.event.reception.venue}
        </p>

        {/* Mini gallery strip */}
        <div className="mt-4 flex gap-1.5">
          {theme.gallery.slice(0, 4).map((g, i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-md bg-gradient-to-br ${g}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-16"
        style={{
          background: `linear-gradient(to top, ${theme.palette.bg}, transparent)`,
        }}
      />

      {/* Bottom ornament */}
      <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-1">
        <p
          className="font-sans text-[7px] uppercase tracking-[0.3em]"
          style={{ color: theme.palette.textMuted, opacity: 0.4 }}
        >
          RSVP
        </p>
        <div className="flex items-center gap-2">
          <div className="h-px w-6" style={{ background: theme.palette.border }} />
          <div
            className="h-1 w-1 rounded-full"
            style={{ background: theme.palette.accent, opacity: 0.5 }}
          />
          <div className="h-px w-6" style={{ background: theme.palette.border }} />
        </div>
      </div>
    </div>
  );
}

/* ── Single gallery card ── */
function ThemeCard({ theme, index }: { theme: DemoTheme; index: number }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col"
    >
      {/* Thumbnail container */}
      <div className="relative overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)]">
        <div
          className="transition-transform duration-500 ease-out"
          style={{ transform: hovered ? "scale(1.02)" : "scale(1)" }}
        >
          <InvitationThumbnail theme={theme} />
        </div>

        {/* Hover overlay with actions */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
          style={{
            background:
              theme.id === "sagara"
                ? "rgba(0,0,0,0.65)"
                : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Link href={`/demo/${theme.id}`}>
            <Button
              variant="brand"
              size="sm"
              className="h-9 gap-2 rounded-full px-5 text-xs font-medium shadow-brand-md"
            >
              <Eye size={13} aria-hidden="true" />
              Preview Lengkap
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="h-9 gap-2 rounded-full px-5 text-xs font-medium"
            style={
              theme.id === "sagara"
                ? { borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.5)" }
                : {}
            }
          >
            <Lock size={11} aria-hidden="true" />
            Gunakan Tema
          </Button>
          <p
            className="font-sans text-[10px]"
            style={{
              color: theme.id === "sagara" ? "rgba(255,255,255,0.35)" : "hsl(220,10%,55%)",
            }}
          >
            Login untuk menggunakan
          </p>
        </motion.div>
      </div>

      {/* Card meta */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-medium text-foreground">
              {theme.name}
            </h3>
            <p className="font-sans text-sm text-muted-foreground">{theme.description}</p>
          </div>
          <div
            className="mt-0.5 flex-shrink-0 rounded-full px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wide"
            style={{
              background: `${theme.palette.accent}15`,
              color: theme.palette.accent,
              border: `1px solid ${theme.palette.accent}25`,
            }}
          >
            {theme.tagline}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {theme.style.split(" · ").map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/50 px-2 py-0.5 font-sans text-[9px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main gallery ── */
export function DemoGallery() {
  return (
    <div className="pt-14">
      {/* Hero header */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, hsl(36,50%,94%) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"
          >
            Demo Tema
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-display-lg font-light tracking-tight text-foreground md:text-display-xl"
          >
            Temukan Tema yang{" "}
            <em className="not-italic text-gradient">Mencerminkan Kalian</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Jelajahi koleksi tema undangan digital kami. Klik Preview untuk melihat demo
            lengkap sebelum membuat akun.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Button variant="brand" size="sm" asChild className="group h-9 rounded-full px-5">
              <Link href={ROUTES.register}>
                Buat Akun Gratis
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <p className="font-sans text-xs text-muted-foreground">
              Tidak perlu kartu kredit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="pb-24" aria-label="Koleksi tema undangan">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Divider */}
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-sans text-xs text-muted-foreground/60">
              {demoThemes.length} tema tersedia
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Masonry-style grid — 3 col on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {demoThemes.map((theme, i) => (
              <ThemeCard key={theme.id} theme={theme} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 rounded-3xl border border-border bg-warm-50/60 px-8 py-12 text-center"
          >
            <h2 className="font-display text-display-sm font-light text-foreground">
              Siap membuat undangan kalian?
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
              Daftar gratis dan mulai buat undangan pernikahan digital yang berkesan hari ini.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="brand"
                size="lg"
                asChild
                className="group h-11 rounded-full px-7 text-sm font-medium"
              >
                <Link href={ROUTES.register}>
                  Coba Gratis Sekarang
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild className="h-11 rounded-full px-7 text-sm">
                <Link href="/#pricing">Lihat Harga</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
