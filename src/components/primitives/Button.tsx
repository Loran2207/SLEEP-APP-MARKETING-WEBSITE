import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const variantClasses = {
  primary:
    "bg-ink text-void shadow-[0_0_18px_var(--color-hair-strong)] hover:-translate-y-px hover:shadow-[0_0_28px_var(--color-hair-strong)] active:translate-y-0",
  secondary:
    "border border-hair-strong bg-transparent text-ink hover:border-ink/35 hover:bg-ink/[0.04]",
} as const;

const sizeClasses = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-[16px]",
} as const;

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
  type,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,box-shadow,transform] duration-150",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href?.startsWith("/") || href?.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("http://") || href?.startsWith("https://")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
