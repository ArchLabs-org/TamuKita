import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = constructMetadata({
  title: "Pengaturan",
  noIndex: true,
});

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Pengaturan</h2>
        <p className="text-muted-foreground mt-1">Kelola profil dan preferensi akun Anda</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>Informasi dasar akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="settings-name">Nama Lengkap</Label>
              <Input id="settings-name" placeholder="Nama lengkap" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-email">Email</Label>
              <Input id="settings-email" type="email" placeholder="email@contoh.com" disabled />
              <p className="text-xs text-muted-foreground">Email tidak dapat diubah</p>
            </div>
            <Button variant="brand" size="sm">Simpan Perubahan</Button>
          </CardContent>
        </Card>

        <Separator />

        <Card variant="outlined" className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Zona Bahaya</CardTitle>
            <CardDescription>Tindakan ini tidak dapat dibatalkan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm">Hapus Akun</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
