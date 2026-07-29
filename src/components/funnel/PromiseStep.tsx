import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { PrimaryAction } from "./PrimaryAction";

type PromiseStepProps = {
  onContinue: () => void;
};

export function PromiseStep({ onContinue }: PromiseStepProps) {
  const copy = funnelCopy.promise;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(48px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[280px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="max-w-[390px]"
        />
        <p className="mt-5 max-w-[330px] text-pretty text-[15px] leading-[1.55] text-ink-2">
          {copy.body}
        </p>
      </div>

      <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
    </section>
  );
}