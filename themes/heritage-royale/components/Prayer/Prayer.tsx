"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";

interface WishItem {
  name: string;
  message: string;
}

export function Prayer() {
  const [wishes] = React.useState<WishItem[]>([
    {
      name: "Budi Santoso",
      message: "Selamat untuk kalian! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    },
    {
      name: "Siti Nurhaliza",
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair.",
    },
    { name: "Andi Wijaya", message: "Selamat menempuh hidup baru! Semoga bahagia selamanya." },
  ]);

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#1E3A5F" }}>
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#93C5FD" }}
            >
              Doa &amp; Restu
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Ucapan Sahabat &amp; Keluarga
            </h2>
          </FadeIn>

          <div className="mt-10 max-h-96 space-y-4 overflow-y-auto pr-1 text-left">
            {wishes.map((w, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <p className="font-serif text-sm font-bold" style={{ color: "#FFFFFF" }}>
                    {w.name}
                  </p>
                  <p
                    className="mt-1 font-sans text-xs italic leading-relaxed"
                    style={{ color: "#BFDBFE" }}
                  >
                    &ldquo;{w.message}&rdquo;
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
