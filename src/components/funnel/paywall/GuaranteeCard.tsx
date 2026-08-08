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
    <div className="rim rounded-card border border-hair bg-surface/65 p-6 text-center">
      <svg
        viewBox="0 0 104 104"
        className="mx-auto size-[104px]"
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

      <p className="mx-auto mt-4 max-w-[320px] text-pretty text-[14px] leading-[1.55] text-ink-2">
        {copy.body}
      </p>

      <p className="mt-6 text-[13px] font-medium text-ink">
        {copy.checkoutLine}
      </p>
      <div className="mt-3.5 flex items-center justify-center gap-4 text-ink-2">
        <ApplePayMonoMark className="size-6" />
        <PayPalMonoMark className="size-6" />
        <VisaMark className="size-6" />
        <MastercardMonoMark className="size-6" />
        <AmexMonoMark className="size-6" />
      </div>
    </div>
  );
}
