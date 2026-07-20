import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";
import { APP_NAME, APP_SUPPORT_EMAIL } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

const footerLinks = {
  product: [
    { label: "Fitur", href: "/#features" },
    { label: "Template", href: ROUTES.templates },
    { label: "Harga", href: ROUTES.pricing },
    { label: "Demo", href: ROUTES.demo },
  ],
  company: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/careers" },
    { label: "Kontak", href: "/contact" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat Layanan", href: "/terms" },
    { label: "Cookie", href: "/cookies" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Platform undangan digital premium untuk hari spesial Anda.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${APP_SUPPORT_EMAIL}`}
                className="hover:text-foreground transition-colors"
              >
                {APP_SUPPORT_EMAIL}
              </a>
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Produk</h3>
            <ul className="mt-4 space-y-2" role="list">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Perusahaan</h3>
            <ul className="mt-4 space-y-2" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. Hak cipta dilindungi.
          </p>
          <p className="text-sm text-muted-foreground">
            Dibuat dengan ♥ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
