import type { QuestionDefinition } from "@/data/funnel";

import { OptionButton } from "./OptionButton";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";

type SingleSelectStepProps = {
  question: QuestionDefinition;
  selected?: string;
  onSelect: (option: string) => void;
  onBack: () => void;
};

export function SingleSelectStep({
  question,
  selected,
  onSelect,
  onBack,
}: SingleSelectStepProps) {

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome stepId={question.id} hue={question.hue} onBack={onBack} />

      <div className="flex flex-1 flex-col pt-9">
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

        <div className="mt-9 flex flex-col gap-3">
          {question.options.map((option) => (
            <OptionButton
              key={option.label}
              label={option.label}
              emoji={option.emoji}
              description={option.description}
              selected={selected === option.label}
              hue={question.hue}
              onClick={() => onSelect(option.label)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
