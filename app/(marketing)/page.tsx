import type { Metadata } from "next";
import { HeroSection } from "@/features/landing/hero-section";
import { BrandLogosSection } from "@/features/landing/brand-logos-section";
import { FeaturesSection } from "@/features/landing/features-section";
import { TemplatePreviewSection } from "@/features/landing/template-preview-section";
import { HowItWorksSection } from "@/features/landing/how-it-works-section";
import { DashboardPreviewSection } from "@/features/landing/dashboard-preview-section";
import { WhyDigitalSection } from "@/features/landing/why-digital-section";
import { PricingSection } from "@/features/landing/pricing-section";
import { TestimonialsSection } from "@/features/landing/testimonials-section";
import { FaqSection } from "@/features/landing/faq-section";
import { CtaSection } from "@/features/landing/cta-section";
import { constructMetadata } from "@/lib/helpers/metadata";

export const metadata: Metadata = constructMetadata();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandLogosSection />
      <FeaturesSection />
      <TemplatePreviewSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <WhyDigitalSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
