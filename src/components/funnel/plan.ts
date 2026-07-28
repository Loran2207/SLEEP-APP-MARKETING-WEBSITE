import {
  funnelCopy,
  profileReadings,
  questionById,
  scoreBands,
} from "../../data/funnel.ts";

import { formatTime, parseTime } from "./time.ts";
import type {
  FunnelAnswers,
  InsightResult,
  PreviewCard,
  ProfileResult,
  ProfileTool,
  ScoreResult,
} from "./types.ts";

type Reading = {
  title: string;
  description: string;
};

type Schedule = {
  summary: string;
  windDown: string;
  lightsOut: string;
  wake: string;
};

function getChronotype(value?: string): Reading {
  if (!value) {
    return profileReadings.neutralChronotype;
  }

  const readings = profileReadings.chronotypes as Record<string, Reading>;
  return readings[value] ?? profileReadings.neutralChronotype;
}

function getSchedule(answers: FunnelAnswers): Schedule {
  const wakeMinutes = parseTime(answers["wake-time"]);
  const sleepHours = Number(answers["sleep-goal"]);

  if (
    wakeMinutes === undefined ||
    !Number.isInteger(sleepHours) ||
    sleepHours < 5 ||
    sleepHours > 11
  ) {
    return profileReadings.timelineFallback;
  }

  const lightsOutMinutes = wakeMinutes - sleepHours * 60;
  const windDown = formatTime(lightsOutMinutes - 60);

  return {
    summary: `Start winding down around ${windDown}`,
    windDown,
    lightsOut: formatTime(lightsOutMinutes),
    wake: formatTime(wakeMinutes),
  };
}

function hasRacingMind(answers: FunnelAnswers) {
  return (
    answers["racing-mind"] === "Often" ||
    answers["racing-mind"] === "Every single night" ||
    answers.want.includes("Calm a busy mind")
  );
}

function breathingReason(answers: FunnelAnswers) {
  const copy = profileReadings.tools.breathing;

  if (hasRacingMind(answers)) {
    return copy.racingMind;
  }

  return answers.want.includes("Fall asleep faster")
    ? copy.fallAsleep
    : copy.fallback;
}

function soundReason(answers: FunnelAnswers) {
  const wakes = answers["night-wakes"];

  return wakes && wakes !== "Almost never"
    ? profileReadings.tools.sound.waking
    : profileReadings.tools.sound.fallback;
}

function alarmReason(answers: FunnelAnswers) {
  const copy = profileReadings.tools.alarm;

  if (answers.want.includes("Build a routine that sticks")) {
    return copy.routine;
  }

  if (answers["wake-time"]) {
    return `${copy.wakePrefix}${answers["wake-time"]}${copy.wakeSuffix}`;
  }

  return copy.fallback;
}

export function buildNightInsight(answers: FunnelAnswers): InsightResult {
  const copy = funnelCopy.insightNight;
  const latency = copy.latency as Record<string, readonly [string, string]>;
  const wakes = copy.wakes as Record<string, readonly [string, string]>;
  const nightWakes = answers["night-wakes"];
  const reflection =
    (answers.latency && latency[answers.latency]) ||
    (nightWakes && wakes[nightWakes]) ||
    copy.fallback;

  return { reflection, action: copy.action };
}

export function buildRhythmInsight(answers: FunnelAnswers): InsightResult {
  const copy = funnelCopy.insightRhythm;
  const readings = copy.readings as Record<
    string,
    readonly [string, string]
  >;

  return {
    reflection:
      (answers.awake && readings[answers.awake]) || copy.fallback,
    action: copy.action,
  };
}

/**
 * The ten sleep questions the app scores, in the app's own order. Every option
 * list is ordered best to worst, so the option index is the app's 0-3 score.
 */
const SCORED_QUESTIONS = [
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
] as const;

const UNANSWERED_SCORE = 1.5;
const WORST_SCORE = 3;

export function buildScore(answers: FunnelAnswers): ScoreResult {
  const penalty = SCORED_QUESTIONS.reduce((total, id) => {
    const answer = answers[id];
    const index = answer
      ? questionById[id].options.findIndex(
          (option) => option.label === answer,
        )
      : -1;

    return total + (index < 0 ? UNANSWERED_SCORE : index);
  }, 0);

  const worst = SCORED_QUESTIONS.length * WORST_SCORE;
  const score = Math.round(100 * (1 - penalty / worst));
  const band =
    scoreBands.find((candidate) => score >= candidate.min) ??
    scoreBands[scoreBands.length - 1];

  return { score, band };
}

export function buildProfile(answers: FunnelAnswers): ProfileResult {
  const schedule = getSchedule(answers);
  const tools: readonly ProfileTool[] = [
    {
      name: profileReadings.tools.breathing.name,
      reason: breathingReason(answers),
      hue: "blue",
    },
    {
      name: profileReadings.tools.sound.name,
      reason: soundReason(answers),
      hue: "coral",
    },
    {
      name: profileReadings.tools.alarm.name,
      reason: alarmReason(answers),
      hue: "violet",
    },
  ];

  return {
    chronotype: getChronotype(answers.awake),
    age: answers.age,
    windDown: schedule.summary,
    timeline: {
      windDown: schedule.windDown,
      lightsOut: schedule.lightsOut,
      wake: schedule.wake,
    },
    tools,
  };
}

function previewCaption(
  id: PreviewCard["id"],
  answers: FunnelAnswers,
) {
  const copy = funnelCopy.preview;

  if (id === "breathing") {
    if (hasRacingMind(answers)) {
      return copy.breathing.racingMind;
    }

    return answers.latency === "20-40 minutes" ||
      answers.latency === "Over 40 minutes"
      ? copy.breathing.slowerStart
      : copy.breathing.fallback;
  }

  if (id === "sounds") {
    const wakes = answers["night-wakes"];

    if (wakes && wakes !== "Almost never") {
      return copy.sounds.wakes;
    }

    return answers.screens === "Most nights" ||
      answers.screens === "Always"
      ? copy.sounds.screen
      : copy.sounds.fallback;
  }

  if (answers["sleep-goal"] && answers["wake-time"]) {
    return `${copy.schedule.goalPrefix}${answers["sleep-goal"]}${copy.schedule.goalSuffix}${answers["wake-time"]}${copy.schedule.wakeSuffix}`;
  }

  return copy.schedule.fallback;
}

export function buildPreview(answers: FunnelAnswers): readonly PreviewCard[] {
  const cards: ReadonlyArray<{
    id: PreviewCard["id"];
    src: string;
    alt: string;
    hue: PreviewCard["hue"];
  }> = [
    {
      id: "breathing",
      src: "/app/practice-session.webp",
      alt: funnelCopy.preview.breathing.alt,
      hue: "blue",
    },
    {
      id: "sounds",
      src: "/app/sounds-player.webp",
      alt: funnelCopy.preview.sounds.alt,
      hue: "coral",
    },
    {
      id: "schedule",
      src: "/app/wind-down.webp",
      alt: funnelCopy.preview.schedule.alt,
      hue: "violet",
    },
  ];

  return cards.map((card) => ({
    ...card,
    caption: previewCaption(card.id, answers),
  }));
}
