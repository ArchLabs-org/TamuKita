"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface OvalPhotoFrameProps {
  photoUrl: string;
  coupleName?: string;
  className?: string;
}

export function OvalPhotoFrame({
  photoUrl,
  coupleName = "Couple",
  className = "",
}: OvalPhotoFrameProps) {
  return (
    <div className={`relative mx-auto my-6 flex justify-center ${className}`}>
      {/* Oval Arch Photo Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-72 w-52 overflow-hidden rounded-[140px] border-4 border-white bg-white shadow-2xl ring-1 ring-slate-200 sm:h-96 sm:w-64 md:h-[400px] md:w-72"
      >
        <Image
          src={photoUrl}
          alt={coupleName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </motion.div>
    </div>
  );
}
