import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "IDR", locale = "id-ID"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(d);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function extractCleanMusicTitle(fileUrlOrTitle: string): string {
  if (!fileUrlOrTitle) return "Musik Pilihan";
  try {
    let name = fileUrlOrTitle;
    try {
      name = decodeURIComponent(name);
    } catch {
      // ignore
    }
    name = name.split(/[/\\]/).pop() || name;
    name = name.split("?")[0];
    // Remove extensions: .mp3, .wav, .m4a, .flac, .ogg, .aac
    name = name.replace(/\.(mp3|wav|m4a|flac|ogg|aac)$/i, "");
    // Remove timestamp prefix (e.g. 17283918239_ or 17283918239-)
    name = name.replace(/^\d{10,13}[_-]/, "");
    // Replace underscores with spaces
    name = name.replace(/_/g, " ").replace(/\s+/g, " ").trim();
    return name || "Musik Pilihan";
  } catch {
    return fileUrlOrTitle.replace(/\.(mp3|wav|m4a|flac|ogg|aac)$/i, "");
  }
}
