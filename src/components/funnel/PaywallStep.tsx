"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlarmClock,
  ArrowLeft,
  AudioLines,
  BarChart3,
  BookHeart,
  CalendarRange,
  Check,
  ChevronDown,
  Cloud,
  Wind,
} from "lucide-react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import {
  funnelCopy,
  paywallFaq,
  plans,
  sleepPlusFeatures,
  type BillingPeriod,
  type FunnelHue,
} from "@/data/funnel";
import { cn } from "@/lib/utils";

import { AccentHeading } from "./AccentHeading";
import { PlanSelector } from "./PlanSelector";
import { PrimaryAction } from "./PrimaryAction";

type PaywallStepProps = {
  billing: BillingPeriod;
  onBillingChange: (period: BillingPeriod) => void;
  onBack: () => void;
  onTrial: () => void;
};

const featureIcons = {
  analytics: BarChart3,
  alarm: AlarmClock,
  sound: AudioLines,
  wind: Wind,
  journal: BookHeart,
  schedule: CalendarRange,
  cloud: Cloud,
} as const;

const hueColors: Record<FunnelHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

export function PaywallStep({
  billing,
  onBillingChange,
  onBack,
  onTrial,
}: PaywallStepProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const copy = funnelCopy.paywall;
  const plan = plans[billing];

  return (
    <section className="min-h-[100dvh] px-5 pt-[max(18px,env(safe-area-inset-top))]">
      <header className="flex items-center gap-3">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="grid size-11 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
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
      <p className="mx-auto mt-4 max-w-[340px] text-pretty text-center text-[16px] leading-[1.6] text-ink-2">
        {copy.body}
      </p>

      <PlanSelector
        value={billing}
        onChange={onBillingChange}
        label={copy.planLabel}
      />

      <h2 className="mt-10 text-[17px] font-medium tracking-[-0.02em] text-ink">
        {copy.includedLabel}
      </h2>
      <ul className="mt-4">
        {sleepPlusFeatures.map((feature) => {
          const Icon = featureIcons[feature.icon];
          const color = hueColors[feature.hue];

          return (
            <li
              key={feature.title}
              className="flex items-center gap-4 border-b border-hair py-4 first:border-t"
            >
              <span
                aria-hidden="true"
                className="rim grid size-11 shrink-0 place-items-center rounded-[14px] border"
                style={{
                  color,
                  borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${color} 12%, var(--color-surface))`,
                }}
              >
                <Icon size={18} strokeWidth={1.55} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-ink-2">
                  {feature.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="rim mt-9 rounded-card border border-hair bg-surface/72 px-5 py-4 text-pretty text-[14px] leading-[1.55] text-ink-2">
        {copy.freePlan}
      </p>

      <div className="mt-10">
        {paywallFaq.map((item, index) => {
          const open = openFaq === index;
          const triggerId = `paywall-faq-trigger-${index}`;
          const panelId = `paywall-faq-panel-${index}`;

          return (
            <div
              key={item.question}
              className="border-t border-hair last:border-b"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() =>
                  setOpenFaq((current) => (current === index ? null : index))
                }
                className="flex min-h-15 w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-ink"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none",
                    open && "rotate-180",
                  )}
                />
              </button>
              {open ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="pb-5"
                >
                  <p className="max-w-[350px] text-[14px] leading-[1.55] text-ink-2">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-center gap-3 text-[11px] leading-[1.4] text-faint">
        <Link href="/terms" className="transition-colors hover:text-ink-2">
          Terms
        </Link>
        <span aria-hidden="true">.</span>
        <Link href="/privacy" className="transition-colors hover:text-ink-2">
          Privacy
        </Link>
      </div>

      <div className="h-6" />

      <div className="sticky bottom-0 -mx-5 border-t border-hair bg-[rgba(0,0,0,0.94)] px-5 pt-4 pb-[max(16px,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {copy.trust.map((item) => (
            <span
              key={item}
              className="flex items-start justify-center gap-1 text-center text-[10px] leading-[1.35] text-muted"
            >
              <Check
                aria-hidden="true"
                size={11}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-mint"
              />
              {item}
            </span>
          ))}
        </div>
        <PrimaryAction onClick={onTrial}>{copy.primary}</PrimaryAction>
        <p
          aria-live="polite"
          className="mt-2.5 text-center text-[11px] leading-[1.4] text-muted"
        >
          {plan.finePrint}
        </p>
      </div>
    </section>
  );
}
