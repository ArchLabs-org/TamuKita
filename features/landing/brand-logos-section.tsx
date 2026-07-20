"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";

/* Placeholder brand logos as stylized text — will be replaced with real logos */
const logos = [
  { name: "Kompas", style: "font-serif font-bold tracking-tight" },
  { name: "IDN Times", style: "font-sans font-semibold tracking-wide" },
  { name: "Kumparan", style: "font-sans font-bold tracking-tight" },
  { name: "Bridestory", style: "font-serif font-medium italic" },
  { name: "The Bride Dept", style: "font-sans font-semibold text-[11px] uppercase tracking-widest" },
  { name: "Pernikahan.com", style: "font-sans font-bold" },
];

export function BrandLogosSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-10" aria-label="Media coverage">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60"
        >
          Diliput oleh
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`${logo.style} select-none text-sm text-muted-foreground/40 transition-opacity hover:text-muted-foreground/60`}
            >
              {logo.name}
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-center font-sans text-[9px] text-muted-foreground/40"
        >
          * Segera hadir
        </motion.p>
      </div>
    </section>
  );
}
