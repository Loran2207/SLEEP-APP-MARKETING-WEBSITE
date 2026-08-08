"use client";

import { useEffect, useState } from "react";
import { funnelCopy, plans, type BillingPeriod } from "@/data/funnel";
import { paywallCopy } from "@/data/paywall";

import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";
import { BillingConditions } from "./paywall/BillingConditions";
import { FeatureList } from "./paywall/FeatureList";
import { GuaranteeCard } from "./paywall/GuaranteeCard";
import { HelpCard } from "./paywall/HelpCard";
import { NowAfterBlock } from "./paywall/NowAfterBlock";
import { PlanCard } from "./paywall/PlanCard";
import { PlanReadyCard } from "./paywall/PlanReadyCard";
import { ProgressChartCard } from "./paywall/ProgressChartCard";
import { ResultsBlock } from "./paywall/ResultsBlock";
import { ReviewsBlock } from "./paywall/ReviewsBlock";
import { SocialProofBand } from "./paywall/SocialProofBand";

type PaywallStepProps = {
  billing: BillingPeriod;
  onBillingChange: (period: BillingPeriod) => void;
  onBack: () => void;
  onTrial: () => void;
};

/** Rest AI opens its countdown at 09:51; ours does the same and holds at zero. */
const COUNTDOWN_START_SECONDS = 9 * 60 + 51;

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * The long-scroll paywall, block for block the Rest AI page with this
 * product's content. One scroll column, inline calls to action, no sticky bar.
 */
export function PaywallStep({
  billing,
  onBillingChange,
  onBack,
  onTrial,
}: PaywallStepProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START_SECONDS);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdown = formatCountdown(secondsLeft);

  return (
    <section className="min-h-[100dvh] px-5 pb-[max(56px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <h1 className="mt-6 max-w-[330px] text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {paywallCopy.header.headingBefore}
        <span className="text-blue">{paywallCopy.header.headingAccent}</span>
        {paywallCopy.header.headingAfter}
      </h1>
      <p className="mt-3 max-w-[330px] text-[14px] leading-[1.55] text-ink-2">
        {paywallCopy.header.sub}
      </p>

      <div className="mt-8">
        <ProgressChartCard />
      </div>

      <div className="mt-4">
        <PlanReadyCard countdown={countdown} onTrial={onTrial} />
      </div>

      <div className="mt-10">
        <FeatureList />
      </div>

      <div className="mt-10">
        <PlanCard
          billing={billing}
          onBillingChange={onBillingChange}
          onTrial={onTrial}
          countdown={countdown}
        />
      </div>

      <p className="mt-4 text-pretty text-[11px] leading-[1.55] text-faint">
        {funnelCopy.checkout.finePrintBefore}
        {plans[billing].renewal}
        {funnelCopy.checkout.finePrintAfter}
      </p>

      <div className="mt-10">
        <SocialProofBand />
      </div>

      <div className="mt-10">
        <ReviewsBlock />
      </div>

      <div className="mt-8">
        <PrimaryAction onClick={onTrial}>{paywallCopy.cta}</PrimaryAction>
      </div>

      <div className="mt-10">
        <GuaranteeCard />
      </div>

      <div className="mt-10">
        <NowAfterBlock />
      </div>

      <div className="mt-10">
        <ResultsBlock />
      </div>

      <div className="mt-8">
        <PrimaryAction onClick={onTrial}>{paywallCopy.cta}</PrimaryAction>
      </div>
      <p className="mt-3 text-[12px] text-muted">
        {paywallCopy.closing.iphoneOnly}
      </p>

      <div className="mt-10">
        <HelpCard />
      </div>

      <div className="mt-8">
        <BillingConditions billing={billing} />
      </div>
    </section>
  );
}
