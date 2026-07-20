import type { Database } from "./database";

export type Wedding = Database["public"]["Tables"]["weddings"]["Row"];
export type Guest = Database["public"]["Tables"]["guests"]["Row"];

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  previewImage: string;
  category: "minimalist" | "romantic" | "traditional" | "modern" | "rustic";
  isPremium: boolean;
  tags: string[];
}

export type RsvpStatus = "pending" | "attending" | "not_attending" | "maybe";
