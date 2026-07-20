import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Template",
  description: "Pilih dari puluhan template undangan pernikahan premium.",
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <div className="pt-14">
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Template
          </p>
          <h1 className="mt-3 text-display-md font-bold tracking-tight">
            Template Undangan Premium
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pilih dari koleksi template elegan yang dirancang oleh desainer profesional.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-warm-100 to-brand-50 flex items-center justify-center">
                <span className="font-display text-4xl text-brand-200">✦</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">Template {i + 1}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Minimalist Elegant</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
