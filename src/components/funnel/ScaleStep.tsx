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

      <div className="flex flex-1 flex-col">
        <p className="mt-6 text-[13px] text-muted">{copy.lead}</p>

        <div className="mt-3">
          <span
            aria-hidden="true"
            className="block h-6 select-none text-[44px] leading-none text-faint"
          >
            &ldquo;
          </span>
          <h1 className="mt-1 text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
            {copy.statement}
          </h1>
          <span
            aria-hidden="true"
            className="block h-8 select-none text-right text-[44px] leading-none text-faint"
          >
            &rdquo;
          </span>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-2">
          {VALUES.map((option) => {
            const active = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                aria-pressed={active}
                className="grid aspect-square place-items-center rounded-[16px] border text-[17px] font-medium transition-colors duration-150 motion-reduce:transition-none"
                style={{
                  borderColor: active ? "var(--color-blue)" : "var(--color-hair)",
                  backgroundColor: active
                    ? "var(--color-blue)"
                    : "rgba(245,245,247,0.035)",
                  color: active ? "var(--color-void)" : "var(--color-ink-2)",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex justify-between text-[12px] text-muted">
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