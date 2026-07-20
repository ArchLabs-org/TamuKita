"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface Theme {
  id: string;
  name: string;
  personality: string;
  tag: string;
  palette: { bg: string; text: string; accent: string; border: string };
  bride: string;
  groom: string;
  date: string;
  venue: string;
}

const themes: Theme[] = [
  {
    id: "aster",
    name: "Aster",
    personality: "Minimalist",
    tag: "Bersih · Modern",
    palette: {
      bg: "hsl(0,0%,99%)",
      text: "hsl(220,14%,16%)",
      accent: "hsl(220,14%,28%)",
      border: "hsl(220,14%,90%)",
    },
    bride: "Nadira",
    groom: "Arya",
    date: "12 April 2026",
    venue: "The Ritz-Carlton Jakarta",
  },
  {
    id: "aurora",
    name: "Aurora",
    personality: "Luxury",
    tag: "Mewah · Hangat",
    palette: {
      bg: "hsl(36,30%,97%)",
      text: "hsl(22,45%,22%)",
      accent: "hsl(43,78%,44%)",
      border: "hsl(43,60%,84%)",
    },
    bride: "Sekar",
    groom: "Dimas",
    date: "8 November 2025",
    venue: "Ayana Resort Bali",
  },
  {
    id: "sagara",
    name: "Sagara",
    personality: "Modern",
    tag: "Berani · Kontras",
    palette: {
      bg: "hsl(210,30%,10%)",
      text: "hsl(36,50%,96%)",
      accent: "hsl(43,78%,60%)",
      border: "hsl(210,20%,22%)",
    },
    bride: "Laila",
    groom: "Reza",
    date: "21 Juni 2026",
    venue: "W Hotel Seminyak",
  },
  {
    id: "senja",
    name: "Senja",
    personality: "Rustic",
    tag: "Hangat · Alami",
    palette: {
      bg: "hsl(30,40%,94%)",
      text: "hsl(24,40%,20%)",
      accent: "hsl(16,60%,44%)",
      border: "hsl(30,30%,80%)",
    },
    bride: "Ratih",
    groom: "Galih",
    date: "3 Januari 2026",
    venue: "Villa Padi Ubud",
  },
  {
    id: "lumine",
    name: "Lumine",
    personality: "Floral",
    tag: "Lembut · Feminin",
    palette: {
      bg: "hsl(330,40%,97%)",
      text: "hsl(330,30%,25%)",
      accent: "hsl(340,55%,62%)",
      border: "hsl(330,40%,85%)",
    },
    bride: "Putri",
    groom: "Andi",
    date: "14 Februari 2026",
    venue: "Plataran Borobudur",
  },
  {
    id: "eterna",
    name: "Eterna",
    personality: "Classic",
    tag: "Elegan · Timeless",
    palette: {
      bg: "hsl(48,30%,96%)",
      text: "hsl(22,20%,18%)",
      accent: "hsl(22,62%,40%)",
      border: "hsl(48,40%,82%)",
    },
    bride: "Amira",
    groom: "Farhan",
    date: "29 Maret 2026",
    venue: "Grand Hyatt Jakarta",
  },
];

function InvitationCard({ theme }: { theme: Theme }) {
  const [hovered, setHovered] = React.useState(false);
  const isDark = theme.id === "sagara";

  return (
    <Link
      href={`/demo/${theme.id}`}
      className="group relative w-56 flex-shrink-0 cursor-pointer sm:w-60"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card shell */}
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-300"
          style={{
            background: theme.palette.bg,
            border: `1px solid ${theme.palette.border}`,
            boxShadow: hovered
              ? `0 20px 48px -8px rgba(0,0,0,0.14), 0 0 0 1px ${theme.palette.border}`
              : "0 2px 12px rgba(0,0,0,0.06)",
            transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
          }}
        >
          {/* Top ornament */}
          <div className="flex justify-center pt-5">
            <svg viewBox="0 0 80 40" className="w-16 opacity-20" fill="none">
              {[0, 60, 120, 180, 240, 300].map((d) => (
                <g key={d} transform={`rotate(${d} 40 40)`}>
                  <ellipse cx="40" cy="10" rx="2.5" ry="8" fill={theme.palette.accent} />
                </g>
              ))}
              <circle cx="40" cy="40" r="2" fill={theme.palette.accent} />
            </svg>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 pt-3 text-center">
            <p
              className="font-sans text-[9px] uppercase tracking-[0.2em] opacity-50"
              style={{ color: theme.palette.text }}
            >
              The Wedding of
            </p>
            <h3
              className="mt-2 font-display text-2xl font-light leading-snug"
              style={{ color: theme.palette.accent }}
            >
              {theme.bride}
            </h3>
            <div className="my-1.5 flex items-center justify-center gap-2">
              <div className="h-px flex-1" style={{ background: theme.palette.border }} />
              <span className="text-[9px]" style={{ color: theme.palette.accent }}>
                ✦
              </span>
              <div className="h-px flex-1" style={{ background: theme.palette.border }} />
            </div>
            <h3
              className="font-display text-2xl font-light leading-snug"
              style={{ color: theme.palette.accent }}
            >
              {theme.groom}
            </h3>
            <p
              className="mt-3 font-sans text-[9px] leading-relaxed opacity-60"
              style={{ color: theme.palette.text }}
            >
              {theme.date}
            </p>
            <p className="font-sans text-[9px] opacity-40" style={{ color: theme.palette.text }}>
              {theme.venue}
            </p>

            {/* Divider */}
            <div
              className="mx-auto my-4 h-px w-12 opacity-20"
              style={{ background: theme.palette.accent }}
            />

            {/* Fake RSVP button */}
            <div
              className="mx-auto inline-block rounded-full px-5 py-1.5 text-[8px] uppercase tracking-widest"
              style={{
                background: isDark ? theme.palette.accent : theme.palette.accent,
                color: isDark ? "hsl(210,30%,10%)" : "white",
                opacity: 0.9,
              }}
            >
              RSVP
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex justify-center pb-4">
            <svg viewBox="0 0 80 40" className="w-12 rotate-180 opacity-10" fill="none">
              {[0, 60, 120, 180, 240, 300].map((d) => (
                <g key={d} transform={`rotate(${d} 40 40)`}>
                  <ellipse cx="40" cy="10" rx="2.5" ry="8" fill={theme.palette.accent} />
                </g>
              ))}
            </svg>
          </div>

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{
              background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <Eye
                size={18}
                style={{ color: isDark ? "white" : theme.palette.accent }}
                aria-hidden="true"
              />
              <span
                className="font-sans text-[10px] font-medium uppercase tracking-widest"
                style={{ color: isDark ? "white" : theme.palette.accent }}
              >
                Preview
              </span>
            </div>
          </motion.div>
        </div>

        {/* Label below */}
        <div className="mt-3 px-1">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-medium text-foreground">{theme.name}</p>
            <span
              className="rounded-full px-2 py-0.5 font-sans text-[9px] font-medium uppercase tracking-wide"
              style={{
                background: `${theme.palette.accent}18`,
                color: theme.palette.accent,
              }}
            >
              {theme.personality}
            </span>
          </div>
          <p className="mt-0.5 font-sans text-[11px] text-muted-foreground">{theme.tag}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export function TemplatePreviewSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <Section id="templates" className="overflow-hidden bg-warm-50/60">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Koleksi Tema
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Temukan tema yang <em className="text-gradient not-italic">mencerminkan kalian</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
        >
          Setiap tema dirancang dengan karakter berbeda — dari minimalis modern hingga klasik yang
          abadi.
        </motion.p>
      </div>

      {/* Horizontal scroll showcase */}
      <div className="-mx-4 mt-12 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-5 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8"
        >
          {themes.map((theme) => (
            <InvitationCard key={theme.id} theme={theme} />
          ))}
          {/* End spacer */}
          <div className="w-4 flex-shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <Button variant="brand-outline" size="sm" asChild className="group rounded-full">
          <Link href={ROUTES.templates}>
            Lihat Semua Tema
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
