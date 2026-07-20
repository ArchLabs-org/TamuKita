import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/features/authentication/login-form";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Masuk",
  noIndex: true,
  path: "/login",
});

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Selamat datang kembali
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">Masuk ke akun TamuKita Anda</p>
      </div>
      {/* Suspense required because LoginForm uses useSearchParams */}
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
