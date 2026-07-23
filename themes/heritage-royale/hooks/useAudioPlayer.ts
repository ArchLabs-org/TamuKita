"use client";

import * as React from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
}

export function useAudioPlayer(audioUrl?: string): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (!audioUrl || typeof window === "undefined") return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  const play = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, []);

  const pause = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = React.useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, togglePlay, play, pause };
}
