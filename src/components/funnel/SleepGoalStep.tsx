"use client";

import { funnelCopy, type QuestionDefinition } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";
import { DEFAULT_SLEEP_GOAL_HOURS } from "./time";

const RECOMMENDED = [7, 8, 9] as const;

type SleepGoalStepProps = {
  question: QuestionDefinition;
  selected?: string;
  onSelect: (option: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function SleepGoalStep({
  question,
  selected,
  onSelect,
  onContinue,
  onBack,
}: SleepGoalStepProps) {
  const hours = question.options.map((option) => Number(option.label));
  const current = Number(selected) || DEFAULT_SLEEP_GOAL_HOURS;
  const index = Math.max(0, hours.indexOf(current));
  const columnWidth = 100 / hours.length;
  const firstRecommended = hours.indexOf(RECOMMENDED[0]);
  const lastRecommended = hours.indexOf(RECOMMENDED[RECOMMENDED.length - 1]);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome stepId="sleep-goal" hue={question.hue} onBack={onBack} />

      <div className="flex flex-1 flex-col pt-12">
        <h1 className="max-w-[390px] text-balance text-[30px] leading-[1.16] font-medium tracking-[-0.03em] text-ink">
          <QuestionTitle
            title={question.title}
            accentWord={question.accentWord}
          />
        </h1>
        {question.helper ? (
          <p className="mt-4 max-w-[360px] text-pretty text-[14px] leading-[1.55] text-ink-2">
            {question.helper}
          </p>
        ) : null}

        <div className="relative mt-14 h-[182px]">
          <div
            aria-hidden="true"
            className="absolute top-[94px] h-[30px] rounded-[10px] border border-mint/20 bg-mint/[0.07]"
            style={{
              left: `${firstRecommended * columnWidth}%`,
              width: `${(lastRecommended - firstRecommended + 1) * columnWidth}%`,
            }}
          />

          <div
            aria-hidden="true"
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center transition-[left] duration-200 ease-out motion-reduce:transition-none"
            style={{ left: `${(index + 0.5) * columnWidth}%` }}
          >
            <span className="grid h-[76px] min-w-[76px] place-items-center rounded-full border-2 border-mint bg-void px-2 text-[24px] font-medium tracking-[-0.02em] text-ink tabular-nums shadow-[0_14px_34px_rgb(93_221_179/0.28)]">
              {current}h
            </span>
            <span className="h-[22px] w-0.5 bg-mint/90" />
          </div>

          <div
            role="radiogroup"
            aria-label={question.title}
            className="absolute inset-x-0 top-[98px] flex h-[80px]"
          >
            {hours.map((hour) => {
              const active = hour === current;

              return (
                <button
                  key={hour}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${hour} hours`}
                  onClick={() => onSelect(String(hour))}
                  className="group flex flex-1 flex-col items-center justify-start outline-none"
                >
                  <span
                    className={cn(
                      "w-0.5 rounded-full transition-[height,background-color] duration-150 motion-reduce:transition-none",
                      active
                        ? "h-[22px] bg-mint"
                        : "h-[14px] bg-white/25 group-hover:bg-white/45",
                    )}
                  />
                  <span
                    className={cn(
                      "mt-3.5 text-[13px] tabular-nums transition-colors duration-150 motion-reduce:transition-none",
                      active
                        ? "font-medium text-ink"
                        : "text-ink-2 group-hover:text-ink",
                    )}
                  >
                    {hour}
                  </span>

                </button>
              );
            })}
          </div>

          <span
            aria-hidden="true"
            className="absolute top-[158px] -translate-x-1/2 text-[11px] whitespace-nowrap text-mint/85"
            style={{
              left: `${((firstRecommended + lastRecommended + 1) / 2) * columnWidth}%`,
            }}
          >
            what most adults need
          </span>
        </div>
      </div>

      <div className="mt-10">
        <PrimaryAction
          onClick={() => {
            onSelect(String(current));
            onContinue();
          }}
        >
          {funnelCopy.actions.continue}
        </PrimaryAction>
      </div>
    </section>
  );
}