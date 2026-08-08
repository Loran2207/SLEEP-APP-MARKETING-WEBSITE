import { Check } from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type BenefitsStepProps = {
  onContinue: () => void;
};

/** The app's "Good sleep changes everything else." screen. */
export function BenefitsStep({ onContinue }: BenefitsStepProps) {
  const copy = funnelCopy.benefits;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mt-6 max-w-[360px]"
      />
      <p className="mt-3 max-w-[340px] text-[15px] leading-[1.5] text-ink-2">
        {copy.body}
      </p>

      <ul className="mt-8 flex flex-col gap-2.5">
        {copy.items.map((item) => (
          <li key={item} className="flex items-center gap-3.5 py-1.5">
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-full border border-violet/40 bg-violet/15 text-violet"
            >
              <Check size={14} strokeWidth={2.4} />
            </span>
            <span className="text-[17px] font-medium text-ink">{item}</span>
          </li>
        ))}
        <li className="flex items-center gap-3.5 py-1.5">
          <span aria-hidden="true" className="size-7 shrink-0" />
          <span className="text-[16px] text-ink-2 italic">{copy.more}</span>
        </li>
      </ul>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}