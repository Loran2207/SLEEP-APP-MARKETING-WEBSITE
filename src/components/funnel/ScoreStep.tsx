"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { funnelCopy, type FunnelHue } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";
import type { ScoreResult } from "./types";

const RADIUS = 82;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ringColor: Record<FunnelHue, string> = {
  blue: "text-blue",
  coral: "text-coral",
  mint: "text-mint",
  violet: "text-violet",
};

const pillColor: Record<FunnelHue, string> = {
  blue: "border-blue/40 bg-blue/[0.16] text-blue",
  coral: "border-coral/40 bg-coral/[0.16] text-coral",
  mint: "border-mint/40 bg-mint/[0.16] text-mint",
  violet: "border-violet/40 bg-violet/[0.16] text-violet",
};

function GaugeRing({ score, hue }: { score: number; hue: FunnelHue }) {
  const reduceMotion = useReducedMotion();
  const [eased, setEased] = useState(0);
  const shown = reduceMotion ? score : Math.round(score * eased);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const duration = 1100;
    let frame = 0;
    let start: number | undefined;

    function tick(now: number) {
      start ??= now;
      const elapsed = Math.min(1, (now - start) / duration);
      setEased(1 - Math.pow(1 - elapsed, 3));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div className={cn("relative size-[200px]", ringColor[hue])}>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="size-full -rotate-90"
      >
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth={STROKE}
        />
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - shown / 100)}
          style={{ filter: "drop-shadow(0 0 10px currentColor)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-[52px] leading-none font-medium tracking-[-0.03em] text-ink tabular-nums">
          {shown}
        </span>
        <span className="mt-1.5 text-[13px] text-ink-2">
          {funnelCopy.score.outOf}
        </span>
      </div>
    </div>
  );
}

type ScoreStepProps = {
  result: ScoreResult;
  onContinue: () => void;
};

export function ScoreStep({ result, onContinue }: ScoreStepProps) {
  const copy = funnelCopy.score;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="max-w-[300px] text-pretty text-[15px] leading-[1.5] text-ink-2">
          {copy.lead}
        </p>

        <div className="mt-8">
          <GaugeRing score={result.score} hue={result.band.hue} />
        </div>

        <span
          className={cn(
            "mt-8 rounded-full border px-3.5 py-1.5 text-[12px] font-medium",
            pillColor[result.band.hue],
          )}
        >
          {result.band.tag}
        </span>

        <h1 className="mt-5 max-w-[340px] text-balance text-[24px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
          {result.band.title}
        </h1>
        <p className="mt-3 max-w-[330px] text-pretty text-[15px] leading-[1.55] text-ink-2">
          {result.band.body}
        </p>
      </div>

      <div className="mt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}