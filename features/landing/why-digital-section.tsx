"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const paperCons = [
  "Biaya cetak mahal, terutama untuk ratusan undangan",
  "Mudah hilang atau terlupakan oleh tamu",
  "Tidak bisa diperbarui jika ada perubahan informasi",
  "Tidak ada konfirmasi kehadiran otomatis",
  "Sulit melacak siapa yang sudah menerima undangan",
  "Berdampak pada lingkungan",
];

const digitalPros = [
  "Hemat biaya — bayar sekali, kirim ke semua tamu",
  "Selalu ada di ponsel tamu, mudah dibuka kapan saja",
  "Informasi bisa diperbarui secara real-time",
  "RSVP otomatis masuk ke dashboard",
  "Pantau status pengiriman dan konfirmasi dengan mudah",
  "Ramah lingkungan, tanpa kertas",
];

export function WhyDigitalSection() {
  return (
    <Section id="why-digital" className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Mengapa Digital?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Undangan kertas vs{" "}
          <em className="not-italic text-gradient">TamuKita</em>
        </motion.h2>
      </div>

      {/* Comparison grid */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {/* Paper — left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <span className="text-base" aria-hidden="true">📄</span>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-foreground">
                Undangan Kertas
              </h3>
              <p className="font-sans text-xs text-muted-foreground">Cara konvensional</p>
            </div>
          </div>
          <ul className="space-y-2.5" role="list">
            {paperCons.map((con) => (
              <li key={con} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <X size={9} className="text-rose-600" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="font-sans text-xs leading-relaxed text-muted-foreground">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* TamuKita — right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50 p-6"
        >
          {/* Subtle glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-200/30 blur-3xl"
          />
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">
              <span className="font-display text-sm font-bold text-brand-600" aria-hidden="true">T</span>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-foreground">
                TamuKita Digital
              </h3>
              <p className="font-sans text-xs text-brand-600">Cara yang lebih baik</p>
            </div>
          </div>
          <ul className="space-y-2.5 relative" role="list">
            {digitalPros.map((pro, i) => (
              <motion.li
                key={pro}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.06 }}
                className="flex items-start gap-2.5"
              >
                <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-600">
                  <Check size={9} className="text-white" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="font-sans text-xs leading-relaxed text-foreground/80">
                  {pro}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
