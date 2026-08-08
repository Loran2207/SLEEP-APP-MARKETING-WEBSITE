import { paywallCopy } from "@/data/paywall";
import { cn } from "@/lib/utils";

/** Bar heights are illustrative geometry; the caption is the placeholder. */
const BAR_HEIGHTS = [36, 54, 68, 80] as const;

/**
 * Rest AI's results wall: a small bar chart, then a grid of percent cells.
 * Every figure stays "NN%" until the client sends real numbers, and the note
 * under the grid says so.
 */
export function ResultsBlock() {
  const copy = paywallCopy.results;

  return (
    <div>
      <h2 className="text-balance text-[19px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </h2>

      <div className="mt-4 flex h-[112px] items-end gap-3 border-b border-hair px-3 pb-0">
        {BAR_HEIGHTS.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] text-ink-2 tabular-nums">
              {copy.value}
            </span>
            <span
              className="w-full max-w-[44px] rounded-t-[8px]"
              style={{
                height: `${height}px`,
                background:
                  "linear-gradient(180deg,var(--color-blue),color-mix(in srgb,var(--color-violet) 70%,#05060a))",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-card border border-hair bg-surface/50">
        {copy.cells.map((label, index) => (
          <div
            key={label}
            className={cn(
              "px-2 py-3 text-center",
              index % 3 !== 0 && "border-l border-hair",
              index >= 3 && "border-t border-hair",
            )}
          >
            <p className="text-[15px] leading-none font-medium tracking-[-0.01em] text-ink tabular-nums">
              {copy.value}
            </p>
            <p className="mt-1 text-[11px] leading-[1.35] text-ink-2">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[11px] text-faint">{copy.note}</p>
    </div>
  );
}
