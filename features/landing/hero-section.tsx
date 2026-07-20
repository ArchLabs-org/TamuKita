"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { icon: Users, value: "50,000+", label: "Pasangan bahagia" },
  { icon: Calendar, value: "120,000+", label: "Tamu terkelola" },
  { icon: Star, value: "4.9/5", label: "Rating pengguna" },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-20"
      aria-label="Hero"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold-100/30 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-warm-100/50 blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <Badge variant="brand" className="mb-6 px-4 py-1.5 text-sm">
              ✦ Platform Undangan Digital #1 di Indonesia
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-display-lg font-bold tracking-tight text-foreground md:text-display-xl lg:text-display-2xl"
          >
            Undangan Pernikahan{" "}
            <span className="text-gradient">Elegan & Modern</span>
            <br />
            dalam Satu Platform
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Kelola undangan, konfirmasi kehadiran tamu, dan kirim informasi pernikahan dengan
            mudah. Semua dalam satu platform yang indah dan profesional.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button variant="brand" size="xl" asChild className="group min-w-[180px]">
              <Link href={ROUTES.register}>
                Mulai Gratis
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="min-w-[180px]">
              <Link href={ROUTES.demo}>Lihat Demo</Link>
            </Button>
          </motion.div>

          {/* Social proof note */}
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm text-muted-foreground"
          >
            Gratis selamanya untuk 1 undangan. Tidak perlu kartu kredit.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-8 divide-x divide-border"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="px-4 text-center first:pl-0 last:pr-0 md:px-8">
                <div className="flex justify-center mb-2">
                  <Icon size={20} className="text-brand-500" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-foreground md:text-3xl">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero preview card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden="true" />
              <div className="h-3 w-3 rounded-full bg-green-400" aria-hidden="true" />
              <div className="mx-4 flex-1 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                tamukita.id/rizky-sarah
              </div>
            </div>
            {/* Mock invitation preview */}
            <div className="relative aspect-[16/7] overflow-hidden bg-warm-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-sm text-muted-foreground/60 uppercase tracking-widest">
                    The Wedding of
                  </p>
                  <h2 className="mt-2 font-display text-4xl font-light text-brand-700 md:text-6xl">
                    Rizky &amp; Sarah
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Sabtu, 14 Februari 2026 • Grand Ballroom, Jakarta
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="h-px w-16 bg-gold-400" aria-hidden="true" />
                    <span className="text-gold-500">✦</span>
                    <div className="h-px w-16 bg-gold-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              {/* Decorative corners */}
              <div
                aria-hidden="true"
                className="absolute left-6 top-6 h-16 w-16 rounded-full border border-brand-200/60"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-6 right-6 h-12 w-12 rounded-full border border-gold-300/60"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
