import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";

import { funnelCopy, plans, type BillingPeriod } from "@/data/funnel";
import { paywallCopy } from "@/data/paywall";
import { cn } from "@/lib/utils";

import { PrimaryAction } from "../PrimaryAction";

type PlanCardProps = {
  billing: BillingPeriod;
  onBillingChange: (period: BillingPeriod) => void;
  onTrial: () => void;
  countdown: string;
};

/**
 * The purchase card, mirroring Rest AI's plan rows with the two plans this
 * product really has. Prices come from the plans record; only the per-day
 * arithmetic and the yearly anchor live in the paywall copy.
 */
export function PlanCard({
  billing,
  onBillingChange,
  onTrial,
  countdown,
}: PlanCardProps) {
  const copy = paywallCopy.planCard;

  const rows = [
    {
      period: "monthly" as const,
      badge: copy.monthly.badge,
      badgeAccent: false,
      name: copy.monthly.name,
      perDay: copy.monthly.perDay,
      anchor: undefined,
      priceLine: plans.monthly.price,
      subLine: undefined,
      recommended: undefined,
    },
    {
      period: "yearly" as const,
      badge: plans.yearly.badge,
      badgeAccent: true,
      name: copy.yearly.name,
      perDay: copy.yearly.perDay,
      anchor: copy.yearly.anchor,
      priceLine: plans.yearly.renewal,
      subLine: plans.yearly.price,
      recommended: copy.yearly.recommended,
    },
  ];

  return (
    <div className="rim rounded-card border border-hair bg-surface/65 p-5">
      <h2 className="text-balance text-center text-[22px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
        {copy.heading}
      </h2>

      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-coral/40 bg-coral/[0.14] px-3.5 py-1.5 text-[12px] font-medium text-coral">
          <Clock aria-hidden="true" size={13} strokeWidth={2} />
          {copy.offerBefore}
          <span className="tabular-nums">{countdown}</span>
          {copy.offerAfter}
        </span>
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">{funnelCopy.paywall.planLabel}</legend>
        <div className="flex flex-col gap-3">
          {rows.map((row) => {
            const selected = billing === row.period;

            return (
              <div key={row.period}>
                <label className="block cursor-pointer">
                  <input
                    type="radio"
                    name="paywall-plan"
                    value={row.period}
                    checked={selected}
                    onChange={() => onBillingChange(row.period)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "rim flex items-center gap-3.5 rounded-card border p-4 transition-[background-color,border-color] duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-blue motion-reduce:transition-none",
                      selected
                        ? "border-blue bg-blue/[0.08]"
                        : "border-hair bg-transparent",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border",
                        selected ? "border-blue" : "border-hair-strong",
                      )}
                    >
                      {selected ? (
                        <span className="size-2.5 rounded-full bg-blue" />
                      ) : null}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-medium text-ink">
                          {row.name}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10.5px] font-medium",
                            row.badgeAccent
                              ? "border-blue/30 bg-blue/10 text-blue"
                              : "border-hair bg-white/[0.05] text-ink-2",
                          )}
                        >
                          {row.badge}
                        </span>
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-[14px] text-ink-2">
                        {row.anchor ? (
                          <s className="text-[12px] text-faint">{row.anchor}</s>
                        ) : null}
                        <span className="font-medium text-ink">
                          {row.priceLine}
                        </span>
                        {row.subLine ? (
                          <span className="text-[12px] text-muted">
                            {row.subLine}
                          </span>
                        ) : null}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "flex shrink-0 flex-col items-center rounded-[12px] px-3 py-2",
                        selected
                          ? "bg-blue text-void"
                          : "border border-hair bg-surface-3 text-ink",
                      )}
                    >
                      <span className="text-[15px] leading-none font-medium tabular-nums">
                        {row.perDay}
                      </span>
                      <span
                        className={cn(
                          "mt-1 text-[10px] leading-none",
                          selected ? "text-void/70" : "text-muted",
                        )}
                      >
                        {copy.perDayUnit}
                      </span>
                    </span>
                  </span>
                </label>

                {row.recommended ? (
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] font-medium text-blue">
                    <Sparkles aria-hidden="true" size={13} strokeWidth={1.8} />
                    {row.recommended}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-4 text-center text-[11px] leading-[1.5] text-faint">
        {copy.footnote}
      </p>

      <div className="mt-4">
        <PrimaryAction onClick={onTrial}>{paywallCopy.cta}</PrimaryAction>
      </div>

      <p className="mt-3.5 flex items-center justify-center gap-1.5 text-[12px] text-muted">
        <ShieldCheck
          aria-hidden="true"
          size={14}
          strokeWidth={1.8}
          className="text-mint"
        />
        {funnelCopy.checkout.secure}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-hair pt-4">
        {funnelCopy.paywall.trust.map((item) => (
          <span
            key={item}
            className="flex items-start justify-center gap-1 text-center text-[10px] leading-[1.35] text-muted"
          >
            <Check
              aria-hidden="true"
              size={11}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-mint"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
