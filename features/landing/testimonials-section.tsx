"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Lebih dari 300 tamu kami, dan check-in di pintu masuk berjalan mulus banget. QR code-nya kerja sempurna.",
    name: "Anisa & Budi",
    role: "Pasangan, Jakarta",
    initial: "AB",
    color: "hsl(22,62%,52%)",
  },
  {
    quote:
      "Sudah 30-an wedding saya kelola pakai TamuKita. Hemat waktu berjam-jam dibanding cara lama.",
    name: "Putri Maharani",
    role: "Wedding Organizer",
    initial: "PM",
    color: "hsl(210,60%,52%)",
  },
  {
    quote:
      "Template Aurora-nya persis konsep yang kami mau. Banyak tamu tanya 'undangannya pakai apa ini?'",
    name: "Rizky & Siti",
    role: "Pasangan, Surabaya",
    initial: "RS",
    color: "hsl(145,55%,42%)",
  },
  {
    quote:
      "Dashboard analitiknya jelas banget. Saya tahu berapa yang sudah RSVP, dari mana saja mereka.",
    name: "Fajar Santoso",
    role: "Event Coordinator",
    initial: "FS",
    color: "hsl(270,55%,55%)",
  },
  {
    quote:
      "Kami pilih TamuKita karena tampilnya premium. Pas banget untuk konsep pernikahan kami.",
    name: "Diana & Michael",
    role: "Pasangan, Bali",
    initial: "DM",
    color: "hsl(330,55%,55%)",
  },
  {
    quote:
      "Tim support-nya responsif. Pertanyaan saya dijawab cepat dan solutif. Rare banget.",
    name: "Hendra Wijaya",
    role: "Wedding Planner",
    initial: "HW",
    color: "hsl(38,72%,44%)",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  initial,
  color,
  index,
}: (typeof testimonials)[0] & { index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-soft"
    >
      {/* Quote mark */}
      <div>
        <span
          className="font-display text-3xl leading-none opacity-20"
          style={{ color }}
          aria-hidden="true"
        >
          "
        </span>
        <blockquote className="mt-1 font-sans text-sm leading-relaxed text-foreground/80">
          {quote}
        </blockquote>
      </div>

      <figcaption className="mt-4 flex items-center gap-3">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-sans text-[10px] font-bold text-white"
          style={{ background: color }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div>
          <p className="font-sans text-xs font-semibold text-foreground">{name}</p>
          <p className="font-sans text-[10px] text-muted-foreground">{role}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-background">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Cerita Mereka
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Kata mereka yang{" "}
          <em className="not-italic text-gradient">sudah mencoba</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
        >
          Dari pasangan hingga wedding organizer profesional.
        </motion.p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} {...t} index={i} />
        ))}
      </div>
    </Section>
  );
}
