"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";

export function Quote() {
  return (
    <>
      <section
        className="relative overflow-hidden py-20 text-center sm:py-28"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn direction="down">
            <p
              style={{ color: "#93C5FD" }}
              className="font-serif text-[11px] font-bold uppercase tracking-[0.3em]"
            >
              Ar-Rum: 21
            </p>
          </FadeIn>

          <div className="my-5 flex items-center justify-center gap-4">
            <span
              className="block h-px w-16"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
            <span style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm">
              ✦
            </span>
            <span
              className="block h-px w-16"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
          </div>

          <FadeIn delay={0.3}>
            <blockquote
              className="font-serif text-base font-light italic leading-relaxed sm:text-xl"
              style={{ color: "#F0F7FF" }}
            >
              &ldquo;Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa
              tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </blockquote>
          </FadeIn>

          <div className="my-5 flex items-center justify-center gap-4">
            <span
              className="block h-px w-16"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
            <span style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm">
              ✦
            </span>
            <span
              className="block h-px w-16"
              style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
          </div>
        </div>
      </section>

      <SectionFloralDivider variant="center" />
    </>
  );
}
