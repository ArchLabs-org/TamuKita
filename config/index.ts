export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "TamuKita",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    isConfigured:
      !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  features: {
    analytics: process.env.NODE_ENV === "production",
  },
} as const;
