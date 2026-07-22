"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Users,
  Palette,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const navItems = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Pernikahan", href: ROUTES.weddings, icon: Heart },
  { label: "Tamu", href: ROUTES.guests, icon: Users },
  { label: "Tema", href: ROUTES.themes, icon: Palette },
  { label: "Pengaturan", href: ROUTES.settings, icon: Settings },
];

interface DashboardSidebarProps {
  userName?: string;
  userEmail?: string;
}

export function DashboardSidebar({ userName = "Pengguna", userEmail = "" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  // Auto-collapse sidebar on mobile screens (< 768px) on initial mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className={cn(
        "border-sidebar-border bg-sidebar-background relative z-30 flex h-full shrink-0 flex-col border-r transition-all duration-300",
        collapsed ? "w-14 md:w-16" : "w-60",
      )}
      aria-label="Sidebar navigasi"
    >
      {/* Logo */}
      <div className={cn("border-sidebar-border flex h-14 items-center border-b px-4")}>
        {!collapsed && <Logo size="sm" variant="white" />}
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 py-4">
        <nav aria-label="Menu utama">
          <ul className="space-y-1 px-2" role="list">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={18} aria-hidden="true" className="shrink-0" />
                    {!collapsed && <span>{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      {/* User */}
      <div className="p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-2 py-2",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sidebar-foreground truncate text-sm font-medium">{userName}</p>
              <p className="text-sidebar-foreground/60 truncate text-xs">{userEmail}</p>
            </div>
          )}
          {!collapsed && (
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground rounded p-1 transition-colors"
                aria-label="Keluar"
              >
                <LogOut size={14} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={12} aria-hidden="true" />
        ) : (
          <ChevronLeft size={12} aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
