import assert from "node:assert/strict";
import test from "node:test";

import {
  funnelCopy,
  funnelStepIds,
  plans,
  questionStepIds,
  questions,
} from "../../data/funnel.ts";
import {
  buildNightInsight,
  buildPreview,
  buildProfile,
  buildRhythmInsight,
} from "./plan.ts";
import {
  getNextStep,
  getPreviousStep,
  getQuestionProgress,
  normalizeStep,
} from "./registry.ts";
import type { FunnelAnswers } from "./types.ts";

const completeAnswers = {
  age: "35-44",
  identity: "Prefer not to say",
  awake: "Afternoon",
  want: ["Calm a busy mind", "Sleep through the night"],
  rating: "So-so",
  latency: "20-40 minutes",
  "night-wakes": "Most nights",
  "early-wake": "Sometimes",
  "racing-mind": "Often",
  screens: "Most nights",
  caffeine: "Sometimes",
  consistency: "Rarely",
  ritual: "Not really",
  daytime: "Dips often",
  "sleep-goal": "8",
  "wake-time": "07:30",
  "bedtime-nudge": "Yes, remind me",
} as unknown as FunnelAnswers;

const expectedQuestions = [
  ["age", "How old are you?", ["Under 18", "18-24", "25-34", "35-44", "45-54", "55 or older"]],
  ["identity", "Which best describes you?", ["Female", "Male", "Non-binary", "Prefer not to say"]],
  ["awake", "When do you naturally feel most awake?", ["Early morning", "Mid-morning", "Afternoon", "Evening", "Late at night"]],
  ["want", "What do you want from night?", ["Fall asleep faster", "Wake up with energy", "Calm a busy mind", "Sleep through the night", "Build a routine that sticks"]],
  ["rating", "How would you rate your sleep lately?", ["Great", "Good", "So-so", "Poor"]],
  ["latency", "How long does it take you to fall asleep?", ["Under 10 minutes", "10-20 minutes", "20-40 minutes", "Over 40 minutes"]],
  ["night-wakes", "Do you wake up during the night?", ["Almost never", "A few times a week", "Most nights", "Every night"]],
  ["early-wake", "Do you wake earlier than you'd like and can't drift back?", ["Rarely", "Sometimes", "Often", "Most days"]],
  ["racing-mind", "Is your mind racing when you try to sleep?", ["No, I drift off", "A little", "Often", "Every single night"]],
  ["screens", "Phone or screens in the last hour before bed?", ["Almost never", "Sometimes", "Most nights", "Always"]],
  ["caffeine", "Caffeine in the afternoon or evening?", ["Never", "Rarely", "Sometimes", "Most days"]],
  ["consistency", "Same bedtime and wake time each day?", ["Always", "Mostly", "Rarely", "Never"]],
  ["ritual", "Do you have a wind-down ritual before bed?", ["Yes, a solid one", "Sometimes", "Not really", "None at all"]],
  ["daytime", "How is your energy during the day?", ["Strong all day", "Mostly fine", "Dips often", "Tired constantly"]],
  ["sleep-goal", "How much sleep do you want each night?", ["5", "6", "7", "8", "9", "10", "11"]],
  ["wake-time", "What time do you want to wake up?", []],
  ["bedtime-nudge", "Want a bedtime nudge?", ["Yes, remind me", "Not right now"]],
] as const;

function optionLabel(option: unknown) {
  return typeof option === "string"
    ? option
    : (option as { label: string }).label;
}

test("normalizes missing and unknown steps to welcome", () => {
  assert.equal(normalizeStep(undefined), "welcome");
  assert.equal(normalizeStep("not-a-step"), "welcome");
  assert.equal(normalizeStep("email"), "email");
});

test("keeps the app questions verbatim and in app order", () => {
  assert.deepEqual(questionStepIds, expectedQuestions.map(([id]) => id));
  assert.deepEqual(
    questions.map((question) => [
      question.id,
      question.title,
      question.options.map(optionLabel),
    ]),
    expectedQuestions,
  );
});

test("keeps every goal explanation from the app", () => {
  const want = questions.find((question) => question.id === "want");
  const explanations = want?.options.map((option) =>
    typeof option === "string"
      ? undefined
      : (option as { expand?: string }).expand,
  );

  assert.deepEqual(explanations, [
    "We'll lead with wind-down breathing and soundscapes to quiet the body so sleep comes sooner.",
    "A steady schedule and a smart wake window leave you sharper in the morning.",
    "Breathing practices and a quick journal ease the racing thoughts that keep you up.",
    "Better sleep hygiene means fewer wake-ups and deeper, unbroken rest.",
    "Gentle habits and reminders turn a few good nights into a lasting rhythm.",
  ]);
});

test("keeps all deep links unique and progress limited to 17 questions", () => {
  assert.equal(funnelStepIds.length, 28);
  assert.equal(new Set(funnelStepIds).size, 28);
  assert.deepEqual(getQuestionProgress("night-wakes"), {
    current: 7,
    total: 17,
    ratio: 7 / 17,
  });
  assert.deepEqual(getQuestionProgress("bedtime-nudge"), {
    current: 17,
    total: 17,
    ratio: 1,
  });
});

test("places email immediately before paywall", () => {
  assert.equal(getPreviousStep("email"), "preview");
  assert.equal(getNextStep("email"), "paywall");
  assert.equal(getPreviousStep("paywall"), "email");
});

test("keeps the approved yearly and monthly offer exact", () => {
  assert.equal(plans.yearly.price, "$3.99 / month");
  assert.equal(plans.yearly.billing, "$47.88 billed once a year");
  assert.equal(plans.monthly.price, "$9.99 / month");
  assert.equal(plans.monthly.billing, "Billed every month");
});

test("derives the profile and timeline only from app answers", () => {
  const profile = buildProfile(completeAnswers);

  assert.equal(profile.chronotype.title, "Balanced");
  assert.equal(profile.windDown, "Start winding down around 22:30");
  assert.equal(profile.age, "35-44");
  assert.deepEqual(profile.timeline, {
    windDown: "22:30",
    lightsOut: "23:30",
    wake: "07:30",
  });
});

test("reflects waking and racing-mind answers in plan tools", () => {
  const profile = buildProfile(completeAnswers);

  assert.match(profile.tools[0].reason, /racing mind/i);
  assert.match(profile.tools[1].reason, /wake at night/i);
});

test("reflects only the answers the visitor supplied", () => {
  const night = buildNightInsight(completeAnswers);
  const rhythm = buildRhythmInsight(completeAnswers);

  assert.match(night.reflection[0], /20 to 40 minutes/i);
  assert.match(rhythm.reflection[0], /afternoon/i);
});

test("ties the three preview screens to the completed answers", () => {
  const preview = buildPreview(completeAnswers);

  assert.equal(preview.length, 3);
  assert.match(preview[0].caption, /racing mind/i);
  assert.match(preview[1].caption, /wake at night/i);
  assert.match(preview[2].caption, /07:30/i);
});

test("keeps the email failure and download ending honest", () => {
  assert.equal(
    funnelCopy.email.unavailable,
    "We could not save it just now, you can still continue",
  );
  assert.equal(funnelCopy.done.headingAccent, "ready");
  assert.deepEqual(
    funnelCopy.done.stores.map((store) => store.name),
    ["App Store", "Google Play"],
  );
  assert.equal(
    funnelCopy.done.storeNote,
    "Links open the store once the app is published.",
  );
  assert.equal(
    funnelCopy.done.answersUnavailable,
    "Your answers could not be attached to your email yet, so SLEEP may ask them again",
  );
});
