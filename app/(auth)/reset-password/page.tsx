import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/authentication/reset-password-form";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Reset Password",
  noIndex: true,
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Buat password baru
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Masukkan password baru untuk akun Anda.
        </p>
      </div>
      <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-muted" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
