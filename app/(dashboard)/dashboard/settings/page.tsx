import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getProfileById } from "@/lib/db/profiles";
import { SettingsForm } from "@/features/dashboard/settings-form";

export const metadata: Metadata = constructMetadata({
  title: "Pengaturan Akun",
  noIndex: true,
});

export default async function SettingsPage() {
  const user = await requireAuth();
  const profile = await getProfileById(user.id);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">Pengaturan Akun</h2>
        <p className="mt-0.5 font-sans text-sm text-muted-foreground">
          Kelola profil pengguna dan konfigurasi akun kalian
        </p>
      </div>

      <SettingsForm
        userId={user.id}
        email={user.email ?? ""}
        fullName={profile?.full_name ?? ""}
        plan={profile?.plan ?? "free"}
      />
    </div>
  );
}
