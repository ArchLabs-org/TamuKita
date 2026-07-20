"use client";

import * as React from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToasterContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToasterContext = React.createContext<ToasterContextType | null>(null);

export function useToast() {
  const ctx = React.useContext(ToasterContext);
  if (!ctx) throw new Error("useToast must be used within Toaster");
  return ctx;
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToasterContext.Provider value={{ toasts, toast, dismiss }}>
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`animate-fade-in-up rounded-lg border p-4 shadow-lg transition-all ${
              t.variant === "destructive"
                ? "border-destructive/50 bg-destructive text-destructive-foreground"
                : "border-border bg-card text-card-foreground"
            }`}
          >
            {t.title && <p className="text-sm font-semibold">{t.title}</p>}
            {t.description && <p className="text-sm opacity-80">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
}
