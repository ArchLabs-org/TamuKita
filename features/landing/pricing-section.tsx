"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/constants/plans";
import { formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export function PricingSection() {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");

  return (
    <Section id="pricing">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Harga Transparan
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-display-md font-bold tracking-tight"
        >
          Pilih Paket yang Tepat
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Mulai gratis, upgrade kapan saja.
        </motion.p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center rounded-full border border-border bg-muted p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              billing === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={billing === "monthly"}
          >
            Bulanan
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              billing === "annual"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={billing === "annual"}
          >
            Tahunan
            <Badge variant="brand" className="text-xs">Hemat 20%</Badge>
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={plan.isPopular ? "lg:-mt-4" : ""}
          >
            <Card
              variant={plan.isPopular ? "brand" : "default"}
              className={`relative h-full ${plan.isPopular ? "border-brand-400 shadow-brand-md" : ""}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="brand" className="shadow-sm">
                    ✦ Paling Populer
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  {plan.price.monthly === 0 ? (
                    <span className="text-3xl font-bold text-foreground">Gratis</span>
                  ) : plan.id === "enterprise" ? (
                    <span className="text-3xl font-bold text-foreground">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-foreground">
                        {formatCurrency(
                          billing === "annual" ? plan.price.annual : plan.price.monthly,
                        )}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">/bulan</span>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <Button
                  variant={plan.isPopular ? "brand" : "outline"}
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link
                    href={plan.id === "enterprise" ? "/contact" : ROUTES.register}
                  >
                    {plan.cta}
                  </Link>
                </Button>

                <ul className="space-y-2.5" role="list" aria-label={`Fitur paket ${plan.name}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
