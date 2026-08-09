import { paywallCopy } from "@/data/paywall";

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/* Token colors as rgb triplets so the SVG paints survive the Figma capture,
   which drops color-mix() inside SVG attributes. coral / mint / ink. */
const CORAL = "255, 142, 124";
const MINT = "93, 221, 179";
const INK = "245, 245, 247";

/** The arc share and lit segments match the two ring values in the copy. */
const SIDES = [
  {
    key: "now",
    hue: "var(--color-coral)",
    ringShare: 0.26,
    ringValue: paywallCopy.nowAfter.nowValue,
    litSegments: 2,
  },
  {
    key: "after",
    hue: "var(--color-mint)",
    ringShare: 0.88,
    ringValue: paywallCopy.nowAfter.afterValue,
    litSegments: 5,
  },
] as const;

const SEGMENT_COUNT = 6;

/** A restless night in the site's own cosmic language: a clouded moon and a jagged wake line. */
function NowScene() {
  return (
    <svg viewBox="0 0 156 190" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="now-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${CORAL}, 0.20)`} />
          <stop offset="70%" stopColor={`rgba(${CORAL}, 0)`} />
        </radialGradient>
      </defs>

      {[
        [18, 26, 1.2, 0.3], [132, 20, 1.5, 0.4], [142, 74, 1.1, 0.25],
        [24, 96, 1.3, 0.3], [116, 108, 1.2, 0.35], [92, 22, 1, 0.25],
      ].map(([x, y, r, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={`rgba(${INK}, ${o})`} />
      ))}

      <circle cx="62" cy="58" r="44" fill="url(#now-glow)" />
      <circle
        cx="62"
        cy="58"
        r="23"
        fill={`rgba(${CORAL}, 0.10)`}
        stroke={`rgba(${CORAL}, 0.55)`}
        strokeWidth="1.5"
      />
      {[
        [40, 50, 92], [50, 62, 108], [36, 74, 84],
      ].map(([x1, y, x2]) => (
        <line
          key={y}
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke="rgba(12, 14, 20, 0.85)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      {[
        [44, 50, 88], [54, 62, 104], [40, 74, 80],
      ].map(([x1, y, x2]) => (
        <line
          key={`c${y}`}
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke={`rgba(${INK}, 0.22)`}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      <path
        d="M12 152 L32 138 L46 160 L64 130 L82 154 L100 138 L118 162 L144 144"
        fill="none"
        stroke={`rgba(${CORAL}, 0.9)`}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="64" cy="130" r="2.6" fill={`rgb(${CORAL})`} />
      <circle cx="118" cy="162" r="2.6" fill={`rgb(${CORAL})`} />
    </svg>
  );
}

/** The settled night: a clean crescent, sparkles, and one calm breathing wave. */
function AfterScene() {
  return (
    <svg viewBox="0 0 156 190" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="after-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${MINT}, 0.22)`} />
          <stop offset="70%" stopColor={`rgba(${MINT}, 0)`} />
        </radialGradient>
      </defs>

      {[
        [22, 30, 1.3, 0.4], [128, 24, 1.2, 0.35], [140, 86, 1.2, 0.3],
        [30, 102, 1.1, 0.3], [112, 100, 1.4, 0.4],
      ].map(([x, y, r, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={`rgba(${INK}, ${o})`} />
      ))}
      {[
        [36, 44], [124, 62],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} stroke={`rgba(${MINT}, 0.75)`} strokeWidth="1.4" strokeLinecap="round">
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
          <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
        </g>
      ))}

      <circle cx="66" cy="58" r="46" fill="url(#after-glow)" />
      <circle cx="66" cy="58" r="23" fill={`rgba(${MINT}, 0.16)`} stroke={`rgba(${MINT}, 0.6)`} strokeWidth="1.5" />
      <circle cx="75" cy="50" r="19" fill="#0c0e14" />

      <path
        d="M12 150 C 32 140, 48 160, 68 150 S 104 140, 122 150 S 142 152, 144 150"
        fill="none"
        stroke={`rgba(${MINT}, 0.9)`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
              {side.key === "now" ? <NowScene /> : <AfterScene />}
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
