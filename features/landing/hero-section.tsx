"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Floral SVG ornaments inline ── */
function FloralTopRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 320"
      fill="none"
      className="absolute -right-8 -top-8 w-72 opacity-[0.07] md:w-96 md:opacity-[0.09]"
    >
      <circle cx="160" cy="160" r="120" stroke="hsl(22,62%,40%)" strokeWidth="0.8" />
      <circle cx="160" cy="160" r="90" stroke="hsl(22,62%,40%)" strokeWidth="0.5" />
      <circle cx="160" cy="160" r="60" stroke="hsl(43,78%,49%)" strokeWidth="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 160 160)`}>
          <ellipse cx="160" cy="60" rx="8" ry="22" fill="hsl(22,62%,40%)" opacity="0.4" />
          <ellipse cx="160" cy="95" rx="5" ry="14" fill="hsl(43,78%,49%)" opacity="0.3" />
        </g>
      ))}
      <circle cx="160" cy="160" r="6" fill="hsl(43,78%,49%)" opacity="0.6" />
    </svg>
  );
}

function FloralBottomLeft() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      fill="none"
      className="absolute -bottom-4 -left-8 w-52 opacity-[0.06] md:w-72 md:opacity-[0.08]"
    >
      <circle cx="120" cy="120" r="88" stroke="hsl(22,62%,40%)" strokeWidth="0.7" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 120 120)`}>
          <ellipse cx="120" cy="45" rx="7" ry="20" fill="hsl(22,65%,60%)" opacity="0.5" />
        </g>
      ))}
      <circle cx="120" cy="120" r="5" fill="hsl(43,78%,49%)" opacity="0.5" />
    </svg>
  );
}

/* ── iPhone Mockup with invitation inside ── */
function IPhoneMockup() {
  return (
    <div className="relative mx-auto w-[220px] sm:w-[240px] lg:w-[260px]">
      {/* Phone shell */}
      <div
        className="relative overflow-hidden rounded-[2.8rem] border-[8px] shadow-[0_40px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)]"
        style={{
          borderColor: "hsl(22,10%,18%)",
          background: "hsl(22,10%,14%)",
          aspectRatio: "9/19.5",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[hsl(22,10%,10%)]" />

        {/* Screen content — invitation preview */}
        <div
          className="absolute inset-0"
          style={{ background: "hsl(36,40%,96%)" }}
        >
          {/* Top ornament */}
          <div className="absolute inset-x-0 top-0 flex justify-center pt-10">
            <svg viewBox="0 0 120 60" className="w-28 opacity-20" fill="none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
                <g key={d} transform={`rotate(${d} 60 60)`}>
                  <ellipse cx="60" cy="20" rx="3" ry="10" fill="hsl(22,62%,40%)" />
                </g>
              ))}
              <circle cx="60" cy="60" r="3" fill="hsl(43,78%,49%)" />
            </svg>
          </div>

          {/* Invitation content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <p
              className="font-sans text-[7px] uppercase tracking-[0.25em] opacity-50"
              style={{ color: "hsl(22,62%,40%)" }}
            >
              Together with their families
            </p>
            <p
              className="mt-2 font-sans text-[8px] uppercase tracking-[0.2em] opacity-40"
              style={{ color: "hsl(20,14%,20%)" }}
            >
              The Wedding of
            </p>
            <h3
              className="mt-1.5 font-display text-[22px] font-light leading-tight"
              style={{ color: "hsl(22,65%,33%)" }}
            >
              Arya
            </h3>
            <div className="my-1 flex items-center gap-2">
              <div className="h-px w-8 bg-current opacity-20" style={{ color: "hsl(43,78%,49%)" }} />
              <span className="text-[8px]" style={{ color: "hsl(43,78%,49%)" }}>✦</span>
              <div className="h-px w-8 bg-current opacity-20" style={{ color: "hsl(43,78%,49%)" }} />
            </div>
            <h3
              className="font-display text-[22px] font-light leading-tight"
              style={{ color: "hsl(22,65%,33%)" }}
            >
              Nadira
            </h3>
            <p
              className="mt-3 font-sans text-[7px] leading-relaxed opacity-50"
              style={{ color: "hsl(20,14%,25%)" }}
            >
              Sabtu, 12 April 2026
            </p>
            <p
              className="font-sans text-[7px] opacity-40"
              style={{ color: "hsl(20,14%,25%)" }}
            >
              The Ritz-Carlton, Jakarta
            </p>

            {/* RSVP button */}
            <div
              className="mt-4 rounded-full px-4 py-1.5 text-[7px] uppercase tracking-widest text-white"
              style={{ background: "hsl(22,62%,40%)" }}
            >
              Konfirmasi Kehadiran
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <svg viewBox="0 0 120 60" className="w-24 rotate-180 opacity-15" fill="none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
                <g key={d} transform={`rotate(${d} 60 60)`}>
                  <ellipse cx="60" cy="20" rx="3" ry="10" fill="hsl(22,62%,40%)" />
                </g>
              ))}
              <circle cx="60" cy="60" r="3" fill="hsl(43,78%,49%)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reflection / glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 h-16 w-48 -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: "hsl(22,62%,40%,0.15)" }}
      />
    </div>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 500], [0, 30]);
  const phoneOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      aria-label="Hero"
    >
      {/* Paper texture background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% -10%, hsl(36,50%,94%) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at -5% 60%, hsl(22,80%,90%,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 105% 80%, hsl(48,94%,88%,0.25) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floral ornaments */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloralTopRight />
        <FloralBottomLeft />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(22,62%,40%) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main layout — two column on desktop */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:pb-24 lg:pt-32">

        {/* Left column — copy */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-medium text-brand-700"
          >
            <span
              className="flex h-1.5 w-1.5 rounded-full bg-brand-500"
              aria-hidden="true"
            />
            
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-6 max-w-xl font-display text-display-lg font-light leading-tight tracking-tight text-foreground md:text-display-xl lg:max-w-lg lg:text-display-xl"
          >
            Ceritakan
            <br />
            <em className="font-light not-italic text-gradient">Kisah Cinta</em>
            <br />
            Kalian dengan{" "}
            <span className="font-semibold">Indah</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Buat website pernikahan yang terasa personal — lengkap dengan manajemen tamu,
            RSVP digital, dan galeri cerita kalian berdua.
          </motion.p>

          {/* CTA row */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <Button
              variant="brand"
              size="lg"
              asChild
              className="group h-12 min-w-[160px] rounded-full px-7 text-sm font-medium shadow-brand-md"
            >
              <Link href={ROUTES.register}>
                Coba Gratis
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="group h-12 gap-2 rounded-full px-5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Link href={ROUTES.demo}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-brand-300 transition-colors">
                  <Play size={10} className="ml-0.5 fill-current" aria-hidden="true" />
                </span>
                Lihat Demo
              </Link>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-5 font-sans text-xs text-muted-foreground/70"
          >
            Tidak perlu kartu kredit · Gratis untuk 1 undangan
          </motion.p>

          {/* Subtle separator */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-10 flex items-center gap-4 lg:mt-14"
          >
            <div className="flex -space-x-2">
              {["A", "R", "S", "D"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-[10px] font-semibold text-white"
                  style={{ background: `hsl(${22 + i * 6},${60 - i * 4}%,${52 + i * 4}%)` }}
                  aria-hidden="true"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Dipercaya pasangan dari seluruh Indonesia
            </p>
          </motion.div>
        </div>

        {/* Right column — iPhone mockup */}
        <motion.div
          style={{ y: phoneY, opacity: phoneOpacity }}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 flex-shrink-0 lg:mt-0"
        >
          {/* Floating card — RSVP confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-4 top-12 z-20 w-44 rounded-xl border border-border bg-card px-3 py-2.5 shadow-soft sm:-right-10 lg:-right-14"
          >
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">🎉</span>
              <div>
                <p className="text-[10px] font-semibold text-foreground">RSVP Diterima</p>
                <p className="text-[9px] text-muted-foreground">Reza + 1 orang hadir</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card — guest count */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 bottom-20 z-20 w-40 rounded-xl border border-border bg-card px-3 py-2.5 shadow-soft sm:-left-10 lg:-left-14"
          >
            <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">Konfirmasi</p>
            <div className="mt-1 flex items-end gap-1">
              <span className="font-display text-2xl font-semibold text-foreground">247</span>
              <span className="mb-0.5 text-[9px] text-muted-foreground">dari 300 tamu</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: "82%" }}
                role="progressbar"
                aria-valuenow={82}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </motion.div>

          <IPhoneMockup />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
