import { paywallCopy } from "@/data/paywall";
import { cn } from "@/lib/utils";

/** Bar heights are illustrative geometry; the caption is the placeholder. */
const BAR_HEIGHTS = [42, 62, 78, 90] as const;

/**
 * Rest AI's results wall: a small bar chart, then a grid of percent cells.
 * Every figure stays "NN%" until the client sends real numbers, and the note
 * under the grid says so.
 */
export function ResultsBlock() {
  const copy = paywallCopy.results;

  return (
    <div>
      <h2 className="text-balance text-center text-[22px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
        {copy.title}
      </h2>

      <div className="mt-6 flex h-[130px] items-end gap-3 border-b border-hair px-4 pb-0">
        {BAR_HEIGHTS.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] text-ink-2 tabular-nums">
              {copy.value}
            </span>
            <span
              className="w-full max-w-[52px] rounded-t-[8px]"
              style={{
                height: `${height}px`,
                background:
                  "linear-gradient(180deg,var(--color-blue),color-mix(in srgb,var(--color-violet) 70%,#05060a))",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-card border border-hair bg-surface/50">
        {copy.cells.map((label, index) => (
          <div
            key={label}
            className={cn(
              "px-3 py-4 text-center",
              index % 3 !== 0 && "border-l border-hair",
              index >= 3 && "border-t border-hair",
            )}
          >
            <p className="text-[22px] leading-none font-medium tracking-[-0.02em] text-ink tabular-nums">
              {copy.value}
            </p>
            <p className="mt-1.5 text-[11px] leading-[1.35] text-ink-2">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-faint">{copy.note}</p>
    </div>
  );
}
