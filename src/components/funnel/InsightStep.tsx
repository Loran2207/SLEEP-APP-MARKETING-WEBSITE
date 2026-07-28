import { MoonStar, Sunrise } from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { PrimaryAction } from "./PrimaryAction";
import type { InsightResult } from "./types";

type InsightStepProps = {
  kind: "night" | "rhythm";
  insight: InsightResult;
  onContinue: () => void;
};

export function InsightStep({
  kind,
  insight,
  onContinue,
}: InsightStepProps) {
  const copy =
    kind === "night" ? funnelCopy.insightNight : funnelCopy.insightRhythm;
  const Icon = kind === "night" ? MoonStar : Sunrise;
  const hue = kind === "night" ? "blue" : "violet";

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(48px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[260px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
        <Medallion hue={hue} size={66}>
          <Icon aria-hidden="true" size={24} strokeWidth={1.45} />
        </Medallion>

        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="mt-9 max-w-[380px]"
        />

        <div className="mt-7 max-w-[350px] text-pretty">
          {insight.reflection.map((line) => (
            <p
              key={line}
              className="mt-2 text-[16px] leading-[1.58] text-ink-2 first:mt-0"
            >
              {line}
            </p>
          ))}
          <p className="mt-6 text-[16px] leading-[1.58] text-ink">
            {insight.action}
          </p>
        </div>
      </div>

      <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
    </section>
  );
}
