import { heritageColors } from "./theme-colors";

/**
 * Heritage Royale — ThemeConfig Specification Interface
 */

export interface HeritageRoyaleConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  style: string;
  palette: typeof heritageColors;
  couple: {
    bride: string;
    brideParents: string;
    brideInstagram?: string;
    groom: string;
    groomParents: string;
    groomInstagram?: string;
    story?: string;
    coupleOrder?: "bride_first" | "groom_first";
  };
  event: {
    akad: {
      date: string;
      time: string;
      venue: string;
      address: string;
      mapsUrl?: string;
    };
    reception: {
      date: string;
      time: string;
      venue: string;
      address: string;
      mapsUrl?: string;
    };
    countdownIso: string;
  };
  gallery: {
    url: string;
    caption?: string;
    aspectRatio?: "portrait" | "landscape" | "square";
  }[];
  videoUrl?: string;
  timeline: {
    year: string;
    title: string;
    desc: string;
  }[];
  gifts: {
    bank: string;
    account: string;
    name: string;
  }[];
  audioUrl?: string;
}

export const defaultHeritageRoyaleConfig: HeritageRoyaleConfig = {
  id: "heritage-royale",
  name: "Heritage Royale",
  tagline: "L'Éternité d’Or",
  description:
    "Haute couture digital wedding experience featuring royal emerald, champagne gold filigree, and Javanese Gunungan craftsmanship.",
  style: "Imperial Emerald · Champagne Gold · Royal Filigree",
  palette: heritageColors,
  couple: {
    bride: "Sekar Ayu",
    brideParents: "Putri dari Bpk. H. Slamet & Ibu Hj. Winarti",
    brideInstagram: "@sekarayu",
    groom: "Dimas Prasetyo",
    groomParents: "Putra dari Bpk. Ir. Bambang & Ibu Dr. Retno",
    groomInstagram: "@dimasprasetyo",
    story:
      "Kami pertama kali bertemu di sebuah pameran seni di Jakarta, November 2021. Sekar sedang mengagumi sebuah lukisan, dan Dimas memberanikan diri untuk menyapa. Dari satu percakapan tentang seni, tumbuh sebuah cerita cinta yang indah.",
    coupleOrder: "bride_first",
  },
  event: {
    akad: {
      date: "Sabtu, 8 November 2025",
      time: "08.00 — 10.00 WIB",
      venue: "Masjid Al-Azhar Jakarta",
      address: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      mapsUrl: "https://maps.google.com",
    },
    reception: {
      date: "Sabtu, 8 November 2025",
      time: "12.00 — 15.00 WIB",
      venue: "Ayana Resort & Spa Bali",
      address: "Jl. Karang Mas Sejahtera, Jimbaran, Bali 80364",
      mapsUrl: "https://maps.google.com",
    },
    countdownIso: "2025-11-08T08:00:00",
  },
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
      caption: "Janji Suci",
      aspectRatio: "portrait",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200",
      caption: "Momen Indah",
      aspectRatio: "landscape",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
      caption: "Senyum Bahagia",
      aspectRatio: "square",
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200",
      caption: "Genggaman Cinta",
      aspectRatio: "portrait",
    },
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  timeline: [
    { year: "2021", title: "Pertama Bertemu", desc: "Pameran seni di Jakarta, November 2021" },
    { year: "2022", title: "Mulai Berpacaran", desc: "Setelah 8 bulan pertemanan yang indah" },
    { year: "2023", title: "Liburan Bersama", desc: "Road trip pertama kami ke Yogyakarta" },
    { year: "2024", title: "Lamaran", desc: "Dimas melamar di tepi pantai Uluwatu, Bali" },
    { year: "2025", title: "Hari Bahagia", desc: "Kami resmi bersatu selamanya" },
  ],
  gifts: [
    { bank: "BCA", account: "1234567890", name: "Sekar Ayu" },
    { bank: "Mandiri", account: "0987654321", name: "Dimas Prasetyo" },
  ],
  audioUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-113331.mp3",
};
