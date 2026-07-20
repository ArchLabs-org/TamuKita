"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PenLine, Send, CalendarCheck } from "lucide-react";
import { Section } from "@/components/layout/section";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Pilih tema & isi cerita kalian",
    desc: "Pilih tema yang sesuai kepribadian, lalu isi detail pernikahan, kisah cinta, dan galeri foto kalian.",
    detail: "Selesai dalam 15 menit",
  },
  {
    number: "02",
    icon: Send,
    title: "Bagikan ke semua tamu",
    desc: "Kirim link undangan lewat WhatsApp, Instagram, atau email dengan sekali klik.",
    detail: "Satu link untuk semua",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Pantau & nikmati harinya",
    desc: "Lihat siapa yang sudah RSVP, kelola daftar tamu, dan scan QR code di hari H.",
    detail: "Real-time dari dashboard",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Cara Kerja
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Mulai dalam{" "}
          <em className="not-italic text-gradient">hitungan menit</em>
        </motion.h2>
      </div>

      {/* Steps */}
      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        {/* Connector line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          style={{ top: "2.25rem" }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Step icon circle */}
            <div className="relative z-10 mb-6">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-border bg-card shadow-soft">
                <step.icon
                  size={26}
                  className="text-brand-600"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              {/* Step number badge */}
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 font-sans text-[9px] font-bold text-white">
                {i + 1}
              </div>
            </div>

            <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-brand-500">
              {step.number}
            </p>
            <h3 className="mt-2 font-display text-lg font-medium text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1">
              <div className="h-1 w-1 rounded-full bg-brand-500" aria-hidden="true" />
              <span className="font-sans text-[10px] font-medium text-brand-700">
                {step.detail}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
