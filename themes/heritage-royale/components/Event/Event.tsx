"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface EventProps {
  config: HeritageRoyaleConfig;
}

export function Event({ config }: EventProps) {
  const { akad, reception } = config.event;

  const EventCard = ({ data, num }: { data: typeof akad; num: string }) => (
    <div
      className="flex h-full flex-col justify-between rounded-3xl p-8 text-left shadow-lg"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
    >
      <div>
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-full font-serif text-base font-bold"
          style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
        >
          {num}
        </div>
        <h3 className="font-serif text-2xl font-bold" style={{ color: "#1E3A5F" }}>
          {num === "1" ? "Akad Nikah" : "Resepsi"}
        </h3>
        <p className="mt-3 font-sans text-sm font-semibold" style={{ color: "#4A6984" }}>
          {data.date}
        </p>
        <p className="mt-1 font-mono text-xs" style={{ color: "#4A6984" }}>
          {data.time}
        </p>
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid #F1F5F9" }}>
          <p className="font-serif text-base font-bold" style={{ color: "#1E3A5F" }}>
            {data.venue}
          </p>
          <p className="mt-1 font-sans text-xs leading-relaxed" style={{ color: "#4A6984" }}>
            {data.address}
          </p>
        </div>
      </div>
      {data.mapsUrl && (
        <a
          href={data.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans text-xs font-bold shadow-md transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
        >
          Buka Google Maps
        </a>
      )}
    </div>
  );

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Informasi Acara
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-5xl"
              style={{ color: "#1E3A5F" }}
            >
              Waktu &amp; Tempat
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <FadeIn direction="up" delay={0.2}>
              <EventCard data={akad} num="1" />
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <EventCard data={reception} num="2" />
            </FadeIn>
          </div>
        </div>
      </section>
      <SectionFloralDivider variant="center" />
    </>
  );
}
