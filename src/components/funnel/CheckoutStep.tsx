// This screen is a design preview. Wire it to a real payment provider or remove it before the site goes public.
"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

import {
  AmexMark,
  ApplePayMonoMark,
  MastercardMark,
  PayPalMonoMark,
  VisaMark,
} from "@/components/brand/marks";
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

export function CheckoutStep({
  billing,
  onBack,
  onChangePlan,
  onTrial,
}: CheckoutStepProps) {
  const copy = funnelCopy.checkout;
  const plan = plans[billing];

  return (
    <section className="min-h-[100dvh] px-5 pb-[max(16px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <h1 className="mx-auto mt-6 max-w-[320px] text-balance text-center text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.headingBefore}
        <span className="text-blue">{copy.headingAccent}</span>
        {copy.headingAfter}
      </h1>

      <div className="rim mt-5 rounded-card border border-hair bg-surface/65 p-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[12px] text-muted">{copy.summaryLabel}</p>
          <button
            type="button"
            onClick={onChangePlan}
            className="shrink-0 text-[12px] font-medium text-blue transition-colors duration-150 hover:text-blue-soft motion-reduce:transition-none"
          >
            {copy.changePlan}
          </button>
        </div>

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

      <div className="mt-4">
        <p className="flex items-center justify-center gap-2 text-[12px] text-ink-2">
          <Lock aria-hidden="true" size={13} strokeWidth={1.8} />
          {copy.secure}
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-3.5 text-ink-2">
          <VisaMark className="h-[16px] w-auto" />
          <MastercardMark className="h-[17px] w-auto" />
          <AmexMark className="h-[17px] w-auto" />
          <span aria-hidden="true" className="h-4 w-px bg-hair" />
          <ApplePayMonoMark className="h-[14px] w-auto" />
          <PayPalMonoMark className="h-[14px] w-auto" />
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-[1.5] text-muted">
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

      <p className="mt-2 text-pretty text-center text-[11px] leading-[1.5] text-faint">
        {copy.finePrintBefore}
        <span className="text-ink-2">{plan.renewal}</span>
        {copy.finePrintAfter}
      </p>

      <p
        id={previewNoteId}
        className="mx-auto mt-2.5 max-w-[340px] text-pretty text-center text-[11px] leading-[1.5] text-muted"
      >
        {copy.preview}
      </p>
    </section>
  );
}
