import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "main";
  contained?: boolean;
  padded?: boolean;
}

export function Section({
  as: Tag = "section",
  className,
  children,
  contained = true,
  padded = true,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(padded && "py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </Tag>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({ className, size = "lg", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-2xl": size === "sm",
          "max-w-4xl": size === "md",
          "max-w-6xl": size === "lg",
          "max-w-7xl": size === "xl",
          "max-w-none": size === "full",
        },
        className,
      )}
      {...props}
    />
  );
}
