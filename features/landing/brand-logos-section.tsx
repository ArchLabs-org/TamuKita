"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Smartphone, Music, Link2, ShieldCheck, Zap } from "lucide-react";

const platformFeatures = [
  {
    icon: Smartphone,
    title: "100% Responsif Mobile",
    desc: "Tampil memukau di semua smartphone",
  },
  {
    icon: Music,
    title: "Musik Piano Romantis",
    desc: "Suasana imersif saat dibuka tamu",
  },
  {
    icon: Link2,
    title: "Link Undangan Kustom",
    desc: "Berstempel nama tamu personal",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Data Terjamin",
    desc: "Privasi RSVP & Angpao aman",
  },
  {
    icon: Zap,
    title: "Siap dalam 5 Menit",
    desc: "Praktis tanpa ribet & tanpa coding",
  },
];

export function BrandLogosSection() {
  return (
    <section className="border-y border-border bg-muted/20 py-10" aria-label="Jaminan Kualitas">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"
        >
          Jaminan Kualitas Platform
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        >
          {platformFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="shadow-xs backdrop-blur-xs flex flex-col items-center rounded-2xl border border-border/60 bg-card/80 p-4 text-center"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </div>
                <h4 className="font-sans text-xs font-bold text-foreground">{feat.title}</h4>
                <p className="mt-1 font-sans text-[11px] text-muted-foreground">{feat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
