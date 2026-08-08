"use client";

import { funnelCopy, type QuestionDefinition } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";
import {
  DEFAULT_SLEEP_GOAL_HOURS,
  DEFAULT_WAKE_TIME,
  formatTime,
  lightsOutFor,
  splitTime,
} from "./time";
import { TimeWheel } from "./TimeWheel";

const QUICK_TIMES = ["06:00", "06:30", "07:00", "07:30", "08:00"] as const;

type WakeTimeStepProps = {
  question: QuestionDefinition;
  value?: string;
  sleepGoalHours?: number;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function WakeTimeStep({
  question,
  value,
  sleepGoalHours,
  onChange,
  onContinue,
  onBack,
}: WakeTimeStepProps) {
  const wakeTime = value ?? DEFAULT_WAKE_TIME;
  const { hours, minutes } = splitTime(wakeTime);
  const goalHours = sleepGoalHours ?? DEFAULT_SLEEP_GOAL_HOURS;
  const lightsOut = lightsOutFor(wakeTime, goalHours);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome stepId="wake-time" hue={question.hue} onBack={onBack} />

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

        <div className="rim mt-8 rounded-card border border-hair bg-surface/72 px-4 pt-3 pb-5">
          <TimeWheel
            hours={hours}
            minutes={minutes}
            hue={question.hue}
            onChange={(nextHours, nextMinutes) =>
              onChange(formatTime(nextHours * 60 + nextMinutes))
            }
          />

          {lightsOut ? (
            <p className="mt-3 text-center text-[13px] leading-[1.5] text-ink-2">
              Lights out around{" "}
              <span className="font-medium text-ink tabular-nums">
                {lightsOut}
              </span>{" "}
              for {goalHours}h of sleep
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {QUICK_TIMES.map((time) => {
            const active = wakeTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => onChange(time)}
                aria-pressed={active}
                className={cn(
                  "min-h-11 flex-1 rounded-full border px-3 text-[14px] font-medium tabular-nums transition-[background-color,border-color,color] duration-150 motion-reduce:transition-none",
                  active
                    ? "border-mint bg-mint text-void"
                    : "border-hair bg-surface/72 text-ink-2 hover:border-hair-strong hover:text-ink",
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <PrimaryAction
          onClick={() => {
            onChange(wakeTime);
            onContinue();
          }}
        >
          {funnelCopy.actions.continue}
        </PrimaryAction>
      </div>
    </section>
  );
}