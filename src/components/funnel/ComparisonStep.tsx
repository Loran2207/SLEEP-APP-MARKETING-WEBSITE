"use client";

import { ArrowLeft } from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { PrimaryAction } from "./PrimaryAction";
import { ReviewCard } from "./ReviewCard";

type ComparisonStepProps = {
  onContinue: () => void;
  onBack: () => void;
};

const TICKS = ["2h", "1h 30m", "1h", "30m", "0"];

/** The same pair as the paywall's now/after block, so the story stays one person. */
const PHOTOS = [
  { src: "/funnel/paywall/now.webp", hue: "var(--color-ink-2)" },
  { src: "/funnel/paywall/after.webp", hue: "var(--color-blue)" },
] as const;

/**
 * The before and after block, laid out like Rest AI's: the same person before
 * and after over two columns of bars, under one headline, then the reviews.
 *
 * The bars carry the one thing the app can honestly speak to, the time spent
 * awake in bed, and both numbers are marked as an illustration rather than a
 * measured result.
 */
export function ComparisonStep({ onContinue, onBack }: ComparisonStepProps) {
  const copy = funnelCopy.comparison;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="flex items-center pt-[max(14px,env(safe-area-inset-top))]">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="grid size-10 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.7} />
        </button>
      </div>

      <h1 className="mt-6 text-[27px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.title}
      </h1>

      <div className="mt-9 grid grid-cols-2 gap-5">
        {copy.columns.map((column, index) => (
          <div key={column.label}>
            <div className="relative overflow-hidden rounded-card border border-hair">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[index].src}
                alt=""
                className="aspect-[3/4] w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,#000000)]"
              />
              <span
                className="absolute left-1/2 top-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] font-medium"
                style={{
                  color: PHOTOS[index].hue,
                  borderColor: `color-mix(in srgb, ${PHOTOS[index].hue} 40%, transparent)`,
                  backgroundColor: "rgba(0,0,0,0.72)",
                }}
              >
                {column.label}
              </span>
            </div>
            <div className="relative mt-4 h-[190px]">
              {TICKS.map((tick, tickIndex) => (
                <span
                  key={tick}
                  className="absolute inset-x-0 flex items-center gap-2"
                  style={{ top: `${(tickIndex / (TICKS.length - 1)) * 100}%` }}
                >
                  <span className="w-[42px] shrink-0 text-right text-[10px] text-faint">
                    {tick}
                  </span>
                  <span className="h-px flex-1 bg-white/8" />
                </span>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex justify-center pl-[42px]">
                <span
                  className="block w-[64px] rounded-t-[12px]"
                  style={{
                    height: `${column.share * 190}px`,
                    background:
                      index === 0
                        ? "linear-gradient(180deg,#4d3a63,#2a2036)"
                        : "linear-gradient(180deg,var(--color-blue),color-mix(in srgb,var(--color-violet) 70%,#05060a))",
                    boxShadow:
                      index === 0
                        ? undefined
                        : "0 0 26px color-mix(in srgb, var(--color-blue) 34%, transparent)",
                  }}
                />
              </div>
            </div>
            <p className="mt-2 text-center text-[12px] text-muted">{column.caption}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-faint">{copy.footnote}</p>

      <div className="mt-8 flex flex-col gap-3">
        {copy.reviews.map((review) => (
          <ReviewCard key={review.title} review={review} />
        ))}
      </div>

      <div className="mt-auto pt-10">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}