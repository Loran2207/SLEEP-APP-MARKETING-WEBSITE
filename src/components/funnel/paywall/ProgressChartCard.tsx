import { paywallCopy } from "@/data/paywall";

/**
 * The progress chart, laid out like Rest AI's: a falling curve for the thing
 * the plan reduces, a rising one for the thing it builds, twelve weeks across.
 * The curves are hand-drawn geometry, and the footnote says so out loud.
 */

// Plot area x 12..308, y 12..136 inside a 320x148 viewBox.
const AWAKE_PATH = "M 12 30 C 60 36, 105 56, 160 88 C 215 118, 262 128, 308 132";
const QUALITY_PATH = "M 12 128 C 60 122, 105 104, 160 76 C 215 46, 262 30, 308 24";
const GRID_X = [12, 86, 160, 234, 308];

export function ProgressChartCard() {
  const copy = paywallCopy.chart;

  return (
    <div className="rim overflow-hidden rounded-card border border-hair bg-surface/65 p-4">
      <h2 className="text-[16px] font-medium tracking-[-0.01em] text-ink">
        {copy.title}
      </h2>

      <div className="relative mt-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 320 148"
          className="block w-full"
        >
          <defs>
            <linearGradient id="pw-awake-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0"
                style={{ stopColor: "var(--color-coral)" }}
                stopOpacity="0.2"
              />
              <stop
                offset="1"
                style={{ stopColor: "var(--color-coral)" }}
                stopOpacity="0"
              />
            </linearGradient>
            <linearGradient id="pw-quality-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0"
                style={{ stopColor: "var(--color-mint)" }}
                stopOpacity="0.2"
              />
              <stop
                offset="1"
                style={{ stopColor: "var(--color-mint)" }}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {GRID_X.map((x) => (
            <line
              key={x}
              x1={x}
              y1="12"
              x2={x}
              y2="136"
              stroke="rgba(245,245,247,0.08)"
              strokeDasharray="2 5"
            />
          ))}
          <line
            x1="12"
            y1="136"
            x2="308"
            y2="136"
            stroke="rgba(245,245,247,0.1)"
          />

          <g className="text-coral">
            <path d={`${AWAKE_PATH} L 308 136 L 12 136 Z`} fill="url(#pw-awake-fill)" />
            <path
              d={AWAKE_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="308"
              cy="132"
              r="4.5"
              stroke="currentColor"
              strokeWidth="2"
              style={{ fill: "var(--color-surface)" }}
            />
          </g>

          <g className="text-mint">
            <path d={`${QUALITY_PATH} L 308 136 L 12 136 Z`} fill="url(#pw-quality-fill)" />
            <path
              d={QUALITY_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="308"
              cy="24"
              r="4.5"
              stroke="currentColor"
              strokeWidth="2"
              style={{ fill: "var(--color-surface)" }}
            />
          </g>
        </svg>

        <span
          className="absolute left-[3%] top-[3%] rounded-full border border-coral/40 px-2.5 py-1 text-[10px] font-medium leading-none text-coral"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-coral) 14%, var(--color-surface))",
          }}
        >
          {copy.awakeLabel}
        </span>
        <span
          className="absolute bottom-[11%] left-[3%] rounded-full border border-mint/40 px-2.5 py-1 text-[10px] font-medium leading-none text-mint"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-mint) 14%, var(--color-surface))",
          }}
        >
          {copy.qualityLabel}
        </span>
      </div>

      <div className="mt-2 flex justify-between">
        {copy.axis.map((label, index) => (
          <span
            key={label}
            className={
              index === 0
                ? "text-[10px] font-medium text-ink-2"
                : "text-[10px] text-faint"
            }
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
