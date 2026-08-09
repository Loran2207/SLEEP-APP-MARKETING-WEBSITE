import { Star } from "lucide-react";

import { paywallCopy } from "@/data/paywall";

/**
 * Leaf geometry is baked into plain path coordinates: the Figma capture drops
 * SVG transform attributes, which once reduced these branches to bare stems.
 */
function leafPath(
  cx: number,
  cy: number,
  angleDeg: number,
  rx: number,
  ry: number,
  flip: boolean,
): string {
  const angle = (angleDeg * Math.PI) / 180;
  const point = (px: number, py: number) => {
    const x = cx + px * Math.cos(angle) - py * Math.sin(angle);
    const y = cy + px * Math.sin(angle) + py * Math.cos(angle);
    return `${(flip ? 28 - x : x).toFixed(2)} ${y.toFixed(2)}`;
  };
  return `M ${point(-rx, 0)} Q ${point(0, -ry * 2)} ${point(rx, 0)} Q ${point(0, ry * 2)} ${point(-rx, 0)} Z`;
}

/** Twelve-leaf stations along the stem: [cx, cy, angle of the outward leaf]. */
const LEAF_STATIONS: readonly [number, number, number][] = [
  [20.5, 50, -14],
  [16.5, 43.5, -28],
  [13.5, 36.5, -44],
  [11.5, 29, -60],
  [10.8, 21.5, -76],
  [11.8, 14, -92],
  [14, 7.5, -108],
];

function Laurel({ flip }: { flip?: boolean }) {
  const mirrored = Boolean(flip);
  const stem = mirrored
    ? "M 4 55 C 17 47, 23 31, 18 8"
    : "M 24 55 C 11 47, 5 31, 10 8";

  return (
    <svg aria-hidden="true" viewBox="0 0 28 58" className="h-12 w-6 text-muted">
      <path d={stem} fill="none" stroke="currentColor" strokeWidth="1.25" />
      {LEAF_STATIONS.map(([cx, cy, angle]) => (
        <g key={`${cx}-${cy}`} fill="currentColor">
          <path d={leafPath(cx, cy, angle, 4.6, 1.5, mirrored)} opacity="0.9" />
          <path
            d={leafPath(cx + 2.6, cy - 1.2, angle + 42, 3.9, 1.3, mirrored)}
            opacity="0.6"
          />
        </g>
      ))}
    </svg>
  );
}

/** The Apple mark lifted from the App Store badge artwork in brand/marks. */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="10 5 24 27" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M30.128,19.784c-0.029-3.223,2.639-4.791,2.761-4.864c-1.511-2.203-3.853-2.504-4.676-2.528 c-1.967-0.207-3.875,1.177-4.877,1.177c-1.022,0-2.565-1.157-4.228-1.123c-2.14,0.033-4.142,1.272-5.24,3.196 c-2.266,3.923-0.576,9.688,1.595,12.859c1.086,1.553,2.355,3.287,4.016,3.226c1.625-0.067,2.232-1.036,4.193-1.036 c1.943,0,2.513,1.036,4.207,0.997c1.744-0.028,2.842-1.56,3.89-3.127c1.255-1.78,1.759-3.533,1.779-3.623 C33.507,24.924,30.161,23.647,30.128,19.784z"
      />
      <path
        fill="currentColor"
        d="M26.928,10.306c0.874-1.093,1.472-2.58,1.306-4.089c-1.265,0.056-2.847,0.875-3.758,1.944 c-0.806,0.942-1.526,2.486-1.34,3.938C24.557,12.205,26.016,11.382,26.928,10.306z"
      />
    </svg>
  );
}

/** Rest AI's laurel band: the emblem holds the center, the rating row fills the base. */
export function SocialProofBand() {
  const copy = paywallCopy.socialProof;

  return (
    <div className="rim rounded-card border border-hair bg-surface/65 p-5">
      <div className="flex items-center justify-center gap-4">
        <Laurel />
        <div className="max-w-[220px] text-center">
          <p className="text-[28px] leading-none font-medium tracking-[-0.02em] text-ink">
            {copy.count}
          </p>
          <p className="mt-1.5 text-[12px] leading-[1.45] text-ink-2">
            {copy.countCaption}
          </p>
        </div>
        <Laurel flip />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hair pt-4">
        <div>
          <div aria-label="Five stars" className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                size={13}
                className="fill-mint text-mint"
              />
            ))}
          </div>
          <p className="mt-1.5 text-[15px] font-medium text-ink">{copy.rating}</p>
        </div>
        <div className="flex items-center gap-1.5 text-ink-2">
          <AppleGlyph className="h-[18px] w-auto" />
          <span className="text-[13px]">{copy.ratingSource}</span>
        </div>
      </div>

      <p className="mt-4 text-[14px] text-ink-2">{copy.ratingsLine}</p>
    </div>
  );
}
