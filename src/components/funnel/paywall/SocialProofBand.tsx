import { Apple, Star } from "lucide-react";

import { paywallCopy } from "@/data/paywall";
import { cn } from "@/lib/utils";

/** One hand-drawn laurel branch; the right side renders it mirrored. */
function Laurel({ flip }: { flip?: boolean }) {
  const leaves = [
    { cx: 20, cy: 49, angle: -18 },
    { cx: 15.5, cy: 41, angle: -32 },
    { cx: 12, cy: 32.5, angle: -50 },
    { cx: 10.5, cy: 24, angle: -66 },
    { cx: 10.5, cy: 15.5, angle: -80 },
    { cx: 12.5, cy: 8, angle: -96 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 58"
      className={cn("h-14 w-7 text-muted", flip && "-scale-x-100")}
    >
      <path
        d="M 24 55 C 11 47, 5 31, 10 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      {leaves.map((leaf) => (
        <ellipse
          key={`${leaf.cx}-${leaf.cy}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx="5.4"
          ry="2.1"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${leaf.angle} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
    </svg>
  );
}

/**
 * Rest AI's laurel band. Every number stays a placeholder in the house style
 * until the client supplies real figures, and the note under the band says so.
 */
export function SocialProofBand() {
  const copy = paywallCopy.socialProof;

  return (
    <div className="rim rounded-card border border-hair bg-surface/65 px-5 py-7 text-center">
      <div className="flex items-center justify-center gap-4">
        <Laurel />
        <div>
          <p className="text-[38px] leading-none font-medium tracking-[-0.03em] text-ink">
            {copy.count}
          </p>
          <p className="mt-1.5 text-[13px] text-ink-2">{copy.countCaption}</p>
        </div>
        <Laurel flip />
      </div>

      <div className="mt-6 flex items-center justify-center gap-5 border-t border-hair pt-6">
        <div>
          <div
            aria-label="Five stars"
            className="flex justify-center gap-0.5"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                size={13}
                className="fill-mint text-mint"
              />
            ))}
          </div>
          <p className="mt-2 text-[17px] font-medium text-ink">{copy.rating}</p>
        </div>
        <span aria-hidden="true" className="h-9 w-px bg-hair" />
        <div className="flex items-center gap-1.5 text-muted">
          <Apple aria-hidden="true" size={17} strokeWidth={1.6} />
          <span className="text-[13px]">{copy.ratingSource}</span>
        </div>
      </div>

      <p className="mt-5 text-[14px] text-ink-2">{copy.ratingsLine}</p>
      <p className="mt-2 text-[11px] text-faint">{copy.note}</p>
    </div>
  );
}
