"use client";

import * as React from "react";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

interface FooterProps {
  audioUrl?: string;
}

export function Footer({ audioUrl }: FooterProps) {
  const { isPlaying, togglePlay } = useAudioPlayer(audioUrl);

  return (
    <footer
      className="relative py-8 text-center"
      style={{ backgroundColor: "#1E3A5F", borderTop: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <p
          className="font-serif text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "#93C5FD" }}
        >
          TamuKita Heritage Royale
        </p>
        <p
          className="mt-2 font-sans text-[10px] tracking-wider"
          style={{ color: "rgba(147,197,253,0.5)" }}
        >
          © {new Date().getFullYear()} Heritage Royale Theme · All Rights Reserved
        </p>
      </div>

      {audioUrl && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
          style={{
            backgroundColor: "#1E3A5F",
            color: "#FFFFFF",
            border: "2px solid rgba(255,255,255,0.25)",
          }}
        >
          {isPlaying ? (
            <span className="flex animate-pulse items-center gap-0.5">
              <span className="h-4 w-1 rounded-full" style={{ backgroundColor: "#FFFFFF" }} />
              <span className="h-6 w-1 rounded-full" style={{ backgroundColor: "#FFFFFF" }} />
              <span className="h-3 w-1 rounded-full" style={{ backgroundColor: "#FFFFFF" }} />
            </span>
          ) : (
            <span className="text-lg">🎵</span>
          )}
        </button>
      )}
    </footer>
  );
}
