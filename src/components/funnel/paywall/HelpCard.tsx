import { Mail } from "lucide-react";

import { paywallCopy } from "@/data/paywall";

/** The help card, pointing at the address the legal pages already use. */
export function HelpCard() {
  const copy = paywallCopy.help;

  return (
    <div className="rim flex items-center justify-between gap-4 rounded-card border border-hair bg-surface/65 p-5">
      <div className="min-w-0">
        <h2 className="text-[16px] font-medium tracking-[-0.01em] text-ink">
          {copy.title}
        </h2>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-2">
          {copy.lead}
          <a
            href={`mailto:${copy.email}`}
            className="text-blue transition-colors hover:text-ink motion-reduce:transition-none"
          >
            {copy.email}
          </a>
        </p>
      </div>
      <Mail
        aria-hidden="true"
        size={22}
        strokeWidth={1.5}
        className="shrink-0 text-muted"
      />
    </div>
  );
}
