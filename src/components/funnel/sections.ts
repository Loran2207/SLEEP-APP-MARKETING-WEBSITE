import type { FunnelStepId } from "@/data/funnel";

/**
 * The three parts the app's onboarding is divided into. The funnel shows them
 * the way Rest AI shows its sections: a dotted bar split into segments, with a
 * check where a segment is finished, and a header naming the part you are in.
 */
export type FunnelSection = {
  id: "about" | "sleep" | "targets";
  title: string;
  body: string;
  icon: "person" | "moon" | "target";
  steps: readonly FunnelStepId[];
};

export const funnelSections: readonly FunnelSection[] = [
  {
    id: "about",
    title: "About you",
    body: "Your answers shape the tools you get.",
    icon: "person",
    steps: ["age", "identity", "awake", "want"],
  },
  {
    id: "sleep",
    title: "Your sleep",
    body: "How your nights run right now.",
    icon: "moon",
    steps: [
      "rating",
      "latency",
      "night-wakes",
      "early-wake",
      "racing-mind",
      "screens",
      "caffeine",
      "consistency",
      "ritual",
      "daytime",
    ],
  },
  {
    id: "targets",
    title: "Your targets",
    body: "The night we are aiming for.",
    icon: "target",
    steps: ["sleep-goal", "wake-time", "bedtime-nudge"],
  },
];

export type SectionProgress = {
  section: FunnelSection;
  /** 1-based position inside the section. */
  position: number;
  sectionIndex: number;
};

export function getSectionProgress(step: FunnelStepId): SectionProgress | null {
  for (let i = 0; i < funnelSections.length; i += 1) {
    const section = funnelSections[i];
    const position = section.steps.indexOf(step);
    if (position >= 0) {
      return { section, position: position + 1, sectionIndex: i };
    }
  }
  return null;
}