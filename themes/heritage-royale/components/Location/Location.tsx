"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface LocationProps {
  config: HeritageRoyaleConfig;
}

export function Location({ config }: LocationProps) {
  const mapsUrl = config.event.reception.mapsUrl || config.event.akad.mapsUrl;

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#EEF2F7" }}>
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Lokasi Acara
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold" style={{ color: "#1E3A5F" }}>
              Peta &amp; Navigasi
            </h2>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-8">
            <div
              className="flex flex-col items-center gap-4 rounded-3xl p-8 shadow-md"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
              >
                📍
              </div>
              <h3 className="font-serif text-xl font-bold" style={{ color: "#1E3A5F" }}>
                {config.event.reception.venue}
              </h3>
              <p
                className="max-w-md font-sans text-xs leading-relaxed"
                style={{ color: "#4A6984" }}
              >
                {config.event.reception.address}
              </p>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-xs font-bold shadow-md transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
                >
                  Buka Google Maps
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
      <SectionFloralDivider />
    </>
  );
}
