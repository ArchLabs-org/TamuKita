"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { MultiLayerFloralCorners } from "../../assets/MultiLayerFloralCorners";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface OpeningProps {
  config: HeritageRoyaleConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Opening({ config }: OpeningProps) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 158,
    hours: 9,
    minutes: 17,
    seconds: 23,
  });

  React.useEffect(() => {
    const targetDate = new Date(config.event.countdownIso).getTime();
    const updateTimer = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateTimer();
    const t = setInterval(updateTimer, 1000);
    return () => clearInterval(t);
  }, [config.event.countdownIso]);

  const units = [
    { label: "HARI", value: timeLeft.days },
    { label: "JAM", value: timeLeft.hours },
    { label: "MENIT", value: timeLeft.minutes },
    { label: "DETIK", value: timeLeft.seconds },
  ];

  return (
    <>
      <section
        className="relative overflow-hidden py-20 text-center sm:py-28"
        style={{
          backgroundColor: "#FBF9F5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Corner florals with synchronized navy-gold animations */}
        <MultiLayerFloralCorners />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeIn direction="down" delay={0.1}>
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.4em]"
              style={{ color: "#D4AF37" }}
            >
              THE WEDDING OF
            </p>
          </FadeIn>

          {/* Symmetrical Gold/Navy Line Accents */}
          <div className="my-3 flex w-full items-center justify-center gap-3 opacity-60">
            <span className="block h-px w-10" style={{ backgroundColor: "#D4AF37" }} />
            <span style={{ color: "#D4AF37" }} className="text-[10px]">
              ✦
            </span>
            <span className="block h-px w-10" style={{ backgroundColor: "#D4AF37" }} />
          </div>

          {/* Oval photo framed with a luxurious double thin gold border */}
          {config.gallery[0]?.url && (
            <FadeIn delay={0.2} className="mt-4 flex justify-center">
              <div
                className="relative overflow-hidden"
                style={{
                  height: 310,
                  width: 220,
                  borderRadius: 999,
                  border: "2px solid #D4AF37",
                  padding: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 20px 50px rgba(30,58,95,0.15)",
                }}
              >
                <div className="h-full w-full overflow-hidden" style={{ borderRadius: 999 }}>
                  <img
                    src={config.gallery[0].url}
                    alt={`${config.couple.bride} & ${config.couple.groom}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Names styled with Premium Contrast: Bride & Groom in Deep Navy, ampersand in Champagne Gold */}
          <FadeIn delay={0.4} className="mt-7">
            <h1
              className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-5xl md:text-6xl"
              style={{ color: "#1E3A5F" }}
            >
              {config.couple.bride}
            </h1>
            <div
              className="my-2 font-serif text-2xl italic sm:text-3xl"
              style={{ color: "#D4AF37" }}
            >
              &amp;
            </div>
            <h1
              className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-5xl md:text-6xl"
              style={{ color: "#1E3A5F" }}
            >
              {config.couple.groom}
            </h1>
          </FadeIn>

          <FadeIn delay={0.5} className="mt-4">
            <p
              className="mx-auto max-w-md font-sans text-xs font-semibold tracking-wider sm:text-sm"
              style={{ color: "#4A6984" }}
            >
              Kami berharap Anda menjadi bagian dari hari istimewa kami.
            </p>
          </FadeIn>

          {/* Countdown pills redesigned to perfectly match the theme colors */}
          <FadeIn delay={0.6} className="mt-8">
            <div
              className="mx-auto"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                justifyContent: "center",
                maxWidth: 360,
              }}
            >
              {units.map((unit, idx) => (
                <div
                  key={idx}
                  className="flex flex-1 flex-col items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "#1E3A5F",
                    paddingTop: 12,
                    paddingBottom: 12,
                    paddingLeft: 4,
                    paddingRight: 4,
                    boxShadow: "0 10px 25px rgba(30,58,95,0.2)",
                    border: "1px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <span
                    className="font-serif font-black"
                    style={{
                      color: "#F3E5AB",
                      fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span
                    className="mt-1 font-sans font-bold tracking-wider"
                    style={{ color: "#FFFFFF", fontSize: "7px" }}
                  >
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionFloralDivider />
    </>
  );
}
