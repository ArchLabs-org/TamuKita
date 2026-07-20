"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/constants/plans";
import { formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");

  return (
    <Section id="pricing" className="bg-background">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
        >
          Harga
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-display-md font-light tracking-tight"
        >
          Harga yang{" "}
          <em className="not-italic text-gradient">jujur dan transparan</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-4 font-sans text-base leading-relaxed text-muted-foreground"
        >
          Mulai gratis, bayar hanya ketika kalian butuh lebih.
        </motion.p>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="mt-7 inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 p-1"
        >
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-all duration-200",
              billing === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={billing === "monthly"}
          >
            Bulanan
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-all duration-200",
              billing === "annual"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={billing === "annual"}
          >
            Tahunan
            <span className="rounded-full bg-brand-100 px-1.5 py-0.5 font-sans text-[9px] font-semibold text-brand-700">
              -20%
            </span>
          </button>
        </motion.div>
      </div>

      {/* Pricing cards */}
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan, i) => {
          const isPro = plan.isPopular;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className={cn(isPro && "lg:-mt-3 lg:mb-3")}
            >
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 transition-shadow",
                  isPro
                    ? "border-brand-300 bg-brand-50 shadow-brand-md"
                    : "border-border bg-card hover:shadow-soft",
                )}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 shadow-sm">
                      <Sparkles size={9} className="text-white" aria-hidden="true" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-white">
                        Paling Populer
                      </span>
                    </div>
                  </div>
                )}

                {/* Plan name & desc */}
                <div className={isPro ? "pt-3" : ""}>
                  <h3 className="font-sans text-base font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end gap-1">
                  {plan.price.monthly === 0 ? (
                    <span className="font-display text-3xl font-semibold text-foreground">
                      Gratis
                    </span>
                  ) : plan.id === "enterprise" ? (
                    <span className="font-display text-2xl font-semibold text-foreground">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-semibold text-foreground">
                        {formatCurrency(
                          billing === "annual" ? plan.price.annual : plan.price.monthly,
                        )}
                      </span>
                      <span className="mb-1 font-sans text-xs text-muted-foreground">/bln</span>
                    </>
                  )}
                </div>
                {plan.price.monthly > 0 && plan.id !== "enterprise" && (
                  <p className="mt-0.5 font-sans text-[10px] text-muted-foreground">
                    {billing === "annual"
                      ? `Hemat ${formatCurrency((plan.price.monthly - plan.price.annual) * 12)}/tahun`
                      : "Ditagih setiap bulan"}
                  </p>
                )}

                {/* Divider */}
                <div className="my-5 h-px bg-border" />

                {/* CTA */}
                <Button
                  variant={isPro ? "brand" : plan.id === "enterprise" ? "brand-outline" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full rounded-full text-sm",
                    !isPro && plan.id !== "enterprise" && "font-medium",
                  )}
                  asChild
                >
                  <Link href={plan.id === "enterprise" ? "/contact" : ROUTES.register}>
                    {plan.cta}
                  </Link>
                </Button>

                {/* Features */}
                <ul className="mt-5 space-y-2.5" role="list" aria-label={`Fitur paket ${plan.name}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <div
                        className={cn(
                          "mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full",
                          isPro ? "bg-brand-600" : "bg-muted",
                        )}
                        aria-hidden="true"
                      >
                        <Check
                          size={8}
                          strokeWidth={2.5}
                          className={isPro ? "text-white" : "text-muted-foreground"}
                        />
                      </div>
                      <span className="font-sans text-xs leading-relaxed text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
