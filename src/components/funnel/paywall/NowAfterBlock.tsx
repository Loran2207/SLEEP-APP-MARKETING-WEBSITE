import { paywallCopy } from "@/data/paywall";

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** The arc share and lit segments match the two ring values in the copy. */
const SIDES = [
  {
    key: "now",
    hue: "var(--color-coral)",
    src: "/funnel/paywall/man-now.webp",
    ringShare: 0.26,
    ringValue: paywallCopy.nowAfter.nowValue,
    litSegments: 2,
  },
  {
    key: "after",
    hue: "var(--color-mint)",
    src: "/funnel/paywall/man-after.webp",
    ringShare: 0.88,
    ringValue: paywallCopy.nowAfter.afterValue,
    litSegments: 5,
  },
] as const;

const SEGMENT_COUNT = 6;

function PercentRing({
  share,
  hue,
  value,
}: {
  share: number;
  hue: string;
  value: string;
}) {
  return (
    <span className="relative grid size-[56px] shrink-0 place-items-center">
      <svg aria-hidden="true" viewBox="0 0 52 52" className="size-full -rotate-90">
        <circle
          cx="26"
          cy="26"
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(245,245,247,0.1)"
          strokeWidth="4.5"
        />
        <circle
          cx="26"
          cy="26"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - share)}
          style={{ stroke: hue }}
        />
      </svg>
      <span className="absolute text-[13px] font-medium text-ink tabular-nums">
        {value}
      </span>
    </span>
  );
}

function SegmentedBar({
  label,
  lit,
  hue,
}: {
  label: string;
  lit: number;
  hue: string;
}) {
  return (
    <div>
      <span className="text-[11px] leading-none text-muted">{label}</span>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
          <span
            key={index}
            className="h-1.5 flex-1 rounded-full"
            style={{
              backgroundColor:
                index < lit ? hue : "rgba(245,245,247,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Rest AI's now and after pair, drawn in the site's cosmic language instead of photos. */
export function NowAfterBlock() {
  const copy = paywallCopy.nowAfter;
  const labels = [copy.nowLabel, copy.afterLabel];

  return (
    <div>
      <h2 className="text-[19px] leading-[1.3] font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3.5">
        {SIDES.map((side, index) => (
          <div key={side.key}>
            <div
              className="rim relative aspect-[4/5] overflow-hidden rounded-card border border-hair"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-surface), var(--color-abyss))",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[70%]"
                style={{
                  background: `radial-gradient(ellipse 50% 50% at 50% 68%, color-mix(in srgb, ${side.hue} 14%, transparent), transparent 72%)`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={side.src}
                alt=""
                className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto object-contain object-bottom"
              />
              <span
                className="absolute left-1/2 top-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] font-medium"
                style={{
                  color: side.hue,
                  borderColor: `color-mix(in srgb, ${side.hue} 40%, transparent)`,
                  backgroundColor: "rgba(0,0,0,0.72)",
                }}
              >
                {labels[index]}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2.5">
              <PercentRing
                share={side.ringShare}
                hue={side.hue}
                value={side.ringValue}
              />
              <span className="text-[12px] leading-[1.35] text-ink-2">
                {copy.ringLabel}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {copy.barLabels.map((label) => (
                <SegmentedBar
                  key={label}
                  label={label}
                  lit={side.litSegments}
                  hue={side.hue}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
