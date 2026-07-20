import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hue?: "blue" | "coral" | "mint" | "violet";
};

const hueClasses = {
  blue: "before:bg-[radial-gradient(circle_at_top_left,var(--color-blue),transparent_58%)] hover:border-blue/25",
  coral:
    "before:bg-[radial-gradient(circle_at_top_left,var(--color-coral),transparent_58%)] hover:border-coral/25",
  mint: "before:bg-[radial-gradient(circle_at_top_left,var(--color-mint),transparent_58%)] hover:border-mint/25",
  violet:
    "before:bg-[radial-gradient(circle_at_top_left,var(--color-violet),transparent_58%)] hover:border-violet/25",
} as const;

export function GlassCard({ children, className, hue }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rim relative isolate overflow-hidden rounded-card border border-hair p-6 transition-colors duration-150 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-[0.08] before:content-[''] md:p-7",
        hue && hueClasses[hue],
        className,
      )}
    >
      {children}
    </div>
  );
}
