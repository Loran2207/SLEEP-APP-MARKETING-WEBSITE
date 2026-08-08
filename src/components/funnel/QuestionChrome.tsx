"use client";

import { ArrowLeft, Check, Moon, Target, UserRound } from "lucide-react";

import type { FunnelHue, FunnelStepId } from "@/data/funnel";
import { funnelCopy } from "@/data/funnel";

import { funnelSections, getSectionProgress } from "./sections";

const hueColors: Record<FunnelHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

const sectionIcons = {
  person: UserRound,
  moon: Moon,
  target: Target,
} as const;

type QuestionChromeProps = {
  stepId: FunnelStepId;
  hue: FunnelHue;
  onBack: () => void;
};

/** The wordmark, so the visitor always knows whose flow this is. */
export function BrandPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/[0.045] px-3.5 py-1.5">
      <span
        aria-hidden="true"
        className="relative size-[14px] overflow-hidden rounded-full"
        style={{ background: "linear-gradient(140deg,#ffffff,#cbd9f2)" }}
      >
        <span
          className="absolute rounded-full bg-void"
          style={{ width: 11, height: 11, left: 5, top: -2 }}
        />
      </span>
      <span className="text-[12px] font-medium tracking-[0.01em] text-ink">SLEEP</span>
      <span className="text-[12px] text-muted">Sleep coach</span>
    </span>
  );
}

/**
 * The dotted bar, one dot per question, split into the three parts of the app's
 * onboarding with a check where a part is finished. Rest AI's pattern: you can
 * see how far the whole thing runs, not only the bar you are inside.
 */
function SegmentedProgress({
  stepId,
  hue,
}: {
  stepId: FunnelStepId;
  hue: FunnelHue;
}) {
  const progress = getSectionProgress(stepId);
  const activeIndex = progress ? progress.sectionIndex : 0;
  const accent = hueColors[hue];

  return (
    <div className="flex items-center gap-2">
      {funnelSections.map((section, index) => {
        const isPast = index < activeIndex;
        const isActive = index === activeIndex;
        const share = isPast ? 1 : isActive ? progress!.position / section.steps.length : 0;
        // A constant dot pitch across the whole bar, the way Rest AI draws it:
        // the segments differ in length because the parts differ in length.
        const dots = Math.max(4, Math.round(section.steps.length * 2.6));
        const lit = Math.round(dots * share);

        return (
          <div
            key={section.id}
            className="flex items-center gap-2"
            style={{ flex: section.steps.length }}
          >
            <div className="flex flex-1 items-center justify-between">
              {Array.from({ length: dots }, (_, dot) => (
                <span
                  key={dot}
                  className="block size-[3.5px] rounded-full"
                  style={{
                    backgroundColor: dot < lit ? accent : "rgba(245,245,247,0.16)",
                  }}
                />
              ))}
            </div>
            <Check
              aria-hidden="true"
              size={12}
              strokeWidth={2.6}
              className="shrink-0"
              style={{ color: isPast ? accent : "rgba(245,245,247,0.2)" }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function QuestionChrome({ stepId, hue, onBack }: QuestionChromeProps) {
  const progress = getSectionProgress(stepId);
  const section = progress?.section ?? funnelSections[0];
  const SectionIcon = sectionIcons[section.icon];
  const accent = hueColors[hue];

  return (
    <header className="pt-[max(10px,env(safe-area-inset-top))]">
      <div className="relative flex h-10 items-center justify-center">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="absolute top-1/2 left-0 grid size-10 -translate-y-1/2 place-items-center text-muted transition-colors duration-150 hover:text-ink active:text-ink motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.7} />
        </button>
        <BrandPill />
      </div>

      <div
        role="progressbar"
        aria-label={`${section.title}, step ${progress?.position ?? 1} of ${section.steps.length}`}
        aria-valuemin={1}
        aria-valuemax={section.steps.length}
        aria-valuenow={progress?.position ?? 1}
        className="mt-4"
      >
        <SegmentedProgress stepId={stepId} hue={hue} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-[12px] border"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 46%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
            color: accent,
          }}
        >
          <SectionIcon size={18} strokeWidth={1.7} />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-medium tracking-[-0.01em] text-ink">
            {section.title}
          </span>
          <span className="block text-[12px] leading-[1.4] text-muted">
            {section.body}
          </span>
        </span>
      </div>
    </header>
  );
}