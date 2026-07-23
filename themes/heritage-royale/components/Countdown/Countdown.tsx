"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface CountdownProps {
  config: HeritageRoyaleConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ config }: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const targetDate = new Date(config.event.countdownIso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [config.event.countdownIso]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <>
      <section className="py-20 text-center sm:py-24" style={{ backgroundColor: "#1E3A5F" }}>
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#93C5FD" }}
            >
              Menghitung Hari
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Menuju Hari Bahagia
            </h2>
          </FadeIn>

          <div
            className="mx-auto mt-10"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              justifyContent: "center",
              maxWidth: 480,
            }}
          >
            {units.map((unit, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="flex-1">
                {/* White card on navy bg — maximum contrast */}
                <div
                  className="flex flex-col items-center justify-center rounded-2xl shadow-lg"
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                >
                  <span
                    className="font-serif font-black"
                    style={{
                      color: "#1E3A5F",
                      fontSize: "clamp(1.25rem, 4vw, 2.25rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span
                    className="mt-1 font-sans font-bold uppercase tracking-wider"
                    style={{ color: "#4A6984", fontSize: "clamp(9px, 2vw, 11px)" }}
                  >
                    {unit.label}
                  </span>
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
