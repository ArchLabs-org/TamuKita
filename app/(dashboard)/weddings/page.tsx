import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Pernikahan",
  noIndex: true,
});

export default function WeddingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pernikahan</h2>
          <p className="text-muted-foreground mt-1">Kelola semua undangan pernikahan Anda</p>
        </div>
        <Button variant="brand" size="sm">
          <Plus size={16} aria-hidden="true" />
          Buat Undangan
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
          <Heart size={24} className="text-brand-500" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Belum ada undangan</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Buat undangan pernikahan pertama Anda sekarang.
        </p>
        <Button variant="brand" size="sm" className="mt-4">
          <Plus size={16} aria-hidden="true" />
          Buat Undangan Pertama
        </Button>
      </div>
    </div>
  );
}
