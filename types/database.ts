export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: "free" | "starter" | "professional" | "enterprise";
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "starter" | "professional" | "enterprise";
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "starter" | "professional" | "enterprise";
        };
      };
      weddings: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          bride_name: string;
          groom_name: string;
          wedding_date: string;
          venue: string | null;
          theme_id: string | null;
          slug: string;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          bride_name: string;
          groom_name: string;
          wedding_date: string;
          venue?: string | null;
          theme_id?: string | null;
          slug: string;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          bride_name?: string;
          groom_name?: string;
          wedding_date?: string;
          venue?: string | null;
          theme_id?: string | null;
          slug?: string;
          is_published?: boolean;
        };
      };
      guests: {
        Row: {
          id: string;
          created_at: string;
          wedding_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          rsvp_status: "pending" | "attending" | "not_attending" | "maybe";
          seat_number: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          wedding_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          rsvp_status?: "pending" | "attending" | "not_attending" | "maybe";
          seat_number?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          wedding_id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          rsvp_status?: "pending" | "attending" | "not_attending" | "maybe";
          seat_number?: string | null;
          notes?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_type: "free" | "starter" | "professional" | "enterprise";
      rsvp_status: "pending" | "attending" | "not_attending" | "maybe";
    };
  };
}
