"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { OvalPhotoFrame } from "../Opening/OvalPhotoFrame";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface BrideProps {
  config: HeritageRoyaleConfig;
}

export function Bride({ config }: BrideProps) {
  const { bride, brideParents, brideInstagram, groom, groomParents, groomInstagram, coupleOrder } =
    config.couple;
  const isBrideFirst = coupleOrder !== "groom_first";

  const BrideCard = (
    <FadeIn direction="left" className="flex flex-col items-center text-center">
      <OvalPhotoFrame
        photoUrl={config.gallery[1]?.url || config.gallery[0]?.url || ""}
        coupleName={bride}
      />
      <h3 className="mt-4 font-serif text-2xl font-bold sm:text-3xl" style={{ color: "#1E3A5F" }}>
        {bride}
      </h3>
      <p className="mt-2 max-w-xs font-sans text-xs leading-relaxed" style={{ color: "#4A6984" }}>
        {brideParents}
      </p>
      {brideInstagram && (
        <a
          href={`https://instagram.com/${brideInstagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-colors"
          style={{
            border: "1px solid rgba(30,58,95,0.3)",
            backgroundColor: "#EEF2F7",
            color: "#1E3A5F",
          }}
        >
          {brideInstagram}
        </a>
      )}
    </FadeIn>
  );

  const GroomCard = (
    <FadeIn direction="right" className="flex flex-col items-center text-center">
      <OvalPhotoFrame
        photoUrl={config.gallery[2]?.url || config.gallery[0]?.url || ""}
        coupleName={groom}
      />
      <h3 className="mt-4 font-serif text-2xl font-bold sm:text-3xl" style={{ color: "#1E3A5F" }}>
        {groom}
      </h3>
      <p className="mt-2 max-w-xs font-sans text-xs leading-relaxed" style={{ color: "#4A6984" }}>
        {groomParents}
      </p>
      {groomInstagram && (
        <a
          href={`https://instagram.com/${groomInstagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-colors"
          style={{
            border: "1px solid rgba(30,58,95,0.3)",
            backgroundColor: "#EEF2F7",
            color: "#1E3A5F",
          }}
        >
          {groomInstagram}
        </a>
      )}
    </FadeIn>
  );

  return (
    <>
      <section className="relative py-20 sm:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn direction="down" className="mb-12 text-center">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Mempelai
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Pengantin Kami
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-11">
            <div className="lg:col-span-5">{isBrideFirst ? BrideCard : GroomCard}</div>
            <div className="flex items-center justify-center py-8 lg:col-span-1">
              <span
                className="font-serif text-5xl font-light"
                style={{ color: "rgba(30,58,95,0.25)" }}
              >
                &amp;
              </span>
            </div>
            <div className="lg:col-span-5">{isBrideFirst ? GroomCard : BrideCard}</div>
          </div>
        </div>
      </section>

      <SectionFloralDivider />
    </>
  );
}
