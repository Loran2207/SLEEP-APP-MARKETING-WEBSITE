"use client";

import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { FunnelHue } from "@/data/funnel";
import { funnelCopy } from "@/data/funnel";

type QuestionChromeProps = {
  current: number;
  total: number;
  ratio: number;
  hue: FunnelHue;
  onBack: () => void;
};

const hueColors: Record<FunnelHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

export function QuestionChrome({
  current,
  total,
  ratio,
  hue,
  onBack,
}: QuestionChromeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <header className="flex items-center gap-4 pt-[max(18px,env(safe-area-inset-top))]">
      <button
        type="button"
        aria-label={funnelCopy.actions.back}
        onClick={onBack}
        className="grid size-11 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink active:text-ink motion-reduce:transition-none"
      >
        <ArrowLeft aria-hidden="true" size={21} strokeWidth={1.6} />
      </button>

      <div
        role="progressbar"
        aria-label={`Question ${current} of ${total}`}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        className="h-1 flex-1 overflow-hidden rounded-full bg-white/8"
      >
        <motion.span
          className="block h-full origin-left rounded-full"
          initial={reduceMotion ? { scaleX: ratio } : { scaleX: 0 }}
          animate={{ scaleX: ratio }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
          }
          style={{
            backgroundColor: hueColors[hue],
            boxShadow: `0 0 14px color-mix(in srgb, ${hueColors[hue]} 54%, transparent)`,
          }}
        />
      </div>

      <span aria-hidden="true" className="size-11 shrink-0" />
    </header>
  );
}
