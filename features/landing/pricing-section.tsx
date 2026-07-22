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
          Harga yang <em className="text-gradient not-italic">jujur dan transparan</em>
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

        {/* One-time payment badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="shadow-xs mt-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 font-sans text-xs font-semibold text-brand-700"
        >
          <Sparkles size={13} className="text-amber-500" />
          <span>Bayar Sekali, Aktif Sampai Hari H (Tanpa Langganan Bulanan)</span>
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
                  <h3 className="font-sans text-base font-semibold text-foreground">{plan.name}</h3>
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
                        {formatCurrency(plan.price.monthly)}
                      </span>
                      <span className="mb-1 font-sans text-xs text-muted-foreground">/acara</span>
                    </>
                  )}
                </div>
                {plan.price.monthly > 0 && plan.id !== "enterprise" && (
                  <p className="mt-0.5 font-sans text-[10px] font-medium text-brand-600">
                    Sekali bayar per acara
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
                <ul
                  className="mt-5 space-y-2.5"
                  role="list"
                  aria-label={`Fitur paket ${plan.name}`}
                >
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
