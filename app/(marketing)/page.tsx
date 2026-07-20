import { HeroSection } from "@/features/landing/hero-section";
import { FeaturesSection } from "@/features/landing/features-section";
import { TestimonialsSection } from "@/features/landing/testimonials-section";
import { PricingSection } from "@/features/landing/pricing-section";
import { CtaSection } from "@/features/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
