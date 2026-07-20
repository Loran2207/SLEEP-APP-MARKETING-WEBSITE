import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type AuroraHue = "blue" | "coral" | "mint" | "violet";

type AuroraProps = {
  hues?: AuroraHue[];
  className?: string;
  intensity?: "soft" | "normal";
};

const DEFAULT_HUES: AuroraHue[] = ["blue", "violet", "coral"];

const hueTokens: Record<AuroraHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

const orbPlacements = [
  {
    className: "top-[-12%] left-[-8%] size-[34rem]",
    delay: "-1.8s",
    duration: "13s",
  },
  {
    className: "top-[18%] right-[-12%] size-[31rem]",
    delay: "-5.2s",
    duration: "16s",
  },
  {
    className: "bottom-[-20%] left-[34%] size-[28rem]",
    delay: "-8.6s",
    duration: "18s",
  },
] as const;

const opacityByIntensity = {
  soft: [0.1, 0.12, 0.1],
  normal: [0.18, 0.22, 0.16],
} as const;

export function Aurora({ hues = DEFAULT_HUES, className, intensity = "normal" }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {hues.slice(0, 3).map((hue, index) => {
        const placement = orbPlacements[index];
        const style: CSSProperties = {
          opacity: opacityByIntensity[intensity][index],
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${hueTokens[hue]} 92%, transparent) 0%, color-mix(in srgb, ${hueTokens[hue]} 48%, transparent) 38%, transparent 72%)`,
          animationDelay: placement.delay,
          animationDuration: placement.duration,
        };

        return (
          <span
            key={`${hue}-${index}`}
            className={cn(
              "animate-drift absolute rounded-full blur-[120px] will-change-transform",
              placement.className,
            )}
            style={style}
          />
        );
      })}
    </div>
  );
}
