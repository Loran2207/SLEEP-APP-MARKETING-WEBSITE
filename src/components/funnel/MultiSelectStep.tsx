import type { QuestionDefinition } from "@/data/funnel";
import { funnelCopy } from "@/data/funnel";

import { getQuestionProgress } from "./registry";
import { OptionButton } from "./OptionButton";
import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";

type MultiSelectStepProps = {
  question: QuestionDefinition;
  selected: string[];
  onToggle: (option: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function MultiSelectStep({
  question,
  selected,
  onToggle,
  onContinue,
  onBack,
}: MultiSelectStepProps) {
  const progress = getQuestionProgress(question.id);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5">
      <QuestionChrome
        {...progress}
        hue={question.hue}
        onBack={onBack}
      />

      <div className="flex flex-1 flex-col pt-10">
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

        <div className="mt-8 flex flex-col gap-3">
          {question.options.map((option) => (
            <OptionButton
              key={option.label}
              label={option.label}
              expand={option.expand}
              selected={selected.includes(option.label)}
              hue={question.hue}
              selectionStyle="tint"
              onClick={() => onToggle(option.label)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 mt-8 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,var(--color-void)_28%)] px-5 pt-8 pb-[max(20px,env(safe-area-inset-bottom))]">
        <PrimaryAction onClick={onContinue}>
          {funnelCopy.actions.continue}
        </PrimaryAction>
      </div>
    </section>
  );
}
