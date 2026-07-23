"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface TimelineProps {
  config: HeritageRoyaleConfig;
}

export function Timeline({ config }: TimelineProps) {
  const events = [
    {
      time: config.event.akad.time,
      title: "Akad Nikah",
      venue: config.event.akad.venue,
      number: "01",
    },
    {
      time: config.event.reception.time,
      title: "Resepsi Pernikahan",
      venue: config.event.reception.venue,
      number: "02",
    },
  ];

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#EEF2F7" }}>
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Rangkaian Acara
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Jadwal Hari Bahagia
            </h2>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {events.map((evt, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div
                  className="flex flex-col items-center gap-3 rounded-3xl p-8 shadow-md"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
                >
                  <span
                    className="font-serif text-4xl font-black"
                    style={{ color: "rgba(30,58,95,0.08)" }}
                  >
                    {evt.number}
                  </span>
                  <h3 className="font-serif text-xl font-bold" style={{ color: "#1E3A5F" }}>
                    {evt.title}
                  </h3>
                  <span
                    className="rounded-full px-4 py-1 font-mono text-xs font-semibold"
                    style={{ backgroundColor: "#1E3A5F", color: "#FFFFFF" }}
                  >
                    {evt.time}
                  </span>
                  <p className="font-sans text-xs" style={{ color: "#4A6984" }}>
                    {evt.venue}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <SectionFloralDivider />
    </>
  );
}
