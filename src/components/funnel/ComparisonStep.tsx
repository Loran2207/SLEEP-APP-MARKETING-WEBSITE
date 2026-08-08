"use client";

import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";
import { ReviewCard } from "./ReviewCard";

type ComparisonStepProps = {
  onContinue: () => void;
  onBack: () => void;
};

/** Five gridlines; only the anchor rows carry a label, like the reference. */
const TICKS = ["2h", "", "1h", "", "0"];
const CHART_HEIGHT = 130;
/** Hour-label column width plus its gap, so bars and captions center over the plot. */
const PLOT_INSET = "pl-[34px]";

/**
 * The before and after block, laid out like Rest AI's chart pair: two panels
 * of dashed gridlines with one bar each under a left-aligned headline, then
 * the reviews. The bars carry the one thing the app can honestly speak to,
 * the time spent awake in bed, and the footnote marks them as an
 * illustration rather than a measured result.
 */
export function ComparisonStep({ onContinue, onBack }: ComparisonStepProps) {
  const copy = funnelCopy.comparison;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <h1 className="mt-6 text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.titleBefore}
        <span className="text-blue">{copy.titleAccent}</span>
        {copy.titleAfter}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {copy.columns.map((column, index) => (
          <div key={column.label}>
            <p
              className={cn(
                "text-center text-[12px] font-medium",
                PLOT_INSET,
                index === 1 ? "text-blue" : "text-ink-2",
              )}
            >
              {column.label}
            </p>

            <div className="relative mt-3" style={{ height: CHART_HEIGHT }}>
              {TICKS.map((tick, tickIndex) => (
                <span
                  key={tickIndex}
                  className="absolute inset-x-0 flex -translate-y-1/2 items-center gap-1.5"
                  style={{ top: `${(tickIndex / (TICKS.length - 1)) * 100}%` }}
                >
                  <span className="w-[28px] shrink-0 text-right text-[10px] leading-none text-faint">
                    {tick}
                  </span>
                  <span className="flex-1 border-t border-dashed border-hair" />
                </span>
              ))}

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 flex justify-center",
                  PLOT_INSET,
                )}
              >
                {index === 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 w-[72px] rounded-t-[12px] bg-white/[0.05]"
                    style={{
                      height: `${Math.round(copy.columns[0].share * CHART_HEIGHT)}px`,
                    }}
                  />
                ) : null}
                <span
                  className="relative block w-[72px] rounded-t-[12px]"
                  style={{
                    height: `${Math.round(column.share * CHART_HEIGHT)}px`,
                    background:
                      index === 0
                        ? "linear-gradient(180deg,color-mix(in srgb,var(--color-violet) 40%,var(--color-abyss)),color-mix(in srgb,var(--color-violet) 16%,var(--color-abyss)))"
                        : "linear-gradient(180deg,var(--color-blue),color-mix(in srgb,var(--color-violet) 70%,var(--color-abyss)))",
                    boxShadow:
                      index === 0
                        ? undefined
                        : "0 0 26px color-mix(in srgb, var(--color-blue) 34%, transparent)",
                  }}
                />
              </div>
            </div>

            <p
              className={cn(
                "mt-2 text-center text-[11px] leading-none text-muted",
                PLOT_INSET,
              )}
            >
              {column.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {copy.reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}
