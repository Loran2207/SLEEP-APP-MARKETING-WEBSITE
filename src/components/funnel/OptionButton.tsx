"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import type { FunnelHue } from "@/data/funnel";
import { cn } from "@/lib/utils";

type OptionButtonProps = {
  label: string;
  emoji?: string;
  description?: string;
  expand?: string;
  selected: boolean;
  hue: FunnelHue;
  onClick: () => void;
  selectionStyle?: "solid" | "tint";
};

const hueColors: Record<FunnelHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

export function OptionButton({
  label,
  emoji,
  description,
  expand,
  selected,
  hue,
  onClick,
  selectionStyle = "solid",
}: OptionButtonProps) {
  const tintedSelection = selected && selectionStyle === "tint";

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.12 }}
      className={cn(
        "rim flex min-h-15 w-full items-start justify-between gap-4 rounded-card border px-5 py-4 text-left text-[16px] leading-[1.35] transition-[background-color,border-color,color] duration-150 motion-reduce:transform-none motion-reduce:transition-none",
        selected && selectionStyle === "solid"
          ? "border-white bg-ink text-void"
          : "border-hair bg-surface/86 text-ink hover:border-hair-strong hover:bg-surface-2/82",
      )}
      style={
        tintedSelection
          ? {
              color: "var(--color-ink)",
              borderColor: `color-mix(in srgb, ${hueColors[hue]} 38%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${hueColors[hue]} 12%, var(--color-surface))`,
            }
          : undefined
      }
    >
      <span className="flex min-w-0 items-start gap-3">
        {emoji ? (
          <span
            aria-hidden="true"
            className="shrink-0 text-[20px] leading-[1.2]"
          >
            {emoji}
          </span>
        ) : null}
        <span className="min-w-0">
          <span className="block">{label}</span>
          {description ? (
            <span
              className={cn(
                "mt-1.5 block text-[13px] leading-[1.5]",
                selected && selectionStyle === "solid"
                  ? "text-void/72"
                  : "text-ink-2",
              )}
            >
              {description}
            </span>
          ) : null}
          {selected && expand ? (
            <span className="mt-2.5 block text-pretty text-[13px] leading-[1.55] text-ink-2">
              {expand}
            </span>
          ) : null}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-px grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-150",
          selected && selectionStyle === "solid"
            ? "border-void/16 bg-void text-ink"
            : "border-hair-strong text-transparent",
        )}
        style={
          tintedSelection
            ? {
                color: hueColors[hue],
                borderColor: `color-mix(in srgb, ${hueColors[hue]} 46%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${hueColors[hue]} 16%, transparent)`,
              }
            : undefined
        }
      >
        <Check size={14} strokeWidth={2.2} />
      </span>
    </motion.button>
  );
}