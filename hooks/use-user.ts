"use client";

import * as React from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface UseUserReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Returns the currently authenticated Supabase user and session.
 * Subscribes to auth state changes so the UI re-renders on sign-in/sign-out.
 *
 * @example
 * const { user, loading } = useUser();
 * if (loading) return <Spinner />;
 * if (!user) return <LoginPrompt />;
 */
export function useUser(): UseUserReturn {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session synchronously
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading };
}
