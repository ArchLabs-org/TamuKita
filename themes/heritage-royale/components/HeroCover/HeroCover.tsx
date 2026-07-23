"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSealEmblem } from "../../assets/WaxSealEmblem";
import { MultiLayerFloralCorners } from "../../assets/MultiLayerFloralCorners";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface HeroCoverProps {
  config: HeritageRoyaleConfig;
  onOpen: () => void;
  guestName?: string;
}

export function HeroCover({ config, onOpen, guestName }: HeroCoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const coverPhoto = config.gallery[0]?.url || "";

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="hero-cover-modal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex select-none items-center justify-center overflow-hidden p-4 text-center"
          style={{ backgroundColor: "#0B192C" }}
        >
          {/* Full Background Photo with Cinematic Dark Blur Gradient */}
          {coverPhoto && (
            <div className="absolute inset-0 z-0">
              <Image
                src={coverPhoto}
                alt={`${config.couple.bride} & ${config.couple.groom}`}
                fill
                priority
                className="contrast-110 object-cover object-center brightness-50 filter"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E2B]/85 via-[#0D1B2A]/75 to-[#0B192C]/95" />
            </div>
          )}

          {/* Animated Multi-Layer Floral Corner Ornaments */}
          <MultiLayerFloralCorners />

          {/* Clean Glassmorphism Luxury Envelope Gate Card */}
          <div
            className="relative z-10 flex w-full max-w-md flex-col items-center justify-between overflow-hidden rounded-3xl p-8 shadow-2xl sm:p-10"
            style={{
              backgroundColor: "rgba(30, 58, 95, 0.35)", // solid rich navy tint glass
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Top Royal Tag (Bright Gold) */}
            <p
              className="font-serif text-xs font-bold uppercase tracking-[0.35em]"
              style={{ color: "#D4AF37", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              The Wedding Invitation
            </p>

            {/* Gold Divider Line */}
            <div className="my-5 flex w-full items-center justify-center gap-3">
              <span className="block h-px w-14" style={{ backgroundColor: "#D4AF37" }} />
              <span style={{ color: "#D4AF37" }} className="text-xs">
                ✦
              </span>
              <span className="block h-px w-14" style={{ backgroundColor: "#D4AF37" }} />
            </div>

            {/* Couple Names - High Contrast Pure Gold & White */}
            <div className="my-3">
              <h1
                className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-5xl"
                style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
              >
                {config.couple.bride}
              </h1>
              <div
                className="my-2 font-serif text-2xl font-normal italic sm:text-3xl"
                style={{ color: "#D4AF37" }}
              >
                &amp;
              </div>
              <h1
                className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-5xl"
                style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
              >
                {config.couple.groom}
              </h1>
            </div>

            {/* Guest Invitation Badge - Deep Solid Blue-Gray Box */}
            <div
              className="my-6 w-full rounded-2xl p-4 text-center"
              style={{
                backgroundColor: "#1E293B",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <p
                className="font-sans text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "#93C5FD" }}
              >
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <p
                className="mt-1.5 truncate font-serif text-lg font-bold"
                style={{ color: "#FFFFFF" }}
              >
                {guestName || "Tamu Undangan Spesial"}
              </p>
            </div>

            {/* Luxury Envelope Button */}
            <WaxSealEmblem onClick={handleOpen} label="Buka Undangan" />

            {/* Bottom Instructional Subtitle */}
            <p
              className="mt-5 font-sans text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#FFFFFF", opacity: 0.8, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
            >
              Klik tombol amplop untuk membuka undangan
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
