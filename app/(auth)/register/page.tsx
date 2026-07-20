import type { Metadata } from "next";
import { RegisterForm } from "@/features/authentication/register-form";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Daftar",
  noIndex: true,
  path: "/register",
});

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Buat akun gratis</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mulai kelola undangan pernikahan Anda hari ini
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
