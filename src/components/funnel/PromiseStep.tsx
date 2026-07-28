import {
  Activity,
  Check,
  MoonStar,
  type LucideIcon,
} from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy, type FunnelHue } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { PrimaryAction } from "./PrimaryAction";

type PromiseStepProps = {
  onContinue: () => void;
};

const icons: Record<string, LucideIcon> = {
  rhythm: Activity,
  wind: MoonStar,
  keep: Check,
};

export function PromiseStep({ onContinue }: PromiseStepProps) {
  const copy = funnelCopy.promise;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(48px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[280px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="max-w-[390px]"
        />

        <div className="mt-11 flex w-full max-w-[310px] flex-col gap-5 text-left">
          {copy.lines.map((line) => {
            const Icon = icons[line.icon];

            return (
              <div key={line.text} className="flex items-center gap-4">
                <Medallion hue={line.hue as FunnelHue} size={30}>
                  <Icon aria-hidden="true" size={13} strokeWidth={1.7} />
                </Medallion>
                <p className="text-[16px] leading-[1.45] text-ink">
                  {line.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
    </section>
  );
}
