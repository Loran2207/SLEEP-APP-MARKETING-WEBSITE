import {
  AlarmClock,
  AudioLines,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { AppScreenStack } from "./AppScreenStack";
import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";
import type { PreviewCard } from "./types";

type PreviewStepProps = {
  cards: readonly PreviewCard[];
  onContinue: () => void;
};

const icons: Record<PreviewCard["id"], LucideIcon> = {
  breathing: Wind,
  sounds: AudioLines,
  schedule: AlarmClock,
};

const iconColors: Record<PreviewCard["id"], string> = {
  breathing: "text-blue border-blue/30 bg-blue/10",
  sounds: "text-coral border-coral/30 bg-coral/10",
  schedule: "text-violet border-violet/30 bg-violet/10",
};

export function PreviewStep({ cards, onContinue }: PreviewStepProps) {
  const copy = funnelCopy.preview;
  const slots = {
    breathing: "center",
    sounds: "left",
    schedule: "right",
  } as const;
  const screens = cards.map((card) => ({
    src: card.src,
    alt: card.alt,
    hue: card.hue,
    slot: slots[card.id],
  }));

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(20px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mx-auto mt-6 max-w-[380px] text-center"
      />

      <div className="mt-auto pt-2">
        <AppScreenStack screens={screens} />
      </div>

      <div className="mt-1 flex flex-col gap-4">
        {cards.map((card) => {
          const Icon = icons[card.id];

          return (
            <div key={card.id} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`grid size-9 shrink-0 place-items-center rounded-[12px] border ${iconColors[card.id]}`}
              >
                <Icon size={16} strokeWidth={1.55} />
              </span>
              <p className="text-[13px] leading-[1.45] text-ink-2">
                {card.caption}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-7">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}
