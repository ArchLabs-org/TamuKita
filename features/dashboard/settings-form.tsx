"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { updateProfileName } from "@/lib/auth/profile-actions";
import type { PlanType } from "@/types/auth";

interface SettingsFormProps {
  userId: string;
  email: string;
  fullName: string;
  plan: PlanType;
}

export function SettingsForm({ userId, email, fullName, plan }: SettingsFormProps) {
  const router = useRouter();
  const [name, setName] = React.useState(fullName);
  const [saving, setSaving] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const result = await updateProfileName(userId, name);

      if ("error" in result && result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Profil berhasil disimpan." });
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan. Silakan coba lagi." });
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  const planLabel: Record<PlanType, string> = {
    free: "Gratis",
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Profil</CardTitle>
          <CardDescription>Informasi dasar akun kalian</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            {message && (
              <div
                role="alert"
                className={`rounded-lg border px-4 py-3 font-sans text-sm ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="full-name">Nama Lengkap</Label>
              <Input
                id="full-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                autoComplete="name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email-display">Email</Label>
              <Input
                id="email-display"
                type="email"
                value={email}
                disabled
                aria-readonly="true"
                className="cursor-not-allowed opacity-60"
              />
              <p className="font-sans text-xs text-muted-foreground">
                Email tidak dapat diubah melalui halaman ini.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-sans text-sm font-medium text-foreground">
                  Paket saat ini
                </p>
                <Badge variant={plan === "free" ? "secondary" : "brand"}>
                  {planLabel[plan]}
                </Badge>
              </div>
              {plan === "free" && (
                <Button variant="brand-outline" size="sm" className="rounded-full text-xs">
                  Upgrade Paket
                </Button>
              )}
            </div>

            <Button
              type="submit"
              variant="brand"
              size="sm"
              disabled={saving}
              aria-busy={saving}
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Sign out */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Sesi</CardTitle>
          <CardDescription>Kelola sesi login kalian</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-busy={signingOut}
            className="gap-2"
          >
            {signingOut ? (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            ) : (
              <LogOut size={14} aria-hidden="true" />
            )}
            Keluar dari Akun
          </Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="font-display text-lg text-destructive">
            Zona Bahaya
          </CardTitle>
          <CardDescription>Tindakan ini tidak dapat dibatalkan</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm" disabled>
            Hapus Akun
          </Button>
          <p className="mt-2 font-sans text-xs text-muted-foreground">
            Fitur ini akan segera tersedia. Hubungi support untuk menghapus akun.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
