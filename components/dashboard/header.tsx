"use client";

import * as React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title?: string;
  userName?: string;
}

export function DashboardHeader({ title = "Dashboard", userName = "Pengguna" }: DashboardHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
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
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative"
          aria-label="Notifikasi"
        >
          <Bell size={16} aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
        </Button>

        {/* Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
