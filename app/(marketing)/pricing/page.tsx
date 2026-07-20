import type { Metadata } from "next";
import { PricingSection } from "@/features/landing/pricing-section";
import { CtaSection } from "@/features/landing/cta-section";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Harga",
  description: "Pilih paket TamuKita yang sesuai kebutuhan pernikahan Anda.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="pt-14">
      <PricingSection />
      <CtaSection />
    </div>
  );
}
