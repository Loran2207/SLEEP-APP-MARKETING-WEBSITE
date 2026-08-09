import {
  AmexMonoMark,
  ApplePayMonoMark,
  MastercardMonoMark,
  PayPalMonoMark,
  VisaMark,
} from "@/components/brand/marks";
import { paywallCopy } from "@/data/paywall";

/**
 * The money-back card. The seal is the title; the body stays a marked
 * placeholder because the refund terms are the client's to write, and this
 * site does not promise behaviour nobody has committed to.
 */
export function GuaranteeCard() {
  const copy = paywallCopy.guarantee;

  return (
    <div className="rim rounded-card border border-hair bg-surface/65 p-5">
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 104 104"
          className="size-[88px] shrink-0"
          role="img"
          aria-label={`${copy.sealTop} ${copy.sealBottom}`}
        >
        <circle
          cx="52"
          cy="52"
          r="49"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="2.5 4.5"
          opacity="0.8"
          style={{ stroke: "var(--color-mint)" }}
        />
        <circle
          cx="52"
          cy="52"
          r="41"
          strokeWidth="1"
          style={{
            fill: "color-mix(in srgb, var(--color-mint) 7%, transparent)",
            stroke: "color-mix(in srgb, var(--color-mint) 40%, transparent)",
          }}
        />
        <text
          x="52"
          y="50"
          textAnchor="middle"
          fontSize="15"
          fontWeight="500"
          className="fill-ink"
        >
          {copy.sealTop}
        </text>
        <text
          x="52"
          y="66"
          textAnchor="middle"
          fontSize="10.5"
          className="fill-ink-2"
        >
          {copy.sealBottom}
        </text>
        </svg>

        <p className="min-w-0 flex-1 text-pretty text-[13px] leading-[1.55] text-ink-2">
          {copy.body}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hair pt-4">
        <p className="text-[13px] font-medium text-ink">{copy.checkoutLine}</p>
        <div className="flex items-center gap-2.5 text-ink-2">
          <ApplePayMonoMark className="size-5" />
          <PayPalMonoMark className="size-5" />
          <VisaMark className="size-5" />
          <MastercardMonoMark className="size-5" />
          <AmexMonoMark className="size-5" />
        </div>
      </div>
    </div>
  );
}
