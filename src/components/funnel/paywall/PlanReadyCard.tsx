import { Check } from "lucide-react";

import { paywallCopy } from "@/data/paywall";

import { PrimaryAction } from "../PrimaryAction";

type PlanReadyCardProps = {
  countdown: string;
  onTrial: () => void;
};

/** The "plan is ready" moment with the reserved-discount countdown. */
export function PlanReadyCard({ countdown, onTrial }: PlanReadyCardProps) {
  const copy = paywallCopy.ready;

  return (
    <div className="rim rounded-card border border-mint/25 bg-mint/[0.06] p-4 text-center">
      <h2 className="flex items-center justify-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-ink">
        <span
          aria-hidden="true"
          className="grid size-5 shrink-0 place-items-center rounded-full border border-mint/40 bg-mint/[0.14] text-mint"
        >
          <Check size={11} strokeWidth={2.4} />
        </span>
        {copy.title}
      </h2>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-2">
        {copy.reservedBefore}
        <span className="font-medium text-ink tabular-nums">{countdown}</span>
      </p>
      <div className="mt-3.5">
        <PrimaryAction onClick={onTrial}>{paywallCopy.cta}</PrimaryAction>
      </div>
    </div>
  );
}
