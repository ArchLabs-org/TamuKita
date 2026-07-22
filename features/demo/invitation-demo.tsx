"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Clock,
  Heart,
  ChevronDown,
  Copy,
  Gift,
  Check,
  Sparkles,
  Maximize2,
  Minimize2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { extractCleanMusicTitle } from "@/lib/utils";
import { demoThemes, type DemoTheme } from "./data";
import { RsvpFormSimple } from "@/features/invitation/rsvp-form-simple";
import { getTemplateMusic, type TemplateMusic } from "@/config/template-music";

/* ════════════════════════════════════════════════════════════════════════════
   1. TEMPLATE-SPECIFIC AUDIO PLAYER (Strict Unique Audio Source per Theme)
════════════════════════════════════════════════════════════════════════════ */
function MusicPlayerWidget({
  theme,
  isOpened,
  musicConfig,
}: {
  theme: DemoTheme;
  isOpened: boolean;
  musicConfig?: TemplateMusic;
}) {
  const musicToUse = musicConfig || getTemplateMusic(theme.id);
  const [playing, setPlaying] = React.useState(false);
  const [audioExists, setAudioExists] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state
  const [musicFile, setMusicFile] = React.useState(musicToUse.file);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Check if audio file exists (custom music via proxy, or template music)
  React.useEffect(() => {
    let isMounted = true;

    // Destroy previous audio instance completely before loading new one
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }
    setPlaying(false);
    setAudioExists(null);
    setIsLoading(true); // Start loading
    setMusicFile(musicToUse.file);

    console.log(`[MusicPlayer] Checking audio file: ${musicToUse.file}`);

    // Try to load and check if file is accessible
    const testAudio = new Audio(musicToUse.file);
    testAudio.addEventListener(
      "canplay",
      () => {
        if (isMounted) {
          console.log(`[MusicPlayer] Audio ready: ${musicToUse.file}`);
          setAudioExists(true);
          setIsLoading(false); // Finish loading
        }
      },
      { once: true },
    );

    testAudio.addEventListener(
      "error",
      (e) => {
        if (isMounted) {
          console.warn(`[MusicPlayer] Audio load error: ${musicToUse.file}`, e);
          // Fallback to template if custom music fails
          if (musicConfig && musicConfig !== getTemplateMusic(theme.id)) {
            const templateMusic = getTemplateMusic(theme.id);
            console.log(`[MusicPlayer] Falling back to template: ${templateMusic.file}`);
            setMusicFile(templateMusic.file);
            setAudioExists(true); // Assume template music exists
          } else {
            setAudioExists(false);
          }
          setIsLoading(false); // Finish loading on error
        }
      },
      { once: true },
    );

    testAudio.load();

    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, [theme.id, musicToUse, musicConfig]);

  // Handle auto-play when invitation cover is opened
  React.useEffect(
    () => {
      // Auto-play when: invitation is opened AND audio is ready (not loading/null) AND not already playing
      if (isOpened && audioExists === true && !playing) {
        console.log(`[MusicPlayer] Auto-playing music: ${musicFile}`);

        // Small delay to ensure audio element is ready
        const timer = setTimeout(() => {
          const audio = new Audio(musicFile);
          audio.loop = true;
          audioRef.current = audio;

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log(`[MusicPlayer] Auto-play successful`);
                setPlaying(true);
              })
              .catch((err) => {
                console.warn(`[MusicPlayer] Auto-play blocked (browser policy):`, err.message);
                // Browser autoplay policy blocks this, that's ok
                setPlaying(false);
              });
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpened, audioExists, musicFile],
  );

  const toggleMusic = () => {
    if (!audioExists) return;

    if (playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicFile);
        audioRef.current.loop = true;
      }
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const spectrumBars = [0.4, 0.8, 0.5, 0.95, 0.6, 0.85, 0.45, 0.9, 0.65, 0.5];

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5">
      {/* Animated Sound Wave Notes floating up when playing */}
      <AnimatePresence>
        {playing && (
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.6, x: (i - 1) * 12 }}
                animate={{ opacity: [0, 0.8, 0], y: -40 - i * 15, scale: [0.6, 1, 0.8] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
                className="absolute text-xs"
                style={{ color: theme.palette.accent }}
              >
                {i % 2 === 0 ? "♫" : "♥"}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        disabled={!audioExists || isLoading}
        whileHover={audioExists && !isLoading ? { scale: 1.06 } : {}}
        whileTap={audioExists && !isLoading ? { scale: 0.94 } : {}}
        className={`group relative flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-xl backdrop-blur-xl transition-all ${
          !audioExists || isLoading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
        }`}
        style={{
          background: `${theme.palette.card}f0`,
          borderColor: theme.palette.border,
          boxShadow: `0 8px 32px ${theme.palette.accent}20`,
        }}
        aria-label={playing ? "Hentikan Musik" : "Putar Musik"}
      >
        {/* Spinning Vinyl Record Disc */}
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-zinc-900 shadow-inner"
        >
          <div
            className="h-2 w-2 rounded-full border border-white/20"
            style={{ background: theme.palette.accent }}
          />
          <div className="absolute h-1 w-1 rounded-full bg-white/80" />
        </motion.div>

        {/* Live Audio Frequency Spectrum Bars (Melody) */}
        <div className="flex items-end gap-[2px]" style={{ height: 14 }} aria-hidden="true">
          {spectrumBars.map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{ height: 14, originY: 1, background: theme.palette.accent }}
              animate={
                playing
                  ? {
                      scaleY: [0.2, h, 0.3, h * 1.1, 0.25],
                      opacity: [0.5, 1, 0.6, 1, 0.5],
                    }
                  : { scaleY: 0.2, opacity: 0.3 }
              }
              transition={{
                duration: 0.9 + i * 0.08,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.06,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-3.5 w-3.5"
          >
            <VolumeX size={12} style={{ color: theme.palette.textMuted }} aria-hidden="true" />
          </motion.div>
        ) : playing ? (
          <Volume2 size={12} style={{ color: theme.palette.accent }} aria-hidden="true" />
        ) : (
          <VolumeX size={12} style={{ color: theme.palette.textMuted }} aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   2. FLOATING PETALS & FLOWER PARTICLES SYSTEM (Tailored per Theme)
════════════════════════════════════════════════════════════════════════════ */
interface PetalParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  type: "petal" | "leaf" | "sparkle" | "bubble" | "star";
}

function FloatingPetalsSystem({ theme }: { theme: DemoTheme }) {
  const prefersReduced = useReducedMotion();

  const particles: PetalParticle[] = React.useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => {
      const seed = (i + 1) * 137.5;
      const x = seed % 96;
      const delay = seed % 12;
      const duration = 14 + (seed % 14); // Ultra slow & romantic (14s - 28s)
      const size = 8 + (seed % 16);
      const rotation = seed % 360;
      const drift = -40 + (seed % 80);

      let type: PetalParticle["type"] = "petal";
      if (theme.id === "sagara") type = "bubble";
      else if (theme.id === "aster") type = "star";
      else if (theme.id === "senja") type = "leaf";
      else if (theme.id === "lumine" && i % 3 === 0) type = "sparkle";

      return { id: i, x, delay, duration, size, rotation, drift, type };
    });
  }, [theme.id]);

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p) => {
        // Theme specific SVG Petal/Flower designs
        let elementContent: React.ReactNode = null;

        if (p.type === "bubble") {
          elementContent = (
            <div
              className="h-full w-full rounded-full border border-amber-300/30"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${theme.palette.accent}55, transparent)`,
              }}
            />
          );
        } else if (p.type === "star" || p.type === "sparkle") {
          elementContent = (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill={theme.palette.accent}>
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                opacity="0.65"
              />
            </svg>
          );
        } else if (p.type === "leaf") {
          elementContent = (
            <svg viewBox="0 0 30 40" className="h-full w-full">
              <path
                d="M15 0 C30 15, 25 35, 15 40 C5 35, 0 15, 15 0 Z"
                fill={theme.palette.accent}
                opacity="0.35"
              />
              <path d="M15 5 L15 35" stroke={theme.palette.bg} strokeWidth="1" opacity="0.4" />
            </svg>
          );
        } else {
          // Default Romantic Sakura/Rose Petals
          elementContent = (
            <svg viewBox="0 0 30 30" className="h-full w-full">
              <path
                d="M15 2 C22 2, 28 8, 28 15 C28 22, 20 28, 15 28 C10 28, 2 22, 2 15 C2 8, 8 2, 15 2 Z"
                fill={
                  theme.id === "aurora"
                    ? "#fda4af"
                    : theme.id === "eterna"
                      ? "#d4af37"
                      : theme.palette.accent
                }
                opacity={theme.id === "aurora" ? "0.45" : "0.35"}
              />
            </svg>
          );
        }

        return (
          <motion.div
            key={p.id}
            className="absolute top-[-40px]"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size * (p.type === "leaf" ? 1.3 : 1),
              filter: p.type === "sparkle" ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "none",
            }}
            animate={{
              y: ["0vh", "115vh"],
              x: [0, p.drift, -p.drift / 2, p.drift],
              rotate: [p.rotation, p.rotation + 360],
              opacity: [0, 0.75, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.85, 1],
            }}
          >
            {elementContent}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. THEME SPECIFIC FLORAL & ORNAMENT SVGs
════════════════════════════════════════════════════════════════════════════ */
function FloralCornerOrnament({
  theme,
  position,
}: {
  theme: DemoTheme;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const posClasses = {
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4 scale-[-1]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${posClasses[position]}`}
      animate={{ rotate: [0, 6, 0, -6, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="opacity-20">
        {theme.id === "eterna" ? (
          /* Classical Gold Lotus & Arch */
          <g stroke={theme.palette.accent} strokeWidth="1.2">
            <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="60" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={deg}
                d="M100 100 Q120 40 100 20 Q80 40 100 100"
                transform={`rotate(${deg} 100 100)`}
                fill={`${theme.palette.accent}15`}
              />
            ))}
          </g>
        ) : theme.id === "aster" ? (
          /* Minimal Luxury Geometrics */
          <g stroke={theme.palette.accent} strokeWidth="1">
            <rect x="30" y="30" width="140" height="140" transform="rotate(45 100 100)" />
            <circle cx="100" cy="100" r="45" />
            <path d="M100 0 L100 200 M0 100 L200 100" opacity="0.5" />
          </g>
        ) : (
          /* Floral Vines & Petal Mandalas */
          <g fill={theme.palette.accent}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
              <g key={d} transform={`rotate(${d} 100 100)`}>
                <path d="M100 30 C110 50, 110 70, 100 90 C90 70, 90 50, 100 30 Z" opacity="0.6" />
                <circle cx="100" cy="20" r="4" opacity="0.8" />
              </g>
            ))}
            <circle cx="100" cy="100" r="12" opacity="0.4" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

function SectionDivider({ theme }: { theme: DemoTheme }) {
  return (
    <div className="my-10 flex items-center justify-center gap-3">
      <div className="h-px w-16 md:w-24" style={{ background: theme.palette.border }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="flex items-center justify-center text-xs"
        style={{ color: theme.palette.accent }}
      >
        ✦
      </motion.div>
      <div className="h-px w-16 md:w-24" style={{ background: theme.palette.border }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. DISCRETE FLOATING TOP NAVIGATION TOOLBAR & FULLSCREEN TOGGLE
════════════════════════════════════════════════════════════════════════════ */
function DemoTopControlBar({ theme }: { theme: DemoTheme }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(() => {});
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 mx-auto flex max-w-2xl items-center justify-between px-4"
    >
      <div
        className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-lg backdrop-blur-xl transition-all"
        style={{
          background: `${theme.palette.card}e6`,
          borderColor: theme.palette.border,
        }}
      >
        <Link
          href="/demo"
          className="flex items-center gap-1.5 font-sans text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: theme.palette.textMuted }}
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span className="hidden sm:inline">Galeri</span>
        </Link>

        <div className="h-3 w-px bg-border/50" aria-hidden="true" />

        {/* Theme Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 font-display text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: theme.palette.accent }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: theme.palette.accent }}
            />
            {theme.name}
            <ChevronDown
              size={12}
              className={`transition-transform ${showThemeMenu ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showThemeMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute left-0 mt-2 w-48 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl"
                style={{
                  background: theme.palette.card,
                  borderColor: theme.palette.border,
                }}
              >
                <div className="px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Pilih Tema Demo
                </div>
                {demoThemes.map((t) => (
                  <Link
                    key={t.id}
                    href={`/demo/${t.id}`}
                    onClick={() => setShowThemeMenu(false)}
                    className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 font-sans text-xs transition-colors ${
                      t.id === theme.id ? "bg-muted font-medium" : "hover:bg-muted/60"
                    }`}
                    style={{ color: t.id === theme.id ? theme.palette.accent : theme.palette.text }}
                  >
                    <span>{t.name}</span>
                    <span className="text-[10px] text-muted-foreground">{t.tagline}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className="flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-xl"
        style={{
          background: `${theme.palette.card}e6`,
          borderColor: theme.palette.border,
        }}
      >
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1 rounded-full p-1 transition-opacity hover:opacity-70"
          style={{ color: theme.palette.textMuted }}
          title={isFullscreen ? "Keluar Fullscreen" : "Layar Penuh (Undangan Beneran)"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>

        <Button
          variant="brand"
          size="sm"
          asChild
          className="h-7 rounded-full px-3.5 text-[11px] font-medium shadow-sm"
        >
          <Link href={ROUTES.register}>Gunakan Tema</Link>
        </Button>
      </div>
    </motion.header>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   5. COVER ENVELOPE / OPENING SCREEN ("Buka Undangan Beneran")
════════════════════════════════════════════════════════════════════════════ */
function CoverEnvelopeSection({
  theme,
  isOpened,
  guestName = "Tamu Undangan Spesial",
  onOpen,
}: {
  theme: DemoTheme;
  isOpened: boolean;
  guestName?: string;
  onOpen: () => void;
}) {
  return (
    <motion.section
      initial={false}
      animate={
        isOpened
          ? { y: "-100vh", opacity: 0, pointerEvents: "none" }
          : { y: "0vh", opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: theme.palette.bg }}
    >
      <FloralCornerOrnament theme={theme} position="top-left" />
      <FloralCornerOrnament theme={theme} position="top-right" />
      <FloralCornerOrnament theme={theme} position="bottom-left" />
      <FloralCornerOrnament theme={theme} position="bottom-right" />

      {/* Center Decorative Emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border shadow-xl"
        style={{
          borderColor: theme.palette.border,
          background: `${theme.palette.card}b0`,
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-8px] rounded-full border border-dashed opacity-40"
          style={{ borderColor: theme.palette.accent }}
        />
        <span className="font-display text-2xl font-light" style={{ color: theme.palette.accent }}>
          {theme.couple.coupleOrder === "groom_first"
            ? `${theme.couple.groom[0]} & ${theme.couple.bride[0]}`
            : `${theme.couple.bride[0]} & ${theme.couple.groom[0]}`}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-sans text-xs uppercase tracking-[0.3em]"
        style={{ color: theme.palette.textMuted }}
      >
        Undangan Pernikahan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 font-display font-light leading-tight"
        style={{
          color: theme.palette.accent,
          fontSize: "clamp(2.8rem, 8vw, 4.8rem)",
        }}
      >
        {(() => {
          const isGroomFirst = theme.couple.coupleOrder === "groom_first";
          const first = isGroomFirst ? theme.couple.groom : theme.couple.bride;
          const second = isGroomFirst ? theme.couple.bride : theme.couple.groom;
          return `${first.split(" ")[0]} & ${second.split(" ")[0]}`;
        })()}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.6 }}
        className="mt-2 font-sans text-xs uppercase tracking-widest"
        style={{ color: theme.palette.textMuted }}
      >
        {theme.event.reception.date}
      </motion.p>

      {/* Guest Card Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.8 }}
        className="mt-8 rounded-2xl border px-8 py-5 shadow-lg backdrop-blur-md"
        style={{
          borderColor: theme.palette.border,
          background: `${theme.palette.card}e6`,
        }}
      >
        <p
          className="font-sans text-[11px] uppercase tracking-wider"
          style={{ color: theme.palette.textMuted }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
        </p>
        <p
          className="mt-1 font-display text-lg font-medium"
          style={{ color: theme.palette.accent }}
        >
          {guestName}
        </p>
      </motion.div>

      {/* Buka Undangan Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-8"
      >
        <Button
          variant="brand"
          size="lg"
          onClick={onOpen}
          className="group relative h-12 gap-2.5 rounded-full px-8 font-sans text-xs uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={14} className="fill-current" />
          </motion.span>
          Buka Undangan
        </Button>
      </motion.div>
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   6. MAIN INVITATION CONTENT SECTIONS (Parallax & Slow Motion)
════════════════════════════════════════════════════════════════════════════ */

/* SECTION: Hero Cover */
function HeroCoverSection({ theme }: { theme: DemoTheme }) {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: theme.palette.bg }}
    >
      <FloralCornerOrnament theme={theme} position="top-left" />
      <FloralCornerOrnament theme={theme} position="top-right" />

      <motion.div style={{ y, opacity }} className="relative z-20 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-sans text-xs uppercase tracking-[0.3em]"
          style={{ color: theme.palette.textMuted }}
        >
          Walimatul Ursy
        </motion.p>

        <SectionDivider theme={theme} />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light leading-none"
          style={{
            color: theme.palette.accent,
            fontSize: "clamp(3.6rem, 11vw, 6.5rem)",
          }}
        >
          {
            (theme.couple.coupleOrder === "groom_first"
              ? theme.couple.groom
              : theme.couple.bride
            ).split(" ")[0]
          }
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="my-3 flex items-center gap-4"
        >
          <div className="h-px w-12" style={{ background: theme.palette.border }} />
          <span
            className="font-display text-3xl font-light"
            style={{ color: theme.palette.accent }}
          >
            &amp;
          </span>
          <div className="h-px w-12" style={{ background: theme.palette.border }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light leading-none"
          style={{
            color: theme.palette.accent,
            fontSize: "clamp(3.6rem, 11vw, 6.5rem)",
          }}
        >
          {
            (theme.couple.coupleOrder === "groom_first"
              ? theme.couple.bride
              : theme.couple.groom
            ).split(" ")[0]
          }
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 font-sans text-xs uppercase tracking-[0.2em]"
          style={{ color: theme.palette.textMuted }}
        >
          {theme.event.reception.date}
        </motion.p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-14 flex flex-col items-center gap-2 opacity-60"
        >
          <span
            className="font-sans text-[10px] uppercase tracking-widest"
            style={{ color: theme.palette.textMuted }}
          >
            Gulir ke Bawah
          </span>
          <ChevronDown size={16} style={{ color: theme.palette.accent }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* SECTION: Quran Verse / Quote */
function QuoteSection({ theme }: { theme: DemoTheme }) {
  return (
    <section
      className="relative px-6 py-20 text-center"
      style={{ background: theme.palette.bgSecondary }}
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2 }}
          className="rounded-3xl border p-8 shadow-xl backdrop-blur-md md:p-12"
          style={{
            borderColor: theme.palette.border,
            background: theme.palette.card,
          }}
        >
          <p
            className="font-serif text-xl leading-relaxed opacity-90 md:text-2xl"
            style={{ color: theme.palette.accent }}
          >
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.&rdquo;
          </p>
          <p
            className="mt-4 font-sans text-xs uppercase tracking-[0.2em]"
            style={{ color: theme.palette.textMuted }}
          >
            — QS. Ar-Rum: 21
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* SECTION: Mempelai (Couple Profiles with Soft Vignette & Circle Blur Blend) */
function CoupleSection({
  theme,
  bridePhotoUrl,
  groomPhotoUrl,
}: {
  theme: DemoTheme;
  bridePhotoUrl?: string;
  groomPhotoUrl?: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ background: theme.palette.bg }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs uppercase tracking-[0.25em]"
          style={{ color: theme.palette.textMuted }}
        >
          Pasangan Mempelai
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          Mempelai Yang Bahagia
        </motion.h2>

        <SectionDivider theme={theme} />

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {theme.couple.coupleOrder === "groom_first" ? (
            <>
              {/* Groom Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border p-8 shadow-xl transition-transform hover:-translate-y-1"
                style={{ borderColor: theme.palette.border, background: theme.palette.card }}
              >
                <div
                  className="relative mb-5 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border p-1.5 shadow-2xl"
                  style={{ borderColor: theme.palette.accent }}
                >
                  {groomPhotoUrl ? (
                    <img
                      src={groomPhotoUrl}
                      alt={theme.couple.groom}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="circle-blur-blend vignette-effect flex h-full w-full items-center justify-center overflow-hidden rounded-full"
                      style={{ background: theme.palette.bgSecondary }}
                    >
                      <span
                        className="font-display text-4xl font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {theme.couple.groom[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3
                  className="font-display text-2xl font-medium"
                  style={{ color: theme.palette.accent }}
                >
                  {theme.couple.groom}
                </h3>
                <p
                  className="mt-2 font-sans text-xs leading-relaxed"
                  style={{ color: theme.palette.textMuted }}
                >
                  {theme.couple.groomParents}
                </p>
              </motion.div>

              {/* Bride Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border p-8 shadow-xl transition-transform hover:-translate-y-1"
                style={{ borderColor: theme.palette.border, background: theme.palette.card }}
              >
                <div
                  className="relative mb-5 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border p-1.5 shadow-2xl"
                  style={{ borderColor: theme.palette.accent }}
                >
                  {bridePhotoUrl ? (
                    <img
                      src={bridePhotoUrl}
                      alt={theme.couple.bride}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="circle-blur-blend vignette-effect flex h-full w-full items-center justify-center overflow-hidden rounded-full"
                      style={{ background: theme.palette.bgSecondary }}
                    >
                      <span
                        className="font-display text-4xl font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {theme.couple.bride[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3
                  className="font-display text-2xl font-medium"
                  style={{ color: theme.palette.accent }}
                >
                  {theme.couple.bride}
                </h3>
                <p
                  className="mt-2 font-sans text-xs leading-relaxed"
                  style={{ color: theme.palette.textMuted }}
                >
                  {theme.couple.brideParents}
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Bride Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border p-8 shadow-xl transition-transform hover:-translate-y-1"
                style={{ borderColor: theme.palette.border, background: theme.palette.card }}
              >
                <div
                  className="relative mb-5 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border p-1.5 shadow-2xl"
                  style={{ borderColor: theme.palette.accent }}
                >
                  {bridePhotoUrl ? (
                    <img
                      src={bridePhotoUrl}
                      alt={theme.couple.bride}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="circle-blur-blend vignette-effect flex h-full w-full items-center justify-center overflow-hidden rounded-full"
                      style={{ background: theme.palette.bgSecondary }}
                    >
                      <span
                        className="font-display text-4xl font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {theme.couple.bride[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3
                  className="font-display text-2xl font-medium"
                  style={{ color: theme.palette.accent }}
                >
                  {theme.couple.bride}
                </h3>
                <p
                  className="mt-2 font-sans text-xs leading-relaxed"
                  style={{ color: theme.palette.textMuted }}
                >
                  {theme.couple.brideParents}
                </p>
              </motion.div>

              {/* Groom Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center rounded-3xl border p-8 shadow-xl transition-transform hover:-translate-y-1"
                style={{ borderColor: theme.palette.border, background: theme.palette.card }}
              >
                <div
                  className="relative mb-5 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border p-1.5 shadow-2xl"
                  style={{ borderColor: theme.palette.accent }}
                >
                  {groomPhotoUrl ? (
                    <img
                      src={groomPhotoUrl}
                      alt={theme.couple.groom}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="circle-blur-blend vignette-effect flex h-full w-full items-center justify-center overflow-hidden rounded-full"
                      style={{ background: theme.palette.bgSecondary }}
                    >
                      <span
                        className="font-display text-4xl font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {theme.couple.groom[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3
                  className="font-display text-2xl font-medium"
                  style={{ color: theme.palette.accent }}
                >
                  {theme.couple.groom}
                </h3>
                <p
                  className="mt-2 font-sans text-xs leading-relaxed"
                  style={{ color: theme.palette.textMuted }}
                >
                  {theme.couple.groomParents}
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* SECTION: Event & Countdown with Google Maps Integration */
function CountdownTimer({ target }: { target: string }) {
  const calc = React.useCallback(() => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);

  const [time, setTime] = React.useState(calc);
  React.useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  const units = [
    { label: "Hari", val: time.days },
    { label: "Jam", val: time.hours },
    { label: "Menit", val: time.minutes },
    { label: "Detik", val: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {units.map((u, i) => (
        <div
          key={i}
          className="flex min-w-[70px] flex-col items-center rounded-2xl border p-3 shadow-md backdrop-blur-md sm:min-w-[85px] sm:p-4"
          style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.15)" }}
        >
          <span className="font-display text-2xl font-medium sm:text-3xl">
            {String(u.val).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-wider opacity-80">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function EventSection({ theme }: { theme: DemoTheme }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeMap, setActiveMap] = React.useState<string | null>(null);

  return (
    <section className="relative px-6 py-24" style={{ background: theme.palette.bgSecondary }}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs uppercase tracking-[0.25em]"
          style={{ color: theme.palette.textMuted }}
        >
          Waktu &amp; Tempat
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          Rangkaian Acara
        </motion.h2>

        <div className="mt-8">
          <CountdownTimer target={theme.event.countdown} />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Akad */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center rounded-3xl border p-8 shadow-xl"
            style={{ borderColor: theme.palette.border, background: theme.palette.card }}
          >
            <Calendar size={24} style={{ color: theme.palette.accent }} />
            <h3
              className="mt-3 font-display text-xl font-medium"
              style={{ color: theme.palette.accent }}
            >
              Akad Nikah
            </h3>
            <p
              className="mt-4 font-sans text-xs font-semibold"
              style={{ color: theme.palette.text }}
            >
              {theme.event.akad.date}
            </p>
            <p
              className="mt-1 flex items-center gap-1 font-sans text-xs"
              style={{ color: theme.palette.textMuted }}
            >
              <Clock size={12} /> {theme.event.akad.time}
            </p>
            <p
              className="mt-4 font-sans text-xs font-medium"
              style={{ color: theme.palette.accent }}
            >
              {theme.event.akad.venue}
            </p>
            <p
              className="mt-1 font-sans text-xs leading-relaxed"
              style={{ color: theme.palette.textMuted }}
            >
              {theme.event.akad.address}
            </p>

            {/* Embedded Google Maps — use pin URL if provided, else search by address */}
            <div
              className="mt-5 w-full overflow-hidden rounded-2xl border shadow-inner"
              style={{ borderColor: theme.palette.border, height: 160 }}
            >
              <iframe
                title="Google Maps Lokasi Akad"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={
                  theme.event.akad.mapsUrl
                    ? theme.event.akad.mapsUrl
                        .replace(
                          "/maps/",
                          "/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU35lE&q=",
                        )
                        .includes("embed")
                      ? theme.event.akad.mapsUrl // already embed URL
                      : `https://maps.google.com/maps?q=${encodeURIComponent(theme.event.akad.mapsUrl)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(theme.event.akad.venue + " " + theme.event.akad.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-5 h-9 gap-2 rounded-full px-5 text-xs font-medium transition-transform hover:scale-105"
              style={{
                borderColor: theme.palette.border,
                background: theme.palette.card,
                color: theme.palette.text,
              }}
              onClick={() =>
                window.open(
                  theme.event.akad.mapsUrl ||
                    `https://maps.google.com/?q=${encodeURIComponent(theme.event.akad.venue + " " + theme.event.akad.address)}`,
                  "_blank",
                )
              }
            >
              <MapPin size={13} style={{ color: theme.palette.accent }} /> Buka Google Maps
            </Button>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="flex flex-col items-center rounded-3xl border p-8 shadow-xl"
            style={{ borderColor: theme.palette.border, background: theme.palette.card }}
          >
            <Sparkles size={24} style={{ color: theme.palette.accent }} />
            <h3
              className="mt-3 font-display text-xl font-medium"
              style={{ color: theme.palette.accent }}
            >
              Resepsi Pernikahan
            </h3>
            <p
              className="mt-4 font-sans text-xs font-semibold"
              style={{ color: theme.palette.text }}
            >
              {theme.event.reception.date}
            </p>
            <p
              className="mt-1 flex items-center gap-1 font-sans text-xs"
              style={{ color: theme.palette.textMuted }}
            >
              <Clock size={12} /> {theme.event.reception.time}
            </p>
            <p
              className="mt-4 font-sans text-xs font-medium"
              style={{ color: theme.palette.accent }}
            >
              {theme.event.reception.venue}
            </p>
            <p
              className="mt-1 font-sans text-xs leading-relaxed"
              style={{ color: theme.palette.textMuted }}
            >
              {theme.event.reception.address}
            </p>

            {/* Embedded Google Maps — use pin URL if provided, else search by address */}
            <div
              className="mt-5 w-full overflow-hidden rounded-2xl border shadow-inner"
              style={{ borderColor: theme.palette.border, height: 160 }}
            >
              <iframe
                title="Google Maps Lokasi Resepsi"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={
                  theme.event.reception.mapsUrl
                    ? theme.event.reception.mapsUrl.includes("embed")
                      ? theme.event.reception.mapsUrl // already embed URL
                      : `https://maps.google.com/maps?q=${encodeURIComponent(theme.event.reception.mapsUrl)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(theme.event.reception.venue + " " + theme.event.reception.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-5 h-9 gap-2 rounded-full px-5 text-xs font-medium transition-transform hover:scale-105"
              style={{
                borderColor: theme.palette.border,
                background: theme.palette.card,
                color: theme.palette.text,
              }}
              onClick={() =>
                window.open(
                  theme.event.reception.mapsUrl ||
                    `https://maps.google.com/?q=${encodeURIComponent(theme.event.reception.venue + " " + theme.event.reception.address)}`,
                  "_blank",
                )
              }
            >
              <MapPin size={13} style={{ color: theme.palette.accent }} /> Buka Google Maps
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* SECTION: Digital Gift (Angpao) */
function GiftSection({ theme }: { theme: DemoTheme }) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  // If no gift accounts specified, do not render this section
  if (!theme.gifts || theme.gifts.length === 0) return null;

  const copyAccount = (account: string, index: number) => {
    navigator.clipboard.writeText(account);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section className="relative px-6 py-24" style={{ background: theme.palette.bg }}>
      <div className="mx-auto max-w-3xl text-center">
        <Gift size={28} className="mx-auto" style={{ color: theme.palette.accent }} />
        <h2
          className="mt-3 font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          Tanda Kasih &amp; Angpao Digital
        </h2>
        <p
          className="mt-3 font-sans text-xs leading-relaxed"
          style={{ color: theme.palette.textMuted }}
        >
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika ingin memberi tanda kasih,
          dapat mengirimkan melalui:
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {theme.gifts.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center rounded-3xl border p-6 shadow-md"
              style={{ borderColor: theme.palette.border, background: theme.palette.card }}
            >
              <span
                className="font-sans text-xs font-bold uppercase tracking-widest"
                style={{ color: theme.palette.accent }}
              >
                {g.bank}
              </span>
              <p
                className="mt-3 font-mono text-base font-bold tracking-wider"
                style={{ color: theme.palette.text }}
              >
                {g.account}
              </p>
              <p className="mt-1 font-sans text-xs" style={{ color: theme.palette.textMuted }}>
                a.n. {g.name}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyAccount(g.account, i)}
                className="mt-4 h-8 gap-1.5 rounded-full px-4 text-[11px]"
              >
                {copiedIndex === i ? (
                  <>
                    <Check size={12} className="text-emerald-500" /> Tersalin
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Salin Rekening
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION: RSVP & Live Wishes Wall with 1-by-1 Paginated Reader */
function RsvpSection({ theme }: { theme: DemoTheme }) {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("Hadir");
  const [message, setMessage] = React.useState("");
  const [readerIndex, setReaderIndex] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<"wall" | "single">("single");

  const [wishes, setWishes] = React.useState([
    {
      name: "Budi & Keluarga",
      status: "Hadir",
      message: "Selamat untuk Sekar & Dimas! Semoga bahagia selamanya dunia akhirat.",
    },
    {
      name: "Siti Rahma",
      status: "Hadir",
      message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Amin!",
    },
    {
      name: "Andi Wijaya",
      status: "Hadir",
      message: "Selamat menempuh hidup baru sahabatku, doa terbaik untuk kalian berdua!",
    },
    {
      name: "Ayu & Rendy",
      status: "Hadir",
      message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setWishes([{ name, status, message }, ...wishes]);
    setName("");
    setMessage("");
  };

  const nextWish = () => {
    setReaderIndex((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setReaderIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <section className="relative px-6 py-24" style={{ background: theme.palette.bgSecondary }}>
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          RSVP &amp; Ucapan Doa
        </h2>
        <p className="mt-2 font-sans text-xs" style={{ color: theme.palette.textMuted }}>
          Konfirmasi kehadiran Anda dan berikan doa terbaik untuk mempelai.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-3xl border p-6 text-left shadow-xl"
            style={{ borderColor: theme.palette.border, background: theme.palette.card }}
          >
            <div>
              <label
                className="font-sans text-xs font-medium"
                style={{ color: theme.palette.text }}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="mt-1.5 w-full rounded-2xl border px-4 py-2.5 text-xs outline-none transition-all focus:ring-2"
                style={{ borderColor: theme.palette.border, background: theme.palette.bg }}
              />
            </div>

            <div>
              <label
                className="font-sans text-xs font-medium"
                style={{ color: theme.palette.text }}
              >
                Konfirmasi Kehadiran
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border px-4 py-2.5 text-xs outline-none"
                style={{ borderColor: theme.palette.border, background: theme.palette.bg }}
              >
                <option value="Hadir">Saya Akan Hadir</option>
                <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>

            <div>
              <label
                className="font-sans text-xs font-medium"
                style={{ color: theme.palette.text }}
              >
                Ucapan &amp; Doa
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pesan & doa untuk kedua mempelai..."
                className="mt-1.5 w-full rounded-2xl border px-4 py-2.5 text-xs outline-none transition-all focus:ring-2"
                style={{ borderColor: theme.palette.border, background: theme.palette.bg }}
              />
            </div>

            <Button
              variant="brand"
              size="sm"
              type="submit"
              className="mt-2 h-10 rounded-full font-sans text-xs"
            >
              <Send size={13} className="mr-2" /> Kirim Ucapan
            </Button>
          </form>

          {/* Wishes List Wall / 1-by-1 Reader */}
          <div
            className="flex flex-col gap-4 rounded-3xl border p-6 text-left shadow-xl"
            style={{ borderColor: theme.palette.border, background: theme.palette.card }}
          >
            <div className="flex items-center justify-between">
              <h4
                className="font-sans text-xs font-bold uppercase tracking-wider opacity-80"
                style={{ color: theme.palette.accent }}
              >
                Ucapan Doa ({wishes.length})
              </h4>
              <div
                className="flex gap-1 rounded-full border p-1"
                style={{ borderColor: theme.palette.border }}
              >
                <button
                  onClick={() => setViewMode("single")}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    viewMode === "single" ? "bg-muted font-bold" : "opacity-60"
                  }`}
                  style={{ color: theme.palette.text }}
                >
                  Baca 1 Per 1
                </button>
                <button
                  onClick={() => setViewMode("wall")}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    viewMode === "wall" ? "bg-muted font-bold" : "opacity-60"
                  }`}
                  style={{ color: theme.palette.text }}
                >
                  Dinding
                </button>
              </div>
            </div>

            {viewMode === "single" ? (
              <div
                className="relative flex flex-1 flex-col justify-between rounded-2xl border p-5 shadow-sm"
                style={{ borderColor: theme.palette.border, background: theme.palette.bgSecondary }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={readerIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-sans text-sm font-bold"
                        style={{ color: theme.palette.accent }}
                      >
                        {wishes[readerIndex]?.name}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium"
                        style={{
                          background: `${theme.palette.accent}20`,
                          color: theme.palette.accent,
                        }}
                      >
                        {wishes[readerIndex]?.status}
                      </span>
                    </div>
                    <p
                      className="font-sans text-xs italic leading-relaxed opacity-90"
                      style={{ color: theme.palette.text }}
                    >
                      &ldquo;{wishes[readerIndex]?.message}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div
                  className="mt-6 flex items-center justify-between border-t pt-3"
                  style={{ borderColor: theme.palette.border }}
                >
                  <span className="font-sans text-[11px] text-muted-foreground">
                    Pesan {readerIndex + 1} dari {wishes.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={prevWish}
                      className="flex h-7 w-7 items-center justify-center rounded-full border transition-all hover:scale-110"
                      style={{ borderColor: theme.palette.border, color: theme.palette.text }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextWish}
                      className="flex h-7 w-7 items-center justify-center rounded-full border transition-all hover:scale-110"
                      style={{ borderColor: theme.palette.border, color: theme.palette.text }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex max-h-[340px] flex-col gap-3 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl border p-4 shadow-sm"
                    style={{
                      borderColor: theme.palette.border,
                      background: theme.palette.bgSecondary,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-sans text-xs font-bold"
                        style={{ color: theme.palette.text }}
                      >
                        {w.name}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 font-sans text-[9px] font-medium"
                        style={{
                          background: `${theme.palette.accent}20`,
                          color: theme.palette.accent,
                        }}
                      >
                        {w.status}
                      </span>
                    </div>
                    <p
                      className="mt-2 font-sans text-xs leading-relaxed opacity-90"
                      style={{ color: theme.palette.textMuted }}
                    >
                      &ldquo;{w.message}&rdquo;
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* SECTION: Love Story Timeline — only rendered when timeline has items */
function TimelineSection({ theme }: { theme: DemoTheme }) {
  // If no timeline items, render nothing
  if (!theme.timeline || theme.timeline.length === 0) return null;

  return (
    <section className="relative px-6 py-24" style={{ background: theme.palette.bg }}>
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs uppercase tracking-[0.25em]"
          style={{ color: theme.palette.textMuted }}
        >
          Kisah Kami
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          Perjalanan Cinta
        </motion.h2>

        <SectionDivider theme={theme} />

        <div className="relative mt-12 space-y-8 text-left">
          {/* Vertical Connecting Line */}
          <div
            className="absolute bottom-3 left-4 top-3 w-0.5 md:left-1/2 md:-translate-x-1/2"
            style={{ background: theme.palette.border }}
          />

          {theme.timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative flex flex-col items-start md:flex-row ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div
                className="absolute left-4 top-1.5 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border shadow-md md:left-1/2"
                style={{
                  borderColor: theme.palette.accent,
                  background: theme.palette.card,
                  color: theme.palette.accent,
                }}
              >
                <Heart size={10} className="fill-current" />
              </div>

              {/* Content Card */}
              <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                <div
                  className="rounded-2xl border p-5 shadow-lg backdrop-blur-md"
                  style={{ borderColor: theme.palette.border, background: theme.palette.card }}
                >
                  <span
                    className="inline-block rounded-full px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${theme.palette.accent}20`, color: theme.palette.accent }}
                  >
                    {item.year}
                  </span>
                  <h4
                    className="mt-2 font-display text-lg font-medium"
                    style={{ color: theme.palette.accent }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="mt-1 font-sans text-xs leading-relaxed opacity-90"
                    style={{ color: theme.palette.textMuted }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SECTION: Photo Gallery with Lightbox */
function GallerySection({ theme, galleryUrls }: { theme: DemoTheme; galleryUrls?: string[] }) {
  const [selectedPhoto, setSelectedPhoto] = React.useState<number | null>(null);

  // Use real gallery URLs if provided, otherwise use theme gradients
  const photos = galleryUrls && galleryUrls.length > 0 ? galleryUrls : theme.gallery;
  const isRealPhotos = galleryUrls && galleryUrls.length > 0;

  // Debug logging
  if (typeof window !== "undefined") {
    console.log("[GallerySection] galleryUrls:", galleryUrls);
    console.log("[GallerySection] isRealPhotos:", isRealPhotos);
    console.log("[GallerySection] photos length:", photos.length);
  }

  return (
    <section className="relative px-6 py-24" style={{ background: theme.palette.bgSecondary }}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs uppercase tracking-[0.25em]"
          style={{ color: theme.palette.textMuted }}
        >
          Memori Indah
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-light md:text-4xl"
          style={{ color: theme.palette.accent }}
        >
          Galeri Foto
        </motion.h2>

        <SectionDivider theme={theme} />

        {photos.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="font-sans text-xs text-muted-foreground">
              Belum ada foto galeri. Upload foto untuk menampilkan di sini.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
            {photos.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                onClick={() => setSelectedPhoto(i)}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border shadow-md transition-all hover:scale-105 hover:shadow-2xl"
                style={{ borderColor: theme.palette.border }}
              >
                {isRealPhotos ? (
                  // Real image from Supabase
                  <img
                    src={item}
                    alt={`Foto ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  // Demo gradient placeholder
                  <div
                    className={`h-full w-full bg-gradient-to-br ${item} transition-transform duration-700 group-hover:scale-110`}
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/80 p-2 text-black shadow-lg backdrop-blur-md">
                    <Sparkles size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl"
              style={{ borderColor: theme.palette.border }}
            >
              {isRealPhotos ? (
                <img
                  src={photos[selectedPhoto]}
                  alt={`Foto ${selectedPhoto + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${photos[selectedPhoto]}`} />
              )}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2.5 text-xs text-white transition-opacity hover:opacity-80"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN DEMO COMPONENT ENTRY POINT
════════════════════════════════════════════════════════════════════════════ */
export function InvitationDemo({
  theme,
  guestName = "Tamu Undangan Spesial",
  weddingId,
  slug,
  galleryUrls,
  bridePhotoUrl,
  groomPhotoUrl,
  coverPhotoUrl,
  musicConfig,
}: {
  theme: DemoTheme;
  guestName?: string;
  weddingId?: string;
  slug?: string;
  galleryUrls?: string[];
  bridePhotoUrl?: string;
  groomPhotoUrl?: string;
  coverPhotoUrl?: string;
  musicConfig?: TemplateMusic;
}) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [guestId, setGuestId] = React.useState<string | undefined>(undefined);

  // Debug: log weddingId and slug
  React.useEffect(() => {
    console.log("[InvitationDemo] weddingId:", weddingId, "slug:", slug, "guestName:", guestName);
  }, [weddingId, slug, guestName]);

  return (
    <div
      className="relative min-h-screen font-sans selection:bg-brand-500 selection:text-white"
      style={{ background: theme.palette.bg, color: theme.palette.text }}
    >
      {/* Dynamic Theme Floating Petals Engine */}
      <FloatingPetalsSystem theme={theme} />

      {/* Interactive Top Floating Control Bar — Only show for demo (no weddingId) */}
      {!weddingId && <DemoTopControlBar theme={theme} />}

      {/* Opening Envelope Screen */}
      <CoverEnvelopeSection
        theme={theme}
        isOpened={isOpened}
        guestName={guestName}
        onOpen={() => setIsOpened(true)}
      />

      {/* Live Audio Visualizer Widget */}
      <MusicPlayerWidget theme={theme} isOpened={isOpened} musicConfig={musicConfig} />

      {/* Main Invitation Sections */}
      {isOpened && (
        <main className="relative z-20">
          <HeroCoverSection theme={theme} />
          <QuoteSection theme={theme} />
          <CoupleSection
            theme={theme}
            bridePhotoUrl={bridePhotoUrl}
            groomPhotoUrl={groomPhotoUrl}
          />
          <TimelineSection theme={theme} />
          <EventSection theme={theme} />
          <GallerySection theme={theme} galleryUrls={galleryUrls} />
          <GiftSection theme={theme} />
          <section
            className="relative px-6 py-24"
            style={{ background: theme.palette.bgSecondary }}
          >
            <div className="mx-auto max-w-4xl">
              <h2
                className="text-center font-display text-3xl font-light md:text-4xl"
                style={{ color: theme.palette.accent }}
              >
                RSVP &amp; Ucapan Doa
              </h2>
              <p
                className="mt-2 text-center font-sans text-xs"
                style={{ color: theme.palette.textMuted }}
              >
                Konfirmasi kehadiran Anda dan berikan doa terbaik untuk mempelai.
              </p>
              <RsvpFormSimple theme={theme} weddingId={weddingId} guestName={guestName} />
            </div>
          </section>

          {/* Footer */}
          <footer
            className="border-t px-6 py-12 text-center"
            style={{ borderColor: theme.palette.border, background: theme.palette.bg }}
          >
            <p className="font-display text-lg font-light" style={{ color: theme.palette.accent }}>
              {theme.couple.coupleOrder === "groom_first"
                ? `${theme.couple.groom} & ${theme.couple.bride}`
                : `${theme.couple.bride} & ${theme.couple.groom}`}
            </p>
            <p
              className="mt-2 font-sans text-xs opacity-60"
              style={{ color: theme.palette.textMuted }}
            >
              Terima kasih telah menjadi bagian dari hari bahagia kami.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-sans text-[10px] uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ borderColor: theme.palette.border, color: theme.palette.textMuted }}
              >
                Dibuat dengan <Sparkles size={11} className="text-amber-500" /> TamuKita
              </Link>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
