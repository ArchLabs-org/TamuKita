"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Image,
  Palette,
  BarChart2,
  CheckSquare,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  Circle,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

/* ── Fake sidebar nav items ── */
const navItems = [
  { icon: Heart, label: "Pernikahan", active: true },
  { icon: Users, label: "Tamu", active: false },
  { icon: CheckSquare, label: "RSVP", active: false },
  { icon: Image, label: "Galeri", active: false },
  { icon: Palette, label: "Tema", active: false },
  { icon: BarChart2, label: "Analitik", active: false },
];

/* ── RSVP status row ── */
function RsvpRow({
  name,
  status,
  pax,
}: {
  name: string;
  status: "hadir" | "tidak" | "menunggu";
  pax: number;
}) {
  const statusStyle = {
    hadir: "bg-emerald-100 text-emerald-700",
    tidak: "bg-rose-100 text-rose-700",
    menunggu: "bg-amber-100 text-amber-700",
  }[status];
  const statusLabel = { hadir: "Hadir", tidak: "Tidak", menunggu: "Menunggu" }[status];

  return (
    <div className="flex items-center justify-between border-b border-border/50 py-2 last:border-0">
      <div className="flex items-center gap-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
          {name[0]}
        </div>
        <span className="font-sans text-xs text-foreground">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-sans text-[10px] text-muted-foreground">{pax} orang</span>
        <span className={cn("rounded-full px-2 py-0.5 font-sans text-[9px] font-medium", statusStyle)}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

/* ── Stat card ── */
function StatCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <p className="font-sans text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5 flex items-end gap-2">
        <span className="font-display text-2xl font-semibold text-foreground">{value}</span>
        {trend && (
          <span className="mb-0.5 flex items-center gap-0.5 font-sans text-[9px] font-medium text-emerald-600">
            <TrendingUp size={9} aria-hidden="true" />
            {trend}
          </span>
        )}
      </div>
      <p className="mt-0.5 font-sans text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

export function DashboardPreviewSection() {
  return (
    <Section id="dashboard" className="bg-warm-50/40">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Dashboard
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Kendali penuh di{" "}
          <em className="not-italic text-gradient">satu tempat</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
        >
          Dashboard yang bersih dan intuitif — tidak perlu tutorial untuk mulai menggunakannya.
        </motion.p>
      </div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 overflow-hidden rounded-2xl border border-border bg-background shadow-soft"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" aria-hidden="true" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
          </div>
          <div className="mx-3 flex flex-1 items-center gap-1.5 rounded-md bg-background/80 px-3 py-1 text-[10px] text-muted-foreground">
            <Circle size={6} className="fill-emerald-500 text-emerald-500" aria-hidden="true" />
            app.tamukita.id/dashboard
          </div>
        </div>

        {/* Main dashboard layout */}
        <div className="flex" style={{ minHeight: "520px" }}>
          {/* Sidebar */}
          <aside className="hidden w-44 flex-shrink-0 border-r border-border bg-[hsl(20,14%,9%)] p-3 sm:block">
            {/* Logo area */}
            <div className="mb-4 flex items-center gap-2 px-2 py-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-600">
                <span className="font-display text-[9px] font-bold text-white">T</span>
              </div>
              <span className="font-display text-xs font-medium text-[hsl(36,20%,85%)]">
                TamuKita
              </span>
            </div>

            {/* Wedding selector */}
            <div className="mb-3 flex items-center justify-between rounded-md bg-[hsl(20,14%,14%)] px-2 py-1.5">
              <span className="font-sans text-[10px] text-[hsl(36,20%,75%)]">Arya & Nadira</span>
              <ChevronDown size={10} className="text-[hsl(36,20%,55%)]" aria-hidden="true" />
            </div>

            {/* Nav */}
            <nav aria-label="Dashboard navigation">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                        item.active
                          ? "bg-brand-700/40 text-brand-300"
                          : "text-[hsl(36,20%,60%)] hover:bg-[hsl(20,14%,14%)] hover:text-[hsl(36,20%,80%)]",
                      )}
                    >
                      <item.icon size={12} strokeWidth={1.5} aria-hidden="true" />
                      <span className="font-sans text-[10px]">{item.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 overflow-hidden p-4 md:p-5">
            {/* Page header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-medium text-foreground">
                  Arya & Nadira
                </h3>
                <p className="font-sans text-[10px] text-muted-foreground">
                  12 April 2026 · The Ritz-Carlton Jakarta
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 font-sans text-[9px] font-medium text-emerald-700">
                  ● Aktif
                </div>
                <button className="rounded-md p-1 hover:bg-muted" aria-label="Opsi lainnya">
                  <MoreHorizontal size={14} className="text-muted-foreground" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <StatCard label="Total Tamu" value="300" sub="Undangan dikirim" />
              <StatCard label="RSVP Hadir" value="247" sub="82% dari undangan" trend="+12" />
              <StatCard label="Tidak Hadir" value="28" sub="9% dari undangan" />
              <StatCard label="Tayangan" value="1.4k" sub="Undangan dibuka" trend="+34" />
            </div>

            {/* RSVP progress */}
            <div className="mt-4 rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] font-semibold text-foreground">
                  Konfirmasi Kehadiran
                </p>
                <span className="font-sans text-[9px] text-muted-foreground">92%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: "92%" }}
                  role="progressbar"
                  aria-valuenow={92}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="mt-2 flex gap-3">
                {[
                  { label: "Hadir", pct: "82%", color: "bg-emerald-500" },
                  { label: "Tidak", pct: "9%", color: "bg-rose-400" },
                  { label: "Menunggu", pct: "9%", color: "bg-amber-400" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-1">
                    <div className={cn("h-1.5 w-1.5 rounded-full", s.color)} aria-hidden="true" />
                    <span className="font-sans text-[9px] text-muted-foreground">
                      {s.label} ({s.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RSVP list */}
            <div className="mt-3 rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-sans text-[10px] font-semibold text-foreground">
                  Daftar Tamu Terbaru
                </p>
                <span className="font-sans text-[9px] text-brand-600 hover:underline cursor-pointer">
                  Lihat semua
                </span>
              </div>
              <div>
                <RsvpRow name="Budi Santoso" status="hadir" pax={2} />
                <RsvpRow name="Rini Wulandari" status="hadir" pax={1} />
                <RsvpRow name="Ahmad Fauzi" status="menunggu" pax={3} />
                <RsvpRow name="Dewi Lestari" status="hadir" pax={2} />
                <RsvpRow name="Joko Widodo" status="tidak" pax={1} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
