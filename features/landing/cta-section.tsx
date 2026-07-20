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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-8 py-16 text-center md:px-16 md:py-24"
      >
        {/* Decorative elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">
            Mulai Sekarang
          </p>
          <h2 className="mt-4 text-display-md font-bold text-white md:text-display-lg">
            Wujudkan Hari Spesial Anda
            <br />
            Bersama TamuKita
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-brand-100/80">
            Bergabunglah dengan 50.000+ pasangan yang telah mempercayakan manajemen tamu
            pernikahan mereka kepada TamuKita.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="gold"
              size="xl"
              asChild
              className="group min-w-[180px]"
            >
              <Link href={ROUTES.register}>
                Mulai Gratis
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="xl"
              asChild
              className="min-w-[180px] text-white hover:bg-white/10"
            >
              <Link href={ROUTES.demo}>Lihat Demo</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-brand-200/70">
            Gratis selamanya untuk 1 undangan. Tidak perlu kartu kredit.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
