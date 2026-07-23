"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface StoryProps {
  config: HeritageRoyaleConfig;
}

export function Story({ config }: StoryProps) {
  if (!config.timeline || config.timeline.length === 0) return null;

  return (
    <>
      <section className="relative py-20 sm:py-28" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn direction="down" className="text-center">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Kisah Cinta Kami
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Perjalanan Dua Hati
            </h2>
          </FadeIn>

          {config.couple.story && (
            <FadeIn delay={0.2} className="mt-8 text-center">
              <p
                className="font-serif text-base italic leading-relaxed sm:text-lg"
                style={{ color: "#4A6984" }}
              >
                &ldquo;{config.couple.story}&rdquo;
              </p>
            </FadeIn>
          )}

          <div
            className="relative ml-6 mt-12 space-y-10 pl-8 text-left sm:ml-28"
            style={{ borderLeft: "2px solid rgba(30,58,95,0.2)" }}
          >
            {config.timeline.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} className="relative">
                <div
                  className="absolute -left-[38px] top-1 h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: "#1E3A5F",
                    border: "4px solid #FBF9F5",
                    boxShadow: "0 0 0 1px #1E3A5F",
                  }}
                />
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#4A6984" }}
                >
                  {item.year}
                </span>
                <h3
                  className="mt-1 font-serif text-lg font-bold sm:text-xl"
                  style={{ color: "#1E3A5F" }}
                >
                  {item.title}
                </h3>
                <p className="mt-1 font-sans text-sm leading-relaxed" style={{ color: "#4A6984" }}>
                  {item.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <SectionFloralDivider variant="center" />
    </>
  );
}
