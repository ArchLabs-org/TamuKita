import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  external?: boolean;
}

export interface SidebarItem extends NavItem {
  children?: SidebarItem[];
  isActive?: boolean;
}
