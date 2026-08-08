// This screen is a design preview. Wire it to a real payment provider or remove it before the site goes public.
"use client";

import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

import {
  AmexMark,
  ApplePayMonoMark,
  MastercardMark,
  PayPalMonoMark,
  VisaMark,
} from "@/components/brand/marks";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy, plans, type BillingPeriod } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { CardForm } from "./CardForm";
import { ExpressPay } from "./ExpressPay";
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
    <section className="min-h-[100dvh] px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <header className="flex items-center gap-3">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="grid size-11 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink active:text-ink motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" size={21} strokeWidth={1.6} />
        </button>
        <div className="min-w-0 flex-1">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
        </div>
        <span aria-hidden="true" className="size-11 shrink-0" />
      </header>

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mx-auto mt-8 max-w-[390px] text-center"
      />

      <div className="rim mt-8 rounded-card border border-hair bg-surface/65 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[13px] text-muted">{copy.summaryLabel}</p>
          <button
            type="button"
            onClick={onChangePlan}
            className="shrink-0 text-[13px] font-medium text-blue transition-colors duration-150 hover:text-blue-soft motion-reduce:transition-none"
          >
            {copy.changePlan}
          </button>
        </div>

        <dl className="mt-2 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[15px] text-ink">{plan.summaryName}</dt>
            <dd className="shrink-0 text-[15px] font-medium text-ink tabular-nums">
              {plan.renewal}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[15px] text-ink">{copy.trialItem}</dt>
            <dd className="shrink-0 text-[15px] font-medium text-mint">
              {copy.freeValue}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-hair pt-2">
            <dt className="text-[15px] font-semibold text-ink">
              {copy.totalLabel}
            </dt>
            <dd className="shrink-0 text-[15px] font-semibold text-ink tabular-nums">
              {copy.totalValue}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6">
        <ExpressPay />
      </div>

      <div className="my-[18px] flex items-center gap-3">
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

      <div className="mt-[26px]">
        <p className="flex items-center justify-center gap-2 text-[12px] text-ink-2">
          <Lock aria-hidden="true" size={13} strokeWidth={1.8} />
          {copy.secure}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3.5 text-ink-2">
          <VisaMark className="h-[17px] w-auto" />
          <MastercardMark className="h-[18px] w-auto" />
          <AmexMark className="h-[18px] w-auto" />
          <span aria-hidden="true" className="h-4 w-px bg-hair" />
          <ApplePayMonoMark className="h-[15px] w-auto" />
          <PayPalMonoMark className="h-[15px] w-auto" />
        </div>
      </div>

      <p className="mt-[14px] text-center text-[12px] leading-[18px] text-muted">
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

      <p className="mt-3 text-pretty text-center text-[11px] leading-[1.55] text-muted">
        {copy.finePrintBefore}
        <span className="text-ink-2">{plan.renewal}</span>
        {copy.finePrintAfter}
      </p>

      <p
        id={previewNoteId}
        className="mx-auto mt-4 max-w-[350px] text-pretty text-center text-[11px] leading-[1.5] text-muted"
      >
        {copy.preview}
      </p>
    </section>
  );
}