import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/authentication/forgot-password-form";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Lupa Password",
  noIndex: true,
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Lupa password Anda?
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Masukkan email yang terdaftar untuk menerima tautan pemulihan kata sandi.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
