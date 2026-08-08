import { paywallCopy } from "@/data/paywall";

const RING_RADIUS = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** The arc length and lit segments are illustrative; the number shown is the placeholder. */
const SIDES = [
  {
    key: "now",
    src: "/funnel/paywall/now.webp",
    hue: "var(--color-coral)",
    ringShare: 0.26,
    litSegments: 2,
  },
  {
    key: "after",
    src: "/funnel/paywall/after.webp",
    hue: "var(--color-mint)",
    ringShare: 0.88,
    litSegments: 5,
  },
] as const;

const SEGMENT_COUNT = 6;

function PercentRing({ share, hue }: { share: number; hue: string }) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center">
      <svg aria-hidden="true" viewBox="0 0 44 44" className="size-full -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(245,245,247,0.1)"
          strokeWidth="4"
        />
        <circle
          cx="22"
          cy="22"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - share)}
          style={{ stroke: hue }}
        />
      </svg>
      <span className="absolute text-[10px] font-medium text-ink tabular-nums">
        {paywallCopy.nowAfter.ringValue}
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
      <div className="mt-1 flex gap-1">
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

/** Rest AI's now and after pair: two photo cards, a ring and two bars each. */
export function NowAfterBlock() {
  const copy = paywallCopy.nowAfter;
  const labels = [copy.nowLabel, copy.afterLabel];

  return (
    <div>
      <h2 className="text-[19px] font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {SIDES.map((side, index) => (
          <div key={side.key}>
            <div className="relative overflow-hidden rounded-card border border-hair">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={side.src}
                alt=""
                className="aspect-[3/4] w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,#000000)]"
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

            <div className="mt-2.5 flex items-center gap-2">
              <PercentRing share={side.ringShare} hue={side.hue} />
              <span className="text-[11px] leading-[1.35] text-ink-2">
                {copy.ringLabel}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col gap-2.5">
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
