import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Demo",
  description: "Lihat demo interaktif platform TamuKita.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <div className="pt-14">
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Demo
          </p>
          <h1 className="mt-3 text-display-md font-bold tracking-tight">
            Lihat TamuKita Beraksi
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Eksplorasi fitur-fitur TamuKita secara interaktif.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-soft">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="mx-4 flex-1 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              tamukita.id/demo
            </div>
          </div>
          <div className="aspect-video bg-warm-50 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-5xl font-light text-brand-300 mb-4">✦</div>
              <p className="text-muted-foreground">Demo interaktif segera hadir</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
