import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { Palette } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Tema",
  noIndex: true,
});

export default function ThemesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Tema & Template</h2>
        <p className="text-muted-foreground mt-1">Pilih tema yang sesuai dengan pernikahan Anda</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-warm-100 to-brand-50 flex items-center justify-center">
              <Palette size={32} className="text-brand-200 group-hover:text-brand-400 transition-colors" aria-hidden="true" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground">Tema {i + 1}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Minimalist</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
