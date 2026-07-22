export interface Plan {
  id: "free" | "starter" | "professional" | "enterprise";
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  currency: string;
  features: string[];
  limitations: {
    weddings: number | null;
    guests: number | null;
    templates: number | null;
  };
  isPopular?: boolean;
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Coba Gratis",
    description: "Untuk mencoba desain & preview template",
    price: { monthly: 0, annual: 0 },
    currency: "IDR",
    features: [
      "1 Undangan Draft / Preview",
      "Coba Desain & Live Preview",
      "Bebas Pilih Tema Demo",
      "Tanpa Link Slug Publik",
      "Tidak Bisa Tambah Tamu",
    ],
    limitations: { weddings: 1, guests: 0, templates: null },
    cta: "Coba Gratis",
  },
  {
    id: "starter",
    name: "Starter",
    description: "Untuk acara intim & keluarga",
    price: { monthly: 79000, annual: 79000 },
    currency: "IDR",
    features: [
      "1 Undangan Aktif + Slug Publik",
      "Maksimal 50 Tamu Undangan",
      "RSVP & Ucapan Digital",
      "Lokasi Google Maps & Bank Angpao",
      "Export Data Tamu Excel",
    ],
    limitations: { weddings: 1, guests: 50, templates: null },
    cta: "Pilih Starter",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Untuk pesta pernikahan & WO",
    price: { monthly: 149000, annual: 149000 },
    currency: "IDR",
    features: [
      "1 Undangan Premium + Slug Publik",
      "Maksimal 1.000 Tamu Undangan",
      "Kirim WhatsApp Otomatis ke Tamu",
      "RSVP & Ucapan Realtime",
      "Semua Musik & Galeri Custom",
      "Bebas Ubah Tema Kapan Saja",
    ],
    limitations: { weddings: 1, guests: 1000, templates: null },
    isPopular: true,
    cta: "Pilih Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solusi khusus Wedding Organizer",
    price: { monthly: 0, annual: 0 },
    currency: "IDR",
    features: [
      "Undangan & Tamu Tanpa Batas",
      "Kirim WA Blast Masal",
      "Custom Domain & Branding",
      "Account Manager Dedikasi",
      "SLA 99.9% Support Priority",
    ],
    limitations: { weddings: null, guests: null, templates: null },
    cta: "Hubungi Kami",
  },
];
