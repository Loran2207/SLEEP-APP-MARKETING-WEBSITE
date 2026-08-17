import type { FeatureGlyph, ShotHue, StoreFeature } from "@/data/store";

/**
 * The four features, drawn the way the landing page draws the cards floating
 * beside its phone: light glass, a hairline edge, a lit disc in a dashed ring,
 * the name and one line under it. Compact on purpose - the row of them ends
 * level with the lower edge of the phone on the other three frames.
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

const DISC = 132;
const RING = 168;

function Glyph({ kind }: { kind: FeatureGlyph }) {
  const common = {
    width: 64,
    height: 64,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "#ffffff",
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
      className="flex items-center gap-[46px] px-[54px] py-[60px]"
      style={{
        borderRadius: 42,
        border: "1px solid rgba(245, 245, 247, 0.13)",
        backgroundColor: "rgba(14, 15, 21, 0.7)",
        boxShadow: `0 34px 76px rgba(0, 0, 0, 0.66), 0 0 64px rgba(${rgb}, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.11)`,
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
            width: RING,
            height: RING,
            border: `2px dashed rgba(${rgb}, 0.4)`,
          }}
        />
        <span
          className="relative grid place-items-center rounded-full"
          style={{
            width: DISC,
            height: DISC,
            border: `2px solid rgba(${rgb}, 0.5)`,
            backgroundImage: `radial-gradient(circle at 38% 30%, rgba(${rgb}, 0.72) 0%, rgba(${rgb}, 0.34) 52%, rgba(${rgb}, 0.14) 100%)`,
            boxShadow: `0 0 52px rgba(${rgb}, 0.45)`,
          }}
        >
          <Glyph kind={feature.glyph} />
        </span>
      </span>

      <span className="min-w-0">
        <span className="block text-[52px] leading-[1.1] font-semibold tracking-[-0.022em] text-ink">
          {feature.name}
        </span>
        <span
          className="mt-[14px] block text-[32px] leading-[1.34]"
          style={{ color: "rgba(245, 245, 247, 0.58)" }}
        >
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
    <ul className="flex w-full flex-col gap-[34px] text-left">
      {features.map((feature) => (
        <FeatureRow key={feature.glyph} feature={feature} />
      ))}
    </ul>
  );
}
