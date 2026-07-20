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
    name: "Gratis",
    description: "Untuk mencoba platform TamuKita",
    price: { monthly: 0, annual: 0 },
    currency: "IDR",
    features: [
      "1 undangan aktif",
      "Hingga 50 tamu",
      "3 template gratis",
      "RSVP digital",
      "QR Code tamu",
    ],
    limitations: { weddings: 1, guests: 50, templates: 3 },
    cta: "Mulai Gratis",
  },
  {
    id: "starter",
    name: "Starter",
    description: "Untuk pasangan yang ingin lebih",
    price: { monthly: 99000, annual: 79000 },
    currency: "IDR",
    features: [
      "3 undangan aktif",
      "Hingga 250 tamu",
      "Semua template premium",
      "RSVP + konfirmasi email",
      "Export Excel tamu",
      "Custom domain",
    ],
    limitations: { weddings: 3, guests: 250, templates: null },
    cta: "Pilih Starter",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Untuk wedding organizer profesional",
    price: { monthly: 299000, annual: 249000 },
    currency: "IDR",
    features: [
      "10 undangan aktif",
      "Hingga 1.000 tamu",
      "Semua template + desain custom",
      "Dashboard analitik lengkap",
      "Priority support",
      "White-label",
      "API akses",
    ],
    limitations: { weddings: 10, guests: 1000, templates: null },
    isPopular: true,
    cta: "Pilih Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solusi khusus untuk bisnis besar",
    price: { monthly: 0, annual: 0 },
    currency: "IDR",
    features: [
      "Undangan tidak terbatas",
      "Tamu tidak terbatas",
      "Onboarding dedikasi",
      "SLA 99.9%",
      "Custom integrasi",
      "Account manager",
    ],
    limitations: { weddings: null, guests: null, templates: null },
    cta: "Hubungi Kami",
  },
];
