import { plans, type BillingPeriod } from "@/data/funnel";
import { cn } from "@/lib/utils";

type PlanSelectorProps = {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  label: string;
};

const periods: readonly BillingPeriod[] = ["yearly", "monthly"];

export function PlanSelector({
  value,
  onChange,
  label,
}: PlanSelectorProps) {
  return (
    <fieldset className="mt-7">
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-col gap-3">
        {periods.map((period) => {
          const plan = plans[period];
          const selected = value === period;

          return (
            <label key={period} className="block cursor-pointer">
              <input
                type="radio"
                name="sleep-plan"
                value={period}
                checked={selected}
                onChange={() => onChange(period)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "rim flex min-h-[144px] w-full items-start justify-between gap-4 rounded-card border p-5 transition-[background-color,border-color,transform] duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-blue active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none",
                  selected
                    ? "border-blue bg-blue/[0.08]"
                    : "border-hair bg-transparent",
                )}
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[16px] font-medium text-ink">
                      {plan.name}
                    </span>
                    {plan.badge ? (
                      <span className="rounded-full border border-blue/30 bg-blue/10 px-2.5 py-1 text-[11px] font-medium text-blue">
                        {plan.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-4 block text-[25px] leading-none font-medium tracking-[-0.035em] text-ink">
                    {plan.price}
                  </span>
                  <span className="mt-2.5 block text-[13px] leading-[1.45] text-ink-2">
                    {plan.billing}
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.45] text-muted">
                    {plan.trial}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border",
                    selected ? "border-blue" : "border-hair-strong",
                  )}
                >
                  {selected ? (
                    <span className="size-2.5 rounded-full bg-blue" />
                  ) : null}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
