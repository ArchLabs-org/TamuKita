export interface TemplateMusic {
  themeId: string;
  title: string;
  artist: string;
  file: string;
}

export const TEMPLATE_MUSIC: Record<string, TemplateMusic> = {
  aurora: {
    themeId: "aurora",
    title: "Komang (Piano Cover)",
    artist: "Raim Laode",
    file: "/music/aurora.mp3",
  },
  aster: {
    themeId: "aster",
    title: "Akad (Piano Cover)",
    artist: "Payung Teduh",
    file: "/music/aster.mp3",
  },
  senja: {
    themeId: "senja",
    title: "Sampai Jadi Debu (Piano Cover)",
    artist: "Banda Neira",
    file: "/music/senja.mp3",
  },
  sagara: {
    themeId: "sagara",
    title: "Bermuara (Piano Cover)",
    artist: "Rizky Febian & Mahalini",
    file: "/music/sagara.mp3",
  },
  lumine: {
    themeId: "lumine",
    title: "Cinta Luar Biasa (Piano Cover)",
    artist: "Andmesh",
    file: "/music/lumine.mp3",
  },
  eterna: {
    themeId: "eterna",
    title: "Satu-Satu (Piano Cover)",
    artist: "Idgitaf",
    file: "/music/eterna.mp3",
  },
};

export function getTemplateMusic(themeId: string): TemplateMusic {
  return (
    TEMPLATE_MUSIC[themeId] || {
      themeId,
      title: "Tanpa Judul",
      artist: "Unknown Artist",
      file: `/music/${themeId}.mp3`,
    }
  );
}
