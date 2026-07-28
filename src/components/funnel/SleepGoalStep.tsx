import { funnelCopy, type QuestionDefinition } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { getQuestionProgress } from "./registry";
import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";

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
  const progress = getQuestionProgress(question.id);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome {...progress} hue={question.hue} onBack={onBack} />

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

        <div
          role="radiogroup"
          aria-label="Sleep goal in hours"
          className="mt-12 grid grid-cols-7 gap-1.5"
        >
          {question.options.map((option) => {
            const active = selected === option.label;

            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${option.label} hours`}
                onClick={() => onSelect(option.label)}
                className={cn(
                  "rim grid min-h-14 place-items-center rounded-[12px] border text-[15px] font-medium tabular-nums transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none",
                  active
                    ? "border-mint bg-mint text-void"
                    : "border-hair bg-surface/86 text-ink hover:border-hair-strong hover:bg-surface-2/82",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <PrimaryAction disabled={!selected} onClick={onContinue}>
          {funnelCopy.actions.continue}
        </PrimaryAction>
      </div>
    </section>
  );
}
