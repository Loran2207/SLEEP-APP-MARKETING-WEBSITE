// This screen is a design preview. Wire it to a real payment provider or remove it before the site goes public.
"use client";

import Link from "next/link";

import { funnelCopy, plans, type BillingPeriod } from "@/data/funnel";

import { CardForm } from "./CardForm";
import { ExpressPay } from "./ExpressPay";
import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type CheckoutStepProps = {
  billing: BillingPeriod;
  onBack: () => void;
  onChangePlan: () => void;
  onTrial: () => void;
};

const previewNoteId = "checkout-design-preview-note";

// onChangePlan stays in the props type for Funnel.tsx; this screen mirrors the
// reference checkout, which has no plan-change link, so it is not rendered.
export function CheckoutStep({ billing, onBack, onTrial }: CheckoutStepProps) {
  const copy = funnelCopy.checkout;
  const plan = plans[billing];

  return (
    <section className="min-h-[100dvh] px-5 pb-[max(16px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <h1 className="mt-6 max-w-[320px] text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.headingBefore}
        <span className="text-blue">{copy.headingAccent}</span>
        {copy.headingAfter}
      </h1>

      <div className="rim mt-5 rounded-card border border-hair bg-surface/65 p-4">
        <p className="text-[12px] text-muted">{copy.summaryLabel}</p>

        <dl className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[14px] text-ink">{plan.summaryName}</dt>
            <dd className="shrink-0 text-[14px] font-medium text-ink tabular-nums">
              {plan.renewal}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[14px] text-ink">{copy.trialItem}</dt>
            <dd className="shrink-0 text-[14px] font-medium text-mint">
              {copy.freeValue}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-hair pt-1.5">
            <dt className="text-[14px] font-semibold text-ink">
              {copy.totalLabel}
            </dt>
            <dd className="shrink-0 text-[14px] font-semibold text-ink tabular-nums">
              {copy.totalValue}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-4">
        <ExpressPay />
      </div>

      <div className="my-4 flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-hair" />
        <span className="text-[12px] text-muted">{copy.cardDivider}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-hair" />
      </div>

      <form autoComplete="off" noValidate onSubmit={(event) => event.preventDefault()}>
        <CardForm previewNoteId={previewNoteId} />

        <div className="mt-3">
          <PrimaryAction onClick={onTrial}>{copy.primary}</PrimaryAction>
        </div>
      </form>

      <div className="mt-4 rounded-[14px] border border-hair bg-surface/45 px-4 py-3.5">
        {/* The TTT secure-checkout badge artwork, re-cut for the dark canvas. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/funnel/secure-checkout-badge.png"
          alt={copy.secure}
          className="h-auto w-full"
        />
      </div>

      <p className="mx-auto mt-3 max-w-[300px] text-pretty text-center text-[12px] leading-[1.55] text-muted">
        {copy.legalBefore}
        <Link href="/terms" className="font-medium text-blue">
          {copy.legalTerms}
        </Link>
        {copy.legalJoin}
        <Link href="/privacy" className="font-medium text-blue">
          {copy.legalPrivacy}
        </Link>
        {copy.legalAfter}
      </p>

      <p
        id={previewNoteId}
        className="mx-auto mt-2.5 max-w-[340px] text-pretty text-center text-[10.5px] leading-[1.5] text-faint"
      >
        {copy.preview}
      </p>
    </section>
  );
}
