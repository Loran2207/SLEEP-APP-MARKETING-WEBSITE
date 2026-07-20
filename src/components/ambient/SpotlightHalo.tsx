import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type SpotlightHue = "blue" | "coral" | "mint" | "violet" | "white";

type SpotlightHaloProps = {
  hue?: SpotlightHue;
  className?: string;
};

const hueTokens: Record<SpotlightHue, { accent: string; cast: string }> = {
  blue: { accent: "var(--color-blue)", cast: "var(--color-blue-soft)" },
  coral: { accent: "var(--color-coral)", cast: "var(--color-coral-soft)" },
  mint: { accent: "var(--color-mint)", cast: "var(--color-mint-soft)" },
  violet: { accent: "var(--color-violet)", cast: "var(--color-violet-soft)" },
  white: { accent: "var(--color-ink)", cast: "var(--color-blue)" },
};

export function SpotlightHalo({ hue = "white", className }: SpotlightHaloProps) {
  const { accent, cast } = hueTokens[hue];
  const mask =
    "radial-gradient(ellipse 72% 96% at 50% 0%, black 0%, rgb(0 0 0 / 0.88) 38%, transparent 84%)";
  const conicStyle: CSSProperties = {
    backgroundImage: `conic-gradient(from 150deg at 50% -10%, transparent 0deg, color-mix(in srgb, ${cast} 7%, transparent) 12deg, color-mix(in srgb, ${accent} 17%, transparent) 30deg, color-mix(in srgb, ${cast} 7%, transparent) 48deg, transparent 60deg)`,
  };
  const glowStyle: CSSProperties = {
    backgroundImage: `radial-gradient(ellipse at center, color-mix(in srgb, ${accent} 16%, transparent) 0%, color-mix(in srgb, ${cast} 8%, transparent) 42%, transparent 74%)`,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-1/2 h-[440px] w-[min(1200px,120vw)] -translate-x-1/2 overflow-hidden",
        className,
      )}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="absolute inset-0 blur-[48px]" style={conicStyle} />
      <div
        className="absolute -top-20 left-1/2 h-[320px] w-[70%] -translate-x-1/2 blur-[64px]"
        style={glowStyle}
      />
    </div>
  );
}
