import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MedallionHue = "blue" | "coral" | "mint" | "violet";

type MedallionProps = {
  hue: MedallionHue;
  size?: number;
  children?: ReactNode;
  className?: string;
};

type MedallionStyle = CSSProperties & {
  "--medallion-disc": string;
  "--medallion-glow": string;
  "--medallion-ring": string;
};

const hueTokens: Record<MedallionHue, { accent: string; light: string }> = {
  blue: { accent: "var(--color-blue)", light: "var(--color-blue-soft)" },
  coral: { accent: "var(--color-coral)", light: "var(--color-coral-soft)" },
  mint: { accent: "var(--color-mint)", light: "var(--color-mint-soft)" },
  violet: { accent: "var(--color-violet)", light: "var(--color-violet-soft)" },
};

const DEFAULT_SIZE = 56;

export function Medallion({ hue, size = DEFAULT_SIZE, children, className }: MedallionProps) {
  const discSize = Number.isFinite(size) && size > 0 ? size : DEFAULT_SIZE;
  const { accent, light } = hueTokens[hue];
  const dimensions: MedallionStyle = {
    "--medallion-disc": `${discSize}px`,
    "--medallion-glow": `${Math.round(discSize * 2.1)}px`,
    "--medallion-ring": `${Math.round(discSize * 1.45)}px`,
  };
  const glowStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${accent} 24%, transparent) 0%, color-mix(in srgb, ${accent} 9%, transparent) 42%, transparent 72%)`,
  };
  const ringStyle: CSSProperties = {
    borderColor: `color-mix(in srgb, ${accent} 38%, transparent)`,
  };
  const discStyle: CSSProperties = {
    color: light,
    borderColor: `color-mix(in srgb, ${accent} 56%, transparent)`,
    backgroundImage: `radial-gradient(circle at 34% 28%, color-mix(in srgb, ${light} 34%, transparent) 0%, color-mix(in srgb, ${accent} 52%, transparent) 38%, color-mix(in srgb, ${accent} 16%, transparent) 100%)`,
    boxShadow: `inset 0 1px 0 color-mix(in srgb, ${light} 28%, transparent), inset 0 8px 24px color-mix(in srgb, ${accent} 20%, transparent)`,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative grid size-[var(--medallion-ring)] shrink-0 place-items-center",
        className,
      )}
      style={dimensions}
    >
      <span
        className="animate-breathe absolute size-[var(--medallion-glow)] rounded-full"
        style={glowStyle}
      />
      <span
        className="absolute size-[var(--medallion-ring)] rounded-full border border-dashed"
        style={ringStyle}
      />
      <span
        className="relative grid size-[var(--medallion-disc)] place-items-center rounded-full border"
        style={discStyle}
      >
        {children}
      </span>
    </div>
  );
}
