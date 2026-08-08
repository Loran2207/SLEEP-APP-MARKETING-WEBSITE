"use client";

import { funnelCopy } from "@/data/funnel";

import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";

type ScaleStepProps = {
  value?: number;
  onSelect: (value: number) => void;
  onContinue: () => void;
  onBack: () => void;
};

const VALUES = [1, 2, 3, 4, 5];

/**
 * The agree-or-not question: a statement in quotes, then a one to five scale
 * anchored at both ends. Rest AI's habit block. The statement is a placeholder
 * until the client sends his list.
 */
export function ScaleStep({ value, onSelect, onContinue, onBack }: ScaleStepProps) {
  const copy = funnelCopy.habitScale;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome stepId="racing-mind" hue="blue" onBack={onBack} />

      <div className="flex flex-1 flex-col pt-9">
        <p className="text-[14px] text-ink-2">{copy.lead}</p>

        <div className="relative mt-4">
          <span
            aria-hidden="true"
            className="absolute -top-3 -left-1 font-serif text-[56px] leading-none text-white/12"
          >
            &ldquo;
          </span>
          <h1 className="relative px-6 text-[24px] leading-[1.3] font-medium tracking-[-0.02em] text-ink">
            {copy.statement}
          </h1>
          <span
            aria-hidden="true"
            className="absolute -bottom-8 right-0 font-serif text-[56px] leading-none text-white/12"
          >
            &rdquo;
          </span>
        </div>

        <div className="mt-14 grid grid-cols-5 gap-2.5">
          {VALUES.map((option) => {
            const active = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                aria-pressed={active}
                className="grid h-[68px] place-items-center rounded-[18px] border text-[20px] font-medium transition-colors duration-150 motion-reduce:transition-none"
                style={{
                  borderColor: active
                    ? "color-mix(in srgb, var(--color-blue) 66%, transparent)"
                    : "var(--color-hair)",
                  backgroundColor: active
                    ? "color-mix(in srgb, var(--color-blue) 22%, transparent)"
                    : "rgba(245,245,247,0.035)",
                  color: active ? "var(--color-ink)" : "var(--color-ink-2)",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex justify-between text-[13px] text-muted">
          <span>{copy.low}</span>
          <span>{copy.high}</span>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue} disabled={value === undefined}>
          {copy.primary}
        </PrimaryAction>
      </div>
    </section>
  );
}