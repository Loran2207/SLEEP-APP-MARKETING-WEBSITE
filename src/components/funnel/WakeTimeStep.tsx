import { funnelCopy, type QuestionDefinition } from "@/data/funnel";

import { getQuestionProgress } from "./registry";
import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";
import { QuestionTitle } from "./QuestionTitle";

type WakeTimeStepProps = {
  question: QuestionDefinition;
  value?: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function WakeTimeStep({
  question,
  value,
  onChange,
  onContinue,
  onBack,
}: WakeTimeStepProps) {
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

        <div className="mt-10">
          <label
            htmlFor="wake-time"
            className="text-[14px] font-medium text-ink"
          >
            {question.inputLabel}
          </label>
          <input
            id="wake-time"
            name="wake-time"
            type="time"
            required
            value={value ?? ""}
            onChange={(event) => onChange(event.currentTarget.value)}
            className="rim mt-3 h-18 w-full appearance-none rounded-card border border-hair bg-surface/86 px-5 text-center text-[28px] font-medium tracking-[-0.02em] text-ink tabular-nums transition-[background-color,border-color] duration-150 hover:border-hair-strong focus:border-mint motion-reduce:transition-none"
          />
        </div>
      </div>

      <div className="mt-10">
        <PrimaryAction disabled={!value} onClick={onContinue}>
          {funnelCopy.actions.continue}
        </PrimaryAction>
      </div>
    </section>
  );
}
