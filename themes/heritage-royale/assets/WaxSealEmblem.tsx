"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function WaxSealEmblem({
  onClick,
  className = "",
  label = "Buka Undangan",
}: {
  onClick?: () => void;
  className?: string;
  label?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex cursor-pointer items-center justify-center outline-none ${className}`}
      style={{ border: "none", background: "none", padding: 0 }}
    >
      {/* Outer Glowing Gold Aura */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#D4AF37] opacity-60 blur-md transition-opacity group-hover:opacity-100"
      />

      {/* Button Pill: Navy background, solid Gold border */}
      <div
        className="relative flex items-center gap-3 rounded-full px-8 py-3.5 shadow-2xl"
        style={{
          backgroundColor: "#1E3A5F",
          border: "2px solid #D4AF37", // Border emas
        }}
      >
        {/* Envelope Icon (Bright Gold) */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] filter"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </motion.svg>

        {/* Text Label (Always Bright White) */}
        <span
          className="font-serif text-sm font-bold uppercase tracking-widest sm:text-base"
          style={{
            color: "#FFFFFF", // Teks Putih
            textShadow: "0 1.5px 2px rgba(0,0,0,0.5)",
          }}
        >
          {label}
        </span>

        {/* Sparkle Icon */}
        <motion.span
          className="text-xs"
          style={{ color: "#D4AF37" }}
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.span>
      </div>
    </motion.button>
  );
}
