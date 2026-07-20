import type { Metadata } from "next";
import Link from "next/link";
import { Eye, ArrowRight, Sparkles } from "lucide-react";
import { constructMetadata } from "@/lib/helpers/metadata";
import { Button } from "@/components/ui/button";
import { demoThemes } from "@/features/demo/data";

export const metadata: Metadata = constructMetadata({
  title: "Koleksi Tema & Template Undangan",
  noIndex: true,
});

export default function ThemesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Koleksi Tema Undangan</h2>
          <p className="mt-0.5 font-sans text-sm text-muted-foreground">
            Pilih tema estetis favorit yang paling sesuai dengan karakter pernikahan kalian.
          </p>
        </div>

        <Button variant="brand" size="sm" asChild className="gap-1.5 rounded-full text-xs">
          <Link href="/dashboard/create">
            <Sparkles size={14} /> Buat Undangan Baru
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoThemes.map((theme) => {
          return (
            <div
              key={theme.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Preview Cover Header */}
              <div
                className="relative flex aspect-[4/3] flex-col items-center justify-center p-6 text-center transition-all duration-500 group-hover:scale-[1.02]"
                style={{ background: theme.palette.bg }}
              >
                <p
                  className="font-sans text-[8px] uppercase tracking-[0.2em] opacity-60"
                  style={{ color: theme.palette.textMuted }}
                >
                  The Wedding of
                </p>
                <h3
                  className="mt-1 font-display text-2xl font-light"
                  style={{ color: theme.palette.accent }}
                >
                  {theme.couple.bride.split(" ")[0]} &amp; {theme.couple.groom.split(" ")[0]}
                </h3>
                <p
                  className="mt-2 font-sans text-[9px] opacity-70"
                  style={{ color: theme.palette.textMuted }}
                >
                  {theme.event.reception.date}
                </p>

                {/* Color Palette Pill */}
                <div className="backdrop-blur-xs absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-2.5 py-1">
                  <div
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ background: theme.palette.bg }}
                    title="Background Color"
                  />
                  <div
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ background: theme.palette.accent }}
                    title="Accent Color"
                  />
                  <div
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ background: theme.palette.card }}
                    title="Card Color"
                  />
                </div>
              </div>

              {/* Details & Actions */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-base font-bold text-foreground">
                      {theme.name}
                    </h4>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${theme.palette.accent}20`,
                        color: theme.palette.accent,
                      }}
                    >
                      {theme.style}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">{theme.tagline}</p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 gap-1.5 rounded-full text-xs"
                  >
                    <Link href={`/demo/${theme.id}`} target="_blank">
                      <Eye size={13} /> Live Demo
                    </Link>
                  </Button>

                  <Button
                    variant="brand"
                    size="sm"
                    asChild
                    className="flex-1 gap-1 rounded-full text-xs"
                  >
                    <Link href={`/dashboard/create?theme=${theme.id}`}>
                      Pilih <ArrowRight size={13} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
