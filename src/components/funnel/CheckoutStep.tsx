// This screen is a design preview. Wire it to a real payment provider or remove it before the site goes public.
"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import {
  funnelCopy,
  plans,
  type BillingPeriod,
} from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from "./PaymentMethodSelector";
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
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");
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
      <p className="mx-auto mt-4 max-w-[350px] text-pretty text-center text-[16px] leading-[1.6] text-ink-2">
        {copy.body}
      </p>

      <form
        autoComplete="off"
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="mt-8"
      >
        <div className="rim rounded-card border border-hair bg-surface/65 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium text-muted">
                {copy.summaryLabel}
              </p>
              <h2 className="mt-2 text-[16px] font-medium text-ink">
                {plan.summaryName}
              </h2>
            </div>
            <button
              type="button"
              onClick={onChangePlan}
              className="min-h-11 shrink-0 px-1 text-[13px] font-medium text-blue transition-colors duration-150 hover:text-blue-soft motion-reduce:transition-none"
            >
              {copy.changePlan}
            </button>
          </div>
          <div className="mt-5 border-t border-hair pt-5">
            <p className="text-[25px] leading-none font-medium tracking-[-0.03em] text-ink">
              7 days free
            </p>
            <p className="mt-2.5 text-[13px] text-ink-2">
              {plan.summaryBilling}
            </p>
          </div>
        </div>

        <PaymentMethodSelector
          value={paymentMethod}
          onChange={setPaymentMethod}
          previewNoteId={previewNoteId}
        />

        <div className="mt-8 border-t border-hair pt-5">
          <PrimaryAction onClick={onTrial}>{copy.primary}</PrimaryAction>
          <p
            id={previewNoteId}
            className="mx-auto mt-3 max-w-[350px] text-pretty text-center text-[11px] leading-[1.5] text-muted"
          >
            {copy.preview}
          </p>
        </div>
      </form>
    </section>
  );
}
