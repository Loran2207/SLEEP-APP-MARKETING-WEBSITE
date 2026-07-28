import type { FunnelHue, QuestionStepId } from "../../data/funnel.ts";

export type FunnelAnswers = {
  age?: string;
  identity?: string;
  awake?: string;
  want: string[];
  rating?: string;
  latency?: string;
  "night-wakes"?: string;
  "early-wake"?: string;
  "racing-mind"?: string;
  screens?: string;
  caffeine?: string;
  consistency?: string;
  ritual?: string;
  daytime?: string;
  "sleep-goal"?: string;
  "wake-time"?: string;
  "bedtime-nudge"?: string;
};

export type ProfileTool = {
  name: string;
  reason: string;
  hue: Extract<FunnelHue, "blue" | "coral" | "violet">;
};

export type ProfileResult = {
  chronotype: {
    title: string;
    description: string;
  };
  age?: string;
  windDown: string;
  timeline: {
    windDown: string;
    lightsOut: string;
    wake: string;
  };
  tools: readonly ProfileTool[];
};

export type ScoreBand = {
  tag: string;
  title: string;
  body: string;
  hue: FunnelHue;
};

export type ScoreResult = {
  score: number;
  band: ScoreBand;
};

export type InsightResult = {
  reflection: readonly [string, string];
  action: string;
};

export type PreviewCard = {
  id: "breathing" | "sounds" | "schedule";
  src: string;
  alt: string;
  caption: string;
  hue: Extract<FunnelHue, "blue" | "coral" | "violet">;
};

export type AnswerValue = FunnelAnswers[QuestionStepId];
