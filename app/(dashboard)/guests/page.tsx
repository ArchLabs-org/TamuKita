import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { Users } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Tamu",
  noIndex: true,
});

export default function GuestsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manajemen Tamu</h2>
        <p className="text-muted-foreground mt-1">Kelola seluruh daftar tamu pernikahan Anda</p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
          <Users size={24} className="text-brand-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Belum ada tamu</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Tambahkan tamu setelah membuat undangan pernikahan.
        </p>
      </div>
    </div>
  );
}
