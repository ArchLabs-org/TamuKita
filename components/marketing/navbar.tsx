"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const navLinks = [
  { label: "Fitur", href: "/#features" },
  { label: "Tema & Demo", href: ROUTES.demo },
  { label: "Harga", href: ROUTES.pricing },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  const scrolled = useTransform(scrollY, [0, 60], [0, 1]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scrolled background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: scrolled,
          background: "hsl(36 33% 97% / 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      />
      {/* Scrolled border */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: scrolled }}
      />

      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <Logo size="sm" />

        {/* Desktop links */}
        <ul className="hidden items-center lg:flex" role="list">
          {navLinks.map((link) => {
            const isActive =
              link.href === pathname || (link.href.startsWith("/#") && pathname === "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 font-sans text-sm transition-colors",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3.5 -bottom-px h-px bg-brand-600"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 rounded-full px-4 font-sans text-sm text-muted-foreground hover:text-foreground"
          >
            <Link href={ROUTES.login}>Masuk</Link>
          </Button>
          <Button
            variant="brand"
            size="sm"
            asChild
            className="h-8 rounded-full px-4 font-sans text-sm shadow-brand-sm"
          >
            <Link href={ROUTES.register}>Coba Gratis</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="px-4 pb-5 pt-2">
              <ul className="flex flex-col gap-0.5" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild className="rounded-full text-sm">
                  <Link href={ROUTES.login}>Masuk</Link>
                </Button>
                <Button variant="brand" size="sm" asChild className="rounded-full text-sm">
                  <Link href={ROUTES.register}>Coba Gratis</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
