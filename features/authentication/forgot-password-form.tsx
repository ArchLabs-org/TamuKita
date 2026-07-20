"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/utils/validators";
import { ROUTES } from "@/constants/routes";

export function ForgotPasswordForm() {
  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setServerError(null);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      if (!supabase) {
        setServerError("Layanan autentikasi belum dikonfigurasi.");
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}${ROUTES.resetPassword}`,
      });

      if (error) {
        setServerError(error.message);
        return;
      }

      setSuccess(true);
    } catch {
      setServerError("Terjadi kesalahan tak terduga. Silakan coba lagi.");
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center shadow-sm">
        <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
        <h3 className="mt-3 font-display text-lg font-semibold text-emerald-900">
          Email Pemulihan Terkirim
        </h3>
        <p className="mt-2 font-sans text-xs leading-relaxed text-emerald-700">
          Kami telah mengirimkan instruksi pemulihan password ke email Anda. Silakan periksa inbox
          atau folder spam Anda.
        </p>
        <Button variant="outline" size="sm" asChild className="mt-6 rounded-full px-6 text-xs">
          <Link href={ROUTES.login}>Kembali ke Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Akun Anda</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          error={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Mengirim...
          </>
        ) : (
          "Kirim Tautan Pemulihan"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={ROUTES.login}
          className="inline-flex items-center gap-1.5 font-medium text-brand-600 hover:underline"
        >
          <ArrowLeft size={14} /> Kembali ke halaman masuk
        </Link>
      </p>
    </form>
  );
}
