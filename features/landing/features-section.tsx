"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Smartphone, Users, QrCode, BarChart3, Palette, Mail } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Smartphone,
    title: "Undangan Digital",
    description:
      "Buat undangan pernikahan yang indah dan responsif. Akses dari smartphone maupun desktop dengan tampilan yang sempurna.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Users,
    title: "Manajemen Tamu",
    description:
      "Kelola seluruh daftar tamu dalam satu tempat. Import dari Excel, atur meja, dan pantau konfirmasi kehadiran secara real-time.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: QrCode,
    title: "QR Code Tamu",
    description:
      "Setiap tamu mendapat QR code unik untuk check-in di lokasi. Cepat, akurat, dan bebas antrean panjang.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Mail,
    title: "RSVP Digital",
    description:
      "Kirim undangan via WhatsApp atau email dengan satu klik. Tamu bisa konfirmasi kehadiran langsung dari ponsel mereka.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Palette,
    title: "Template Premium",
    description:
      "Pilih dari puluhan template elegan yang dirancang oleh desainer profesional. Sesuaikan warna dan tipografi sesuai tema.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analitik",
    description:
      "Pantau statistik undangan, tingkat konfirmasi, dan jumlah tamu hadir lewat dashboard yang informatif.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-warm-50/50">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Fitur Unggulan
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-display-md font-bold tracking-tight text-foreground"
        >
          Semua yang Anda Butuhkan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
        >
          Dari pembuatan undangan hingga manajemen tamu, TamuKita hadir sebagai solusi lengkap
          untuk hari pernikahan yang sempurna.
        </motion.p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Card variant="default" hover="lift" className="h-full">
              <CardContent className="p-6">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                  aria-hidden="true"
                >
                  <feature.icon className={`${feature.color} h-6 w-6`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
