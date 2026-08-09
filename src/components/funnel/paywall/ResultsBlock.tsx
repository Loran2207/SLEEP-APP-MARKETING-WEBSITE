import { paywallCopy } from "@/data/paywall";
import { cn } from "@/lib/utils";

/** Bar pixel heights matching the four weekly values, week 1 to week 4. */
const BAR_HEIGHTS = [36, 54, 68, 80] as const;

/** Rest AI's results wall: a small bar chart, then a grid of percent cells. */
export function ResultsBlock() {
  const copy = paywallCopy.results;

  return (
    <div>
      <h2 className="text-balance text-[19px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </h2>

      <div className="mt-4 flex h-[128px] items-end gap-3 border-b border-hair px-3 pb-0">
        {copy.bars.map((bar, index) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] text-ink-2 tabular-nums">
              {bar.value}
            </span>
            <span
              className="w-full max-w-[44px] rounded-t-[8px]"
              style={{
                height: `${BAR_HEIGHTS[index]}px`,
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--color-blue) 72%, white) 0%, var(--color-blue) 34%, color-mix(in srgb, var(--color-blue) 52%, var(--color-abyss)) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 18px color-mix(in srgb, var(--color-blue) 22%, transparent)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 px-3">
        {copy.bars.map((bar) => (
          <span
            key={bar.label}
            className="flex-1 pt-1.5 text-center text-[10px] text-muted"
          >
            {bar.label}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-card border border-hair bg-surface/50">
        {copy.cells.map((cell, index) => (
          <div
            key={cell.label}
            className={cn(
              "px-2 py-3",
              index % 3 !== 0 && "border-l border-hair",
              index >= 3 && "border-t border-hair",
            )}
          >
            <p className="text-[15px] leading-none font-medium tracking-[-0.01em] text-ink tabular-nums">
              {cell.value}
            </p>
            <p className="mt-1 text-[11px] leading-[1.35] text-ink-2">
              {cell.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[11px] leading-[1.5] text-faint">{copy.note}</p>
    </div>
  );
}
