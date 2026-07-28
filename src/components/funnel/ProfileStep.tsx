import {
  AlarmClock,
  AudioLines,
  Clock3,
  Sunrise,
  Wind,
} from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { NightTimeline } from "./NightTimeline";
import { PrimaryAction } from "./PrimaryAction";
import type { ProfileResult } from "./types";

type ProfileStepProps = {
  profile: ProfileResult;
  onPaywall: () => void;
  onFreePlan: () => void;
};

const toolIcons = [Wind, AudioLines, AlarmClock] as const;

export function ProfileStep({
  profile,
  onPaywall,
  onFreePlan,
}: ProfileStepProps) {
  const copy = funnelCopy.profile;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(48px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[250px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mx-auto mt-7 max-w-[380px] text-center"
      />

      <div className="mt-10">
        <GlassCard hue="mint" className="p-5">
          <div className="flex items-center gap-4">
            <Medallion hue="mint" size={48}>
              <Sunrise aria-hidden="true" size={19} strokeWidth={1.5} />
            </Medallion>
            <div>
              <h2 className="text-[18px] font-medium tracking-[-0.02em] text-ink">
                {profile.chronotype.title}
              </h2>
              <p className="mt-1 text-pretty text-[14px] leading-[1.55] text-ink-2">
                {profile.chronotype.description}
              </p>
              {profile.age ? (
                <p className="mt-3 border-t border-hair pt-3 text-[12px] leading-[1.45] text-muted">
                  {copy.ageLabel}:{" "}
                  <span className="text-ink-2">{profile.age}</span>
                </p>
              ) : null}
            </div>
          </div>
        </GlassCard>

        <div className="mt-4 flex items-center gap-3 rounded-card border border-hair bg-surface/72 px-5 py-4">
          <Clock3
            aria-hidden="true"
            size={19}
            strokeWidth={1.5}
            className="shrink-0 text-violet"
          />
          <p className="text-[15px] leading-[1.45] text-ink">
            {profile.windDown}
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-[15px] font-medium text-ink-2">
        {copy.timelineLabel}
      </h2>
      <div className="mt-4">
        <NightTimeline timeline={profile.timeline} />
      </div>

      <h2 className="mt-10 text-[15px] font-medium text-ink-2">
        {copy.toolsLabel}
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {profile.tools.map((tool, index) => {
          const Icon = toolIcons[index];

          return (
            <GlassCard key={tool.name} hue={tool.hue} className="p-5">
              <div className="flex items-start gap-4">
                <Medallion hue={tool.hue} size={44}>
                  <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                </Medallion>
                <div className="pt-0.5">
                  <h3 className="text-[15px] font-medium text-ink">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[14px] leading-[1.55] text-ink-2">
                    {tool.reason}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <PrimaryAction onClick={onPaywall}>{copy.primary}</PrimaryAction>
        <button
          type="button"
          onClick={onFreePlan}
          className="mt-4 min-h-11 px-4 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
        >
          {copy.secondary}
        </button>
      </div>
    </section>
  );
}
