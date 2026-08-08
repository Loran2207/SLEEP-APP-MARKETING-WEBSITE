import Link from "next/link";

import { plans, type BillingPeriod } from "@/data/funnel";
import { paywallCopy } from "@/data/paywall";

/**
 * The closing bullet list, composed from the honest lines the funnel already
 * commits to: the trial length, the renewal price of the selected plan, and
 * that cancelling is one tap.
 */
export function BillingConditions({ billing }: { billing: BillingPeriod }) {
  const copy = paywallCopy.billing;
  const bullets = [
    copy.trialBullet,
    `${copy.renewalBefore}${plans[billing].renewal}${copy.renewalAfter}`,
    copy.cancelBullet,
  ];

  return (
    <ul className="flex flex-col gap-2.5">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex gap-2.5 text-[12px] leading-[1.55] text-muted"
        >
          <span
            aria-hidden="true"
            className="mt-[7px] size-1 shrink-0 rounded-full bg-faint"
          />
          {bullet}
        </li>
      ))}
      <li className="flex gap-2.5 text-[12px] leading-[1.55] text-muted">
        <span
          aria-hidden="true"
          className="mt-[7px] size-1 shrink-0 rounded-full bg-faint"
        />
        <span>
          {copy.legalBefore}
          <Link
            href="/terms"
            className="text-ink-2 transition-colors hover:text-ink motion-reduce:transition-none"
          >
            {copy.legalTerms}
          </Link>
          {copy.legalJoin}
          <Link
            href="/privacy"
            className="text-ink-2 transition-colors hover:text-ink motion-reduce:transition-none"
          >
            {copy.legalPrivacy}
          </Link>
          {copy.legalAfter}
        </span>
      </li>
    </ul>
  );
}
