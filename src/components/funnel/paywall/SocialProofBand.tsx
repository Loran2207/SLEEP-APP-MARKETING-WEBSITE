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
      className={cn("h-12 w-6 text-muted", flip && "-scale-x-100")}
    >
      <path
        d="M 24 55 C 11 47, 5 31, 10 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      {leaves.map((leaf) => (
        <ellipse
          key={`${leaf.cx}-${leaf.cy}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx="5"
          ry="1.9"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${leaf.angle} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
    </svg>
  );
}

/** Rest AI's laurel band on the shared left rail. */
export function SocialProofBand() {
  const copy = paywallCopy.socialProof;

  return (
    <div className="rim rounded-card border border-hair bg-surface/65 p-5">
      <div className="flex items-center gap-3.5">
        <Laurel />
        <div>
          <p className="text-[26px] leading-none font-medium tracking-[-0.02em] text-ink">
            {copy.count}
          </p>
          <p className="mt-1 text-[13px] text-ink-2">{copy.countCaption}</p>
        </div>
        <Laurel flip />
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-hair pt-4">
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
        <span aria-hidden="true" className="h-8 w-px bg-hair" />
        <div className="flex items-center gap-1.5 text-muted">
          <Apple aria-hidden="true" size={16} strokeWidth={1.6} />
          <span className="text-[13px]">{copy.ratingSource}</span>
        </div>
      </div>

      <p className="mt-4 text-[14px] text-ink-2">{copy.ratingsLine}</p>
      <p className="mt-1 text-[11px] text-faint">{copy.note}</p>
    </div>
  );
}
