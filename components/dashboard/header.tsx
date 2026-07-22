"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Search, Settings, Heart, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";

interface DashboardHeaderProps {
  title?: string;
  userName?: string;
  userEmail?: string;
}

export function DashboardHeader({
  title = "Dashboard",
  userName = "Pengguna",
  userEmail = "",
}: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="z-20 flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-foreground sm:text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Cari..."
            className="h-8 w-48 pl-8 text-sm lg:w-64"
            aria-label="Cari"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifikasi">
          <Bell size={16} aria-hidden="true" />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-500"
            aria-hidden="true"
          />
        </Button>

        {/* Avatar Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 rounded-full p-1 transition-all hover:bg-muted focus:outline-none"
            aria-expanded={dropdownOpen}
            aria-label="Menu profil pengguna"
          >
            <Avatar className="h-8 w-8 ring-2 ring-brand-500/20">
              <AvatarFallback className="bg-brand-100 text-xs font-bold text-brand-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              size={13}
              className="text-muted-foreground transition-transform duration-200"
            />
          </button>

          {/* Dropdown Menu Popover */}
          {dropdownOpen && (
            <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl backdrop-blur-xl animate-in fade-in-50 zoom-in-95">
              {/* User Info Header */}
              <div className="border-b border-border/60 px-3 py-2">
                <p className="truncate font-sans text-xs font-bold text-foreground">{userName}</p>
                {userEmail && (
                  <p className="mt-0.5 truncate font-sans text-[11px] text-muted-foreground">
                    {userEmail}
                  </p>
                )}
              </div>

              {/* Menu Options */}
              <div className="py-1">
                <Link
                  href={ROUTES.weddings}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-sans text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Heart size={14} className="text-brand-500" />
                  <span>Pernikahan Saya</span>
                </Link>

                <Link
                  href={ROUTES.settings}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-sans text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Settings size={14} className="text-muted-foreground" />
                  <span>Pengaturan Akun</span>
                </Link>
              </div>

              <div className="border-t border-border/60 pt-1">
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-sans text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={14} />
                    <span>Keluar (Logout)</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
