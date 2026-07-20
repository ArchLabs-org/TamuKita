import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "dark";
  href?: string;
}

export function Logo({ className, size = "md", variant = "default", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const content = (
    <span
      className={cn(
        "font-display font-bold tracking-tight",
        sizeClasses[size],
        variant === "white" && "text-white",
        variant === "dark" && "text-foreground",
        variant === "default" && "text-gradient",
        className,
      )}
      aria-label="TamuKita"
    >
      Tamu
      <span
        className={cn(
          "font-light",
          variant === "default" && "text-brand-400",
          variant === "white" && "text-white/70",
          variant === "dark" && "text-muted-foreground",
        )}
      >
        Kita
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
