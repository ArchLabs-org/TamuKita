"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface VideoProps {
  config: HeritageRoyaleConfig;
}

export function Video({ config }: VideoProps) {
  if (!config.videoUrl) return null;

  // Convert watch URLs to embed URLs if needed and append autoplay parameters
  const getEmbedUrl = (url: string) => {
    let cleanUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      cleanUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      cleanUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // Add autoplay, mute (required for autoplay in most browsers), loop, and playlist for seamless loop
    const urlObj = new URL(cleanUrl);
    urlObj.searchParams.set("autoplay", "1");
    urlObj.searchParams.set("mute", "1");
    urlObj.searchParams.set("loop", "1");
    urlObj.searchParams.set("playsinline", "1");
    urlObj.searchParams.set("controls", "1");

    // Extract video ID for loop playlist requirement
    const videoId = cleanUrl.split("/embed/")[1]?.split("?")[0];
    if (videoId) {
      urlObj.searchParams.set("playlist", videoId);
    }

    return urlObj.toString();
  };

  const autoplayUrl = getEmbedUrl(config.videoUrl);

  return (
    <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#1E3A5F" }}>
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn delay={0.1} className="w-full">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl"
            style={{ border: "2px solid #D4AF37" }}
          >
            <iframe
              src={autoplayUrl}
              title="Video Teaser Pernikahan"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
