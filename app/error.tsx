"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[TamuKita] Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-6xl text-brand-200 mb-6" aria-hidden="true">⚠️</div>
      <h1 className="text-2xl font-bold text-foreground">Terjadi kesalahan</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Sesuatu tidak berjalan dengan benar. Tim kami sudah diberitahu.
      </p>
      <Button variant="brand" className="mt-8" onClick={reset}>
        Coba Lagi
      </Button>
    </div>
  );
}
