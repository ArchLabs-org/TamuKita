"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { MultiLayerFloralCorners } from "../../assets/MultiLayerFloralCorners";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface ClosingProps {
  config: HeritageRoyaleConfig;
}

export function Closing({ config }: ClosingProps) {
  return (
    <section
      className="relative overflow-hidden py-24 text-center sm:py-32"
      style={{ backgroundColor: "#FBF9F5" }}
    >
      <MultiLayerFloralCorners />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <FadeIn direction="down">
          <p
            className="font-serif text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "#4A6984" }}
          >
            Terima Kasih
          </p>
          <h2
            className="mt-3 font-serif text-3xl font-bold sm:text-5xl"
            style={{ color: "#1E3A5F" }}
          >
            Sampai Jumpa di Hari Bahagia
          </h2>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-6">
          <p
            className="font-serif text-base italic leading-relaxed sm:text-lg"
            style={{ color: "#4A6984" }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir dan memberikan doa restu kepada kami.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} className="mt-10">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="block h-px w-16" style={{ backgroundColor: "rgba(30,58,95,0.2)" }} />
            <span style={{ color: "#4A6984" }} className="text-sm">
              ✦
            </span>
            <span className="block h-px w-16" style={{ backgroundColor: "rgba(30,58,95,0.2)" }} />
          </div>
          <p
            className="font-sans text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#4A6984" }}
          >
            Kami yang berbahagia,
          </p>
          <h3
            className="mt-3 font-serif text-3xl font-bold italic sm:text-4xl"
            style={{ color: "#1E3A5F" }}
          >
            {config.couple.bride} &amp; {config.couple.groom}
          </h3>
        </FadeIn>
      </div>
    </section>
  );
}
