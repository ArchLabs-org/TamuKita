"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function CtaSection() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl px-8 py-20 text-center md:px-16 md:py-28"
        style={{
          background:
            "linear-gradient(135deg, hsl(22,65%,33%) 0%, hsl(22,62%,42%) 50%, hsl(38,68%,38%) 100%)",
        }}
      >
        {/* Floral ornament top-left */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          fill="none"
          className="pointer-events-none absolute -left-10 -top-10 w-52 opacity-10"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <ellipse cx="100" cy="30" rx="7" ry="22" fill="white" />
            </g>
          ))}
          <circle cx="100" cy="100" r="5" fill="white" />
        </svg>

        {/* Floral ornament bottom-right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          fill="none"
          className="pointer-events-none absolute -bottom-10 -right-10 w-52 rotate-45 opacity-10"
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <ellipse cx="100" cy="25" rx="6" ry="20" fill="white" />
            </g>
          ))}
          <circle cx="100" cy="100" r="4" fill="white" />
        </svg>

        {/* Top divider line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <div className="relative">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60"
          >
            Mulai Perjalanan Kalian
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-display-md font-light text-white md:text-display-lg"
          >
            Setiap pernikahan punya
            <br />
            ceritanya sendiri.
            <br />
            <em className="font-light not-italic opacity-80">Tuliskan cerita kalian.</em>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mx-auto mt-5 max-w-lg font-sans text-base leading-relaxed text-white/70"
          >
            Buat website pernikahan yang indah dan fungsional. Gratis untuk mulai,
            tidak perlu keahlian teknis.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              variant="gold"
              size="lg"
              asChild
              className="group h-12 min-w-[160px] rounded-full px-7 text-sm font-medium"
            >
              <Link href={ROUTES.register}>
                Coba Gratis Sekarang
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="h-12 rounded-full px-7 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Link href={ROUTES.templates}>Lihat Tema</Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-sans text-xs text-white/40"
          >
            Gratis untuk 1 undangan · Tanpa kartu kredit
          </motion.p>
        </div>
      </motion.div>
    </Section>
  );
}
