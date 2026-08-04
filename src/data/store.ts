// The App Store screenshot set.
//
// Every frame is 1290x2796 - the size App Store Connect asks for on the 6.9"
// iPhone slot, and the one it also accepts for 6.7". Exporting a frame at 1x
// from Figma gives a file Apple takes without resizing.
//
// Headline and sub are written as explicit lines, never as one string left to
// wrap. A wrapped line is what breaks the Figma transfer: the exporter
// measures it badly and prints both lines on top of each other.

export type ShotHue = "blue" | "coral" | "mint" | "violet";

export type ShotLine = {
  before?: string;
  accent?: string;
  after?: string;
};

export type StoreShot = {
  id: string;
  /** Small label above the headline. */
  eyebrow: string;
  /** One entry per visual line. `accent` is set in the italic serif. */
  headline: readonly ShotLine[];
  /** One entry per visual line. Omitted where the pills say it already. */
  sub?: readonly string[];
  hue: ShotHue;
  /** The app screen behind the phone glass. */
  screen: string;
  screenAlt: string;
  /** Screens fanned behind the main one, left and right. */
  behind?: readonly { src: string; alt: string }[];
  /** Feature list, first frame only. */
  pills?: readonly string[];
};

export const storeShots: readonly StoreShot[] = [
  {
    id: "01-all-in-one",
    eyebrow: "All in one",
    headline: [{ before: "Your whole night," }, { accent: "handled" }],
    hue: "violet",
    screen: "/store/screen-home.webp",
    screenAlt: "The SLEEP home screen with tonight's tools",
    pills: [
      "Alarm",
      "Sound mixer",
      "4-7-8 breathing",
      "Sleep tracking",
      "Morning diary",
      "Sleep course",
    ],
  },
  {
    id: "02-alarm",
    eyebrow: "Alarm",
    headline: [{ before: "Wake up to a sound" }, { before: "you ", accent: "chose" }],
    sub: ["Set the alarm, see how much sleep it leaves you,", "and pick what plays you out."],
    hue: "blue",
    screen: "/app/wind-down.webp",
    screenAlt: "Tonight: alarm at 06:30, breathing and sounds",
  },
  {
    id: "03-breathing",
    eyebrow: "Breathing practice",
    headline: [{ before: "Breathe the day" }, { accent: "out" }],
    sub: ["4-7-8, eight guided cycles.", "The circle counts, you just follow it."],
    hue: "blue",
    screen: "/app/practice-session.webp",
    screenAlt: "A 4-7-8 breathing session in progress",
  },
  {
    id: "04-sounds",
    eyebrow: "Sounds",
    headline: [{ before: "Fall asleep to" }, { before: "your own ", accent: "mix" }],
    sub: ["Layer rain, campfire, waves and chimes,", "then let a timer fade them out."],
    hue: "coral",
    screen: "/app/sounds-player.webp",
    screenAlt: "A mix of rain, campfire and flute with volume sliders",
  },
  {
    id: "05-tracking",
    eyebrow: "Sleep tracking",
    headline: [{ before: "Put the phone down." }, { before: "The night ", accent: "runs itself" }],
    sub: ["Bedtime, alarm and the sound timer,", "on one screen that holds until morning."],
    hue: "violet",
    screen: "/app/tracking-active.webp",
    screenAlt: "Tracking a night: 22:00, alarm at 07:00, sounds stop in 30 minutes",
  },
  {
    id: "06-morning",
    eyebrow: "Morning diary",
    headline: [{ before: "A check-in that" }, { before: "takes ", accent: "seconds" }],
    sub: ["Place how you feel on the grid, add a thought,", "and the week starts to make sense."],
    hue: "mint",
    screen: "/app/wakeup-survey.webp",
    screenAlt: "The morning mood grid set to happy",
  },
  {
    id: "07-course",
    eyebrow: "Sleep course",
    headline: [{ before: "The science of sleep," }, { before: "in ", accent: "twelve lessons" }],
    sub: ["Two minutes each. Light, caffeine, sleep pressure,", "and what actually fixes a bad week."],
    hue: "coral",
    screen: "/app/course.webp",
    screenAlt: "The sleep course with twelve short lessons",
  },
  {
    id: "08-black",
    eyebrow: "Made for the dark",
    headline: [{ before: "Pure black." }, { before: "Nothing that ", accent: "shouts" }],
    sub: ["No ads, no streaks,", "no bright white screen at two in the morning."],
    hue: "blue",
    screen: "/store/screen-home.webp",
    screenAlt: "The SLEEP home screen",
    behind: [
      { src: "/app/practice-session.webp", alt: "A breathing session" },
      { src: "/app/sounds-player.webp", alt: "The sound mixer" },
    ],
  },
];