"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { MultiLayerFloralCorners } from "../../assets/MultiLayerFloralCorners";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface ParentsProps {
  config: HeritageRoyaleConfig;
}

export function Parents({ config }: ParentsProps) {
  return (
    <>
      <section
        className="relative overflow-hidden py-20 text-center sm:py-28"
        style={{ backgroundColor: "#EEF2F7" }}
      >
        {/* Ornamen Bunga Corner untuk memperkaya tampilan & estetika */}
        <MultiLayerFloralCorners />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Dengan Rahmat Allah SWT
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Mempelai &amp; Keluarga Besar
            </h2>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
            <FadeIn direction="up" delay={0.2} className="flex">
              <div
                className="flex w-full flex-col justify-between rounded-3xl p-8 text-center shadow-md"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
              >
                <div>
                  <span
                    className="mb-4 inline-block rounded-full px-4 py-1 font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
                  >
                    Keluarga Mempelai Wanita
                  </span>
                  <h3 className="mb-3 font-serif text-2xl font-bold" style={{ color: "#1E3A5F" }}>
                    {config.couple.bride}
                  </h3>
                </div>
                <p className="font-sans text-xs leading-relaxed" style={{ color: "#4A6984" }}>
                  {config.couple.brideParents}
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.4} className="flex">
              <div
                className="flex w-full flex-col justify-between rounded-3xl p-8 text-center shadow-md"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
              >
                <div>
                  <span
                    className="mb-4 inline-block rounded-full px-4 py-1 font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
                  >
                    Keluarga Mempelai Pria
                  </span>
                  <h3 className="mb-3 font-serif text-2xl font-bold" style={{ color: "#1E3A5F" }}>
                    {config.couple.groom}
                  </h3>
                </div>
                <p className="font-sans text-xs leading-relaxed" style={{ color: "#4A6984" }}>
                  {config.couple.groomParents}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <SectionFloralDivider variant="center" />
    </>
  );
}
