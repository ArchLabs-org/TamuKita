"use client";

import * as React from "react";
import { defaultHeritageRoyaleConfig, type HeritageRoyaleConfig } from "./config/ThemeConfig";
import { HeroCover } from "./components/HeroCover/HeroCover";
import { Opening } from "./components/Opening/Opening";
import { Quote } from "./components/Quote/Quote";
import { Bride } from "./components/Bride/Bride";
import { Parents } from "./components/Parents/Parents";
import { Story } from "./components/Story/Story";
import { Timeline } from "./components/Timeline/Timeline";
import { Gallery } from "./components/Gallery/Gallery";
import { Video } from "./components/Video/Video";
import { Event } from "./components/Event/Event";
import { Location } from "./components/Location/Location";
import { Countdown } from "./components/Countdown/Countdown";
import { Gift } from "./components/Gift/Gift";
import { RSVP } from "./components/RSVP/RSVP";
import { Prayer } from "./components/Prayer/Prayer";
import { Closing } from "./components/Closing/Closing";
import { Footer } from "./components/Footer/Footer";
import { AnimatedFloatingOrnaments } from "./assets/AnimatedFloatingOrnaments";

interface HeritageRoyaleThemeProps {
  config?: Partial<HeritageRoyaleConfig>;
  weddingId?: string;
  guestName?: string;
}

export function HeritageRoyaleTheme({
  config: userConfig,
  weddingId,
  guestName,
}: HeritageRoyaleThemeProps) {
  const [isCoverOpened, setIsCoverOpened] = React.useState(false);

  // Merge user custom config with theme default config
  const config: HeritageRoyaleConfig = React.useMemo(() => {
    return {
      ...defaultHeritageRoyaleConfig,
      ...userConfig,
      couple: {
        ...defaultHeritageRoyaleConfig.couple,
        ...userConfig?.couple,
      },
      event: {
        ...defaultHeritageRoyaleConfig.event,
        ...userConfig?.event,
      },
    };
  }, [userConfig]);

  // Check if story is available in config, otherwise hide it
  const hasStory = !!config.couple.story && config.couple.story.trim().length > 0;
  // Check if video is available in config, otherwise hide it
  const hasVideo = !!config.videoUrl && config.videoUrl.trim().length > 0;
  // Check if gifts is available, otherwise hide it
  const hasGifts = !!config.gifts && config.gifts.length > 0;

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] font-sans text-[#1E3A5F] antialiased selection:bg-[#1E3A5F] selection:text-white">
      {/* Dynamic Floating Ambient Ornaments Engine (Scroll Parallax & Sparkles) */}
      <AnimatedFloatingOrnaments />

      {/* 01. Cover Gate Modal */}
      <HeroCover config={config} guestName={guestName} onOpen={() => setIsCoverOpened(true)} />

      {/* Main Experience — Sections alternate bg with floral SVG dividers between each */}
      <main className={isCoverOpened ? "block" : "pointer-events-none hidden opacity-30 sm:block"}>
        {/* 02. Opening: Couple photo, names, countdown pills */}
        <Opening config={config} />

        {/* 03. Sacred Verse */}
        <Quote />

        {/* 04. Bride & Groom Profiles */}
        <Bride config={config} />

        {/* 05. Ancestry & Parents */}
        <Parents config={config} />

        {/* 06. Love Story Timeline (Hidden if no story exists) */}
        {hasStory && <Story config={config} />}

        {/* 07. Schedule */}
        <Timeline config={config} />

        {/* 08. Photo Gallery Lightbox */}
        <Gallery config={config} />

        {/* 09. Cinematic Video Teaser (Hidden if no video exists) */}
        {hasVideo && <Video config={config} />}

        {/* 10. Ceremony & Reception */}
        <Event config={config} />

        {/* 11. Location Map */}
        <Location config={config} />

        {/* 12. Countdown Timer */}
        <Countdown config={config} />

        {/* 13. Digital Gift & Angpao (Hidden if no gifts exist) */}
        {hasGifts && <Gift config={config} />}

        {/* 14. RSVP Form & wishes sync */}
        <RSVP config={config} weddingId={weddingId} guestName={guestName} />

        {/* 16. Closing Blessing */}
        <Closing config={config} />

        {/* 17. Footer */}
        <Footer audioUrl={config.audioUrl} />
      </main>
    </div>
  );
}

export default HeritageRoyaleTheme;
