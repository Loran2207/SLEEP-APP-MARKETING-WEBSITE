"use client";

import { AnalyzingStep } from "@/components/funnel/AnalyzingStep";
import { CheckoutStep } from "@/components/funnel/CheckoutStep";
import { ComparisonStep } from "@/components/funnel/ComparisonStep";
import { DoneStep } from "@/components/funnel/DoneStep";
import { PaywallStep } from "@/components/funnel/PaywallStep";
import { SocialProofStep } from "@/components/funnel/SocialProofStep";

const noop = () => {};

/**
 * A review board: every screen the current pass touched, side by side, so the
 * whole set can be captured into Figma in one go instead of one capture per
 * screen. Not linked from anywhere and not indexed.
 */
export default function BoardPage() {
  const cells = [
    ["comparison", <ComparisonStep key="cmp" onContinue={noop} onBack={noop} />],
    ["social-proof", <SocialProofStep key="s" onContinue={noop} onBack={noop} />],
    ["analyzing", <AnalyzingStep key="a" onComplete={noop} holdAt={362} />],
    ["paywall", <PaywallStep key="p" billing="yearly" onBillingChange={noop} onBack={noop} onTrial={noop} />],
    ["checkout", <CheckoutStep key="c" billing="yearly" onBack={noop} onChangePlan={noop} onTrial={noop} />],
    ["done", <DoneStep key="d" email="you@email.com" emailSaveStatus="saved" />],
  ] as const;

  return (
    <main id="main" className="flex items-start gap-[60px] bg-void p-[60px]">
      {cells.map(([id, node]) => (
        <div
          key={id}
          id={`board-${id}`}
          className="relative w-[430px] shrink-0 overflow-hidden bg-void"
        >
          {node}
        </div>
      ))}
    </main>
  );
}
