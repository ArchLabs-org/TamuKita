import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export interface User {
  id: string;
  email: string;
  profile: Profile | null;
}

export interface Session {
  user: User;
  accessToken: string;
  expiresAt: number;
}

export type PlanType = "free" | "starter" | "professional" | "enterprise";
