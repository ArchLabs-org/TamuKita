"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const navLinks = [
  { label: "Fitur", href: "/#features" },
  { label: "Template", href: ROUTES.templates },
  { label: "Harga", href: ROUTES.pricing },
  { label: "Demo", href: ROUTES.demo },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        style={{ opacity: bgOpacity }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />

      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo size="md" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.login}>Masuk</Link>
          </Button>
          <Button variant="brand" size="sm" asChild>
            <Link href={ROUTES.register}>Mulai Gratis</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative border-b border-border bg-background px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href={ROUTES.login}>Masuk</Link>
            </Button>
            <Button variant="brand" size="sm" asChild className="w-full">
              <Link href={ROUTES.register}>Mulai Gratis</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
