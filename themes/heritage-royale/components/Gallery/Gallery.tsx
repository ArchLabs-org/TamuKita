"use client";

import * as React from "react";
import Image from "next/image";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface GalleryProps {
  config: HeritageRoyaleConfig;
}

export function Gallery({ config }: GalleryProps) {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  if (!config.gallery || config.gallery.length === 0) return null;

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#1E3A5F" }}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#93C5FD" }}
            >
              Galeri Foto
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-5xl"
              style={{ color: "#FFFFFF" }}
            >
              Momen Kebersamaan
            </h2>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.gallery.map((img, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div
                  onClick={() => setActiveImage(img.url)}
                  className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-2xl shadow-xl sm:h-72"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <Image
                    src={img.url}
                    alt={img.caption || `Galeri Foto ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(30,58,95,0.55)" }}
                  >
                    <span
                      className="rounded-full px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest"
                      style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.6)" }}
                    >
                      Perbesar
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          >
            <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl">
              <Image
                src={activeImage}
                alt="Galeri Foto Enlarge"
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>
          </div>
        )}
      </section>

      <SectionFloralDivider />
    </>
  );
}
