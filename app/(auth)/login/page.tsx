import type { Metadata } from "next";
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Selamat datang kembali</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Masuk ke akun TamuKita Anda
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
