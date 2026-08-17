import type { FeatureGlyph, ShotHue, StoreFeature } from "@/data/store";

/**
 * The four features, drawn the way the app draws its own: a dashed ring around
 * a lit disc, one glyph inside it.
 *
 * Everything here is written in plain rgba on purpose. The Figma exporter drops
 * modern colour functions, so a color-mix() fill arrives as nothing at all.
 * The glyphs carry no transform for the same reason - a rotate() is stripped in
 * transit and the shape lands somewhere else entirely.
 */
const hueRgb: Record<ShotHue, string> = {
  blue: "92, 155, 255",
  coral: "255, 142, 124",
  mint: "93, 221, 179",
  violet: "157, 124, 255",
};

const DISC = 140;
const RING = 200;

function Glyph({ kind }: { kind: FeatureGlyph }) {
  const common = {
    width: 70,
    height: 70,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "rgba(245, 245, 247, 0.92)",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "alarm") {
    // A clock with the two bells the app's own alarm icon has.
    return (
      <svg {...common}>
        <circle cx="24" cy="26" r="14" />
        <path d="M24 19v7l5 3" />
        <path d="M11 12l-4 4" />
        <path d="M37 12l4 4" />
      </svg>
    );
  }

  if (kind === "breath") {
    // Three passes of breath, the same wind lines the wind-down screen uses.
    return (
      <svg {...common}>
        <path d="M6 17h20a5 5 0 1 0-5-5" />
        <path d="M6 24h27a5 5 0 1 1-5 5" />
        <path d="M6 31h17a4.5 4.5 0 1 1-4.5 4.5" />
      </svg>
    );
  }

  if (kind === "sounds") {
    // The five-bar level meter from the Sounds card.
    return (
      <svg {...common} strokeWidth={2.8}>
        <path d="M9 21v6" />
        <path d="M16.5 15v18" />
        <path d="M24 10v28" />
        <path d="M31.5 17v14" />
        <path d="M39 22v4" />
      </svg>
    );
  }

  // The diary page, with the lines a morning entry fills in.
  return (
    <svg {...common}>
      <path d="M11 9h22a3 3 0 0 1 3 3v27a3 3 0 0 1-3 3H15a4 4 0 0 1-4-4V9z" />
      <path d="M11 34h25" />
      <path d="M18 17h11" />
      <path d="M18 24h8" />
    </svg>
  );
}

function FeatureRow({ feature }: { feature: StoreFeature }) {
  const rgb = hueRgb[feature.hue];

  return (
    <li
      className="flex items-center gap-[52px] px-[62px] py-[104px]"
      style={{
        borderRadius: 56,
        border: "1px solid rgba(245, 245, 247, 0.12)",
        // Dark enough to hold the glow behind it back, the way the app's own
        // cards sit on top of their backdrop instead of glowing through.
        background: "rgba(18, 19, 26, 0.72)",
      }}
    >
      <span
        className="relative grid shrink-0 place-items-center"
        style={{ width: RING, height: RING }}
      >
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: RING * 1.7,
            height: RING * 1.7,
            backgroundImage: `radial-gradient(circle, rgba(${rgb}, 0.22) 0%, rgba(${rgb}, 0.08) 42%, rgba(${rgb}, 0) 70%)`,
          }}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: RING,
            height: RING,
            border: `2px dashed rgba(${rgb}, 0.34)`,
          }}
        />
        <span
          className="relative grid place-items-center rounded-full"
          style={{
            width: DISC,
            height: DISC,
            border: `2px solid rgba(${rgb}, 0.6)`,
            backgroundImage: `radial-gradient(circle at 34% 28%, rgba(${rgb}, 0.52) 0%, rgba(${rgb}, 0.24) 46%, rgba(${rgb}, 0.09) 100%)`,
          }}
        >
          <Glyph kind={feature.glyph} />
        </span>
      </span>

      <span className="min-w-0">
        <span className="block text-[56px] leading-[1.15] font-medium tracking-[-0.02em] text-ink">
          {feature.name}
        </span>
        <span className="mt-[18px] block text-[36px] leading-[1.38] text-ink-2">
          {feature.body.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </span>
      </span>
    </li>
  );
}

export function StoreFeatureList({
  features,
}: {
  features: readonly StoreFeature[];
}) {
  return (
    <ul className="flex w-full flex-col gap-[56px] text-left">
      {features.map((feature) => (
        <FeatureRow key={feature.glyph} feature={feature} />
      ))}
    </ul>
  );
}
