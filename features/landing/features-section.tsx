"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  CheckSquare,
  Users,
  Image,
  Heart,
  Music2,
  Timer,
  Gift,
  Globe,
  QrCode,
  BarChart2,
  Palette,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Layout,
    title: "Invitation Builder",
    desc: "Drag-and-drop editor untuk membuat halaman undangan yang benar-benar personal.",
    accent: "brand",
  },
  {
    icon: CheckSquare,
    title: "RSVP Digital",
    desc: "Tamu konfirmasi kehadiran langsung dari ponsel. Data masuk otomatis ke dashboard.",
    accent: "blue",
  },
  {
    icon: Users,
    title: "Manajemen Tamu",
    desc: "Import, kelompokkan, dan pantau status semua tamu dalam satu tampilan yang bersih.",
    accent: "emerald",
  },
  {
    icon: Image,
    title: "Galeri Pernikahan",
    desc: "Tampilkan momen indah pra-wedding atau hari H dalam galeri yang elegan.",
    accent: "purple",
  },
  {
    icon: Heart,
    title: "Love Story",
    desc: "Ceritakan perjalanan cinta kalian lewat timeline interaktif yang menyentuh hati.",
    accent: "rose",
  },
  {
    icon: Music2,
    title: "Musik Latar",
    desc: "Putar lagu favorit sebagai latar undangan. Buat momen membuka undangan terasa istimewa.",
    accent: "gold",
  },
  {
    icon: Timer,
    title: "Hitung Mundur",
    desc: "Countdown otomatis menuju hari pernikahan. Bangun antisipasi tamu sejak dini.",
    accent: "brand",
  },
  {
    icon: Gift,
    title: "Amplop Digital",
    desc: "Terima hadiah atau transfer dari tamu langsung melalui undangan tanpa repot.",
    accent: "emerald",
  },
  {
    icon: Globe,
    title: "Domain Sendiri",
    desc: "Gunakan alamat website personal seperti arya-nadira.com untuk sentuhan mewah.",
    accent: "blue",
  },
  {
    icon: QrCode,
    title: "QR Code Tamu",
    desc: "Setiap tamu mendapat QR unik untuk check-in di lokasi. Antrean tidak ada lagi.",
    accent: "purple",
  },
  {
    icon: BarChart2,
    title: "Analitik",
    desc: "Pantau berapa kali undangan dibuka, dari kota mana, dan siapa saja yang sudah RSVP.",
    accent: "rose",
  },
  {
    icon: Palette,
    title: "Kustomisasi Tema",
    desc: "Ubah warna, font, dan layout sesuai konsep pernikahan. Hasilnya langsung terlihat.",
    accent: "gold",
  },
];

const accentMap: Record<string, { icon: string; border: string; bg: string }> = {
  brand: {
    icon: "text-brand-600",
    border: "hover:border-brand-200",
    bg: "bg-brand-50",
  },
  blue: {
    icon: "text-blue-600",
    border: "hover:border-blue-200",
    bg: "bg-blue-50",
  },
  emerald: {
    icon: "text-emerald-600",
    border: "hover:border-emerald-200",
    bg: "bg-emerald-50",
  },
  purple: {
    icon: "text-purple-600",
    border: "hover:border-purple-200",
    bg: "bg-purple-50",
  },
  rose: {
    icon: "text-rose-600",
    border: "hover:border-rose-200",
    bg: "bg-rose-50",
  },
  gold: {
    icon: "text-gold-500",
    border: "hover:border-gold-200",
    bg: "bg-gold-50",
  },
};

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Fitur Lengkap
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight text-foreground"
        >
          Semua yang kalian butuhkan,{" "}
          <em className="not-italic text-gradient">sudah ada</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
        >
          Dari undangan hingga manajemen tamu — semuanya dirancang agar hari istimewa kalian
          terasa lebih ringan dan berkesan.
        </motion.p>
      </div>

      {/* Feature grid */}
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((f, i) => {
          const a = accentMap[f.accent];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            >
              <div
                className={cn(
                  "group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200",
                  a.border,
                  "hover:-translate-y-0.5 hover:shadow-soft",
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    a.bg,
                  )}
                  aria-hidden="true"
                >
                  <f.icon className={cn("h-[18px] w-[18px]", a.icon)} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-sans text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>

                {/* Subtle corner decoration */}
                <div
                  aria-hidden="true"
                  className="absolute right-3 top-3 h-1 w-1 rounded-full bg-border opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
