"use client";

import { Check } from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { PrimaryAction } from "./PrimaryAction";
import type { ScoreResult } from "./types";

type AnalysisStepProps = {
  result: ScoreResult;
  onContinue: () => void;
};

const cardTint: Record<string, string> = {
  blue: "border-blue/30 bg-blue/[0.08]",
  coral: "border-coral/30 bg-coral/[0.08]",
  mint: "border-mint/30 bg-mint/[0.08]",
  violet: "border-violet/30 bg-violet/[0.08]",
};

/** The projection the app draws: where the nights sit now, where they can get to. */
function ProjectionChart() {
  const copy = funnelCopy.analysis;

  return (
    <div className="mt-5">
      <svg
        aria-hidden="true"
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
        className="block h-[150px] w-full"
      >
        <defs>
          <linearGradient id="analysis-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f2724b" />
            <stop offset="0.5" stopColor="#f2b84b" />
            <stop offset="1" stopColor="#34c77b" />
          </linearGradient>
          <linearGradient id="analysis-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(93 221 179 / 0.18)" />
            <stop offset="1" stopColor="rgb(93 221 179 / 0)" />
          </linearGradient>
        </defs>
        <line
          x1="20"
          y1="120"
          x2="288"
          y2="120"
          stroke="rgb(255 255 255 / 0.1)"
          strokeWidth="1"
        />
        <path
          d="M20 112 C90 108 120 86 158 74 S250 36 288 24 L288 120 L20 120 Z"
          fill="url(#analysis-fill)"
        />
        <path
          d="M20 112 C90 108 120 86 158 74 S250 36 288 24"
          fill="none"
          stroke="url(#analysis-line)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="112" r="4" fill="#f2724b" />
        <circle
          cx="288"
          cy="24"
          r="6"
          fill="#34c77b"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
      </svg>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] font-medium text-ink-2">
          {copy.chartFrom}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-mint">
          {copy.chartTo}
          <Check aria-hidden="true" size={12} strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}

export function AnalysisStep({ result, onContinue }: AnalysisStepProps) {
  const copy = funnelCopy.analysis;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(30px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mt-6 max-w-[360px]"
      />

      <p
        className={`mt-6 rounded-card border px-4 py-4 text-pretty text-[14px] leading-[1.55] text-ink ${cardTint[result.band.hue]}`}
      >
        {copy.reassurance}
      </p>

      <div className="rim mt-4 rounded-card border border-hair bg-surface/72 p-5">
        <p className="text-[40px] leading-none font-medium tracking-[-0.03em] text-ink">
          {copy.statHeadline}
        </p>
        <p className="mt-2.5 text-pretty text-[14px] leading-[1.5] text-ink-2">
          {copy.statBody}
        </p>

        <ProjectionChart />

        <p className="mt-3 text-[11px] leading-[1.45] text-muted">
          {copy.footnote}
        </p>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}