import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { APP_SUPPORT_EMAIL } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "/#features" },
    { label: "Tema", href: ROUTES.templates },
    { label: "Harga", href: ROUTES.pricing },
    { label: "Demo", href: ROUTES.demo },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/careers" },
    { label: "Kontak", href: "/contact" },
  ],
  Legal: [
    { label: "Privasi", href: "/privacy" },
    { label: "Syarat Layanan", href: "/terms" },
    { label: "Cookie", href: "/cookies" },
  ],
};

export function MarketingFooter() {
  return (
    <footer
      className="border-t border-border bg-background"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Logo size="sm" />
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
              Website pernikahan yang terasa personal — untuk pasangan yang ingin
              hari istimewa mereka benar-benar bermakna.
            </p>
            <a
              href={`mailto:${APP_SUPPORT_EMAIL}`}
              className="mt-3 inline-block font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {APP_SUPPORT_EMAIL}
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                {group}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="font-sans text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} TamuKita. Dibuat dengan ♥ di Indonesia.
          </p>
          <div className="flex items-center gap-1">
            <div
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <p className="font-sans text-xs text-muted-foreground/60">
              Semua sistem berjalan normal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
