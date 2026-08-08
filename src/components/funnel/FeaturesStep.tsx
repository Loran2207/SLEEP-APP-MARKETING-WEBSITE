import {
  AlarmClock,
  AudioLines,
  GraduationCap,
  NotebookPen,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { GlassCard } from "@/components/primitives/GlassCard";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type FeaturesStepProps = {
  onContinue: () => void;
};

const icons: readonly LucideIcon[] = [
  Wind,
  AudioLines,
  NotebookPen,
  GraduationCap,
  AlarmClock,
];

/** The app's "Everything for a better night" screen. */
export function FeaturesStep({ onContinue }: FeaturesStepProps) {
  const copy = funnelCopy.features;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mt-6 max-w-[360px]"
      />
      <p className="mt-3 max-w-[340px] text-[15px] leading-[1.5] text-ink-2">
        {copy.body}
      </p>

      <ul className="mt-7 flex flex-col gap-3">
        {copy.items.map((item, index) => {
          const Icon = icons[index];

          return (
            <li key={item.title}>
              <GlassCard hue={item.hue} className="p-4">
                <div className="flex items-center gap-3.5">
                  <Medallion hue={item.hue} size={44}>
                    <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                  </Medallion>
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-medium text-ink">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-pretty text-[13px] leading-[1.45] text-ink-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}