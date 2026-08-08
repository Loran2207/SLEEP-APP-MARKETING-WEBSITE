"use client";

import { ComparisonStep } from "@/components/funnel/ComparisonStep";
import { MultiSelectStep } from "@/components/funnel/MultiSelectStep";
import { NameStep } from "@/components/funnel/NameStep";
import { ScaleStep } from "@/components/funnel/ScaleStep";
import { SingleSelectStep } from "@/components/funnel/SingleSelectStep";
import { SleepGoalStep } from "@/components/funnel/SleepGoalStep";
import { SocialProofStep } from "@/components/funnel/SocialProofStep";
import { WakeTimeStep } from "@/components/funnel/WakeTimeStep";
import { questionById } from "@/data/funnel";

const noop = () => {};

/**
 * A review board: every screen the layout pass touched, side by side, so the
 * whole set can be captured into Figma in one go instead of one capture per
 * screen. Not linked from anywhere and not indexed.
 */
export default function BoardPage() {
  const cells = [
    ["name", <NameStep key="n" value="" onChange={noop} onContinue={noop} onBack={noop} />],
    ["age", <SingleSelectStep key="a" question={questionById.age} onSelect={noop} onBack={noop} />],
    ["want", <MultiSelectStep key="w" question={questionById.want} selected={["Fall asleep faster"]} onToggle={noop} onContinue={noop} onBack={noop} />],
    ["social-proof", <SocialProofStep key="s" onContinue={noop} onBack={noop} />],
    ["rating", <SingleSelectStep key="r" question={questionById.rating} selected="Good" onSelect={noop} onBack={noop} />],
    ["habit-scale", <ScaleStep key="h" value={3} onSelect={noop} onContinue={noop} onBack={noop} />],
    ["comparison", <ComparisonStep key="c" onContinue={noop} onBack={noop} />],
    ["sleep-goal", <SleepGoalStep key="g" question={questionById["sleep-goal"]} selected="8 hours" onSelect={noop} onContinue={noop} onBack={noop} />],
    ["wake-time", <WakeTimeStep key="t" question={questionById["wake-time"]} value="07:00" sleepGoalHours={8} onChange={noop} onContinue={noop} onBack={noop} />],
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