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
    "bg-[linear-gradient(180deg,white_0%,var(--color-ink)_100%)] text-void shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.18),0_0_16px_rgba(255,255,255,0.12),0_0_30px_rgba(255,255,255,0.06)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.48),inset_0_-1px_0_rgba(0,0,0,0.16),0_0_22px_rgba(255,255,255,0.18),0_0_42px_rgba(255,255,255,0.10)] active:translate-y-px active:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-1px_0_rgba(0,0,0,0.22),0_0_10px_rgba(255,255,255,0.10),0_0_20px_rgba(255,255,255,0.05)]",
  secondary:
    "border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-ink hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.07)] active:bg-[rgba(255,255,255,0.05)]",
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
    "group relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,box-shadow,transform] duration-150 motion-reduce:transform-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-35%] left-0 w-[40%] -translate-x-[180%] -skew-x-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] blur-[5px] transition-transform duration-0 ease-[var(--ease-out-expo)] group-hover:translate-x-[420%] group-hover:duration-[600ms] motion-reduce:hidden"
      />
      <span className="relative z-10 inline-flex items-center justify-center">{children}</span>
    </>
  );

  if (href?.startsWith("/") || href?.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  if (href?.startsWith("http://") || href?.startsWith("https://")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
