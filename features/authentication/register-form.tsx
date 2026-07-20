"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/utils/validators";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [emailSent, setEmailSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setServerError(null);

    const supabase = createClient();

    if (!supabase) {
      setServerError("Layanan autentikasi belum dikonfigurasi.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    // Supabase may auto-confirm depending on project settings.
    // Check session — if confirmed immediately, go to dashboard.
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push(ROUTES.dashboard);
      router.refresh();
    } else {
      // Email confirmation required
      setEmailSent(true);
    }
  }

  if (emailSent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center shadow-sm">
        <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
        <h3 className="mt-3 font-display text-lg font-semibold text-emerald-900">
          Verifikasi Email
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-emerald-700">
          Kami telah mengirimkan tautan konfirmasi ke{" "}
          <span className="font-medium">{getValues("email")}</span>. Silakan cek inbox atau folder
          spam Anda.
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
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          error={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="text-sm text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          error={!!errors.email}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="reg-email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-password">Password</Label>
        <div className="relative">
          <Input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            error={!!errors.password}
            aria-describedby={errors.password ? "reg-password-error" : undefined}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p id="reg-password-error" role="alert" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Ulangi password"
          error={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p id="confirm-error" role="alert" className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full rounded-xl"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Membuat akun...
          </>
        ) : (
          "Buat Akun Gratis"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href={ROUTES.login} className="font-medium text-brand-600 hover:underline">
          Masuk
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link href="/terms" className="hover:underline">
          Syarat Layanan
        </Link>{" "}
        dan{" "}
        <Link href="/privacy" className="hover:underline">
          Kebijakan Privasi
        </Link>{" "}
        kami.
      </p>
    </form>
  );
}
