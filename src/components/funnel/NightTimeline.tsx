import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import type { ProfileResult } from "./types";

type NightTimelineProps = {
  timeline: ProfileResult["timeline"];
};

const marks = [
  { key: "windDown", color: "bg-violet", align: "text-left" },
  { key: "lightsOut", color: "bg-blue", align: "text-center" },
  { key: "wake", color: "bg-coral", align: "text-right" },
] as const;

export function NightTimeline({ timeline }: NightTimelineProps) {
  const labels = funnelCopy.profile.timelineMarks;

  return (
    <div
      role="img"
      aria-label={`${labels[0]} ${timeline.windDown}. ${labels[1]} ${timeline.lightsOut}. ${labels[2]} ${timeline.wake}.`}
      className="rounded-card border border-hair bg-surface/72 px-4 py-5"
    >
      <div className="grid grid-cols-3 gap-2">
        {marks.map((mark, index) => (
          <div key={mark.key} className={mark.align}>
            <p className="text-[10px] leading-[1.35] text-muted">
              {labels[index]}
            </p>
            <p className="mt-1 text-[12px] leading-[1.35] font-medium text-ink">
              {timeline[mark.key]}
            </p>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="relative mt-5 grid h-4 grid-cols-3">
        <span className="absolute top-[7px] right-[8%] left-[8%] h-px bg-hair-strong" />
        {marks.map((mark, index) => (
          <span
            key={mark.key}
            className={cn(
              "relative z-10 size-3 rounded-full border-2 border-void ring-1 ring-white/16",
              mark.color,
              index === 0 && "justify-self-start",
              index === 1 && "justify-self-center",
              index === 2 && "justify-self-end",
            )}
          />
        ))}
      </div>
    </div>
  );
}
