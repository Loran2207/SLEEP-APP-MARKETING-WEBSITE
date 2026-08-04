// The App Store screenshot set.
//
// Four frames, the four things the brief asks the listing to show: the app as
// a whole, the alarm, the breathing practice, the sounds.
//
// Every frame is 1290x2796 - the size App Store Connect asks for on the 6.9"
// iPhone slot, and the one it also accepts for 6.7". Exporting a frame at 1x
// from Figma gives a file Apple takes without resizing.
//
// Headline and sub are written as explicit lines, never as one string left to
// wrap. A wrapped line is what breaks the Figma transfer: the exporter
// measures it badly and prints both lines on top of each other.

export type ShotHue = "blue" | "coral" | "mint" | "violet";

export type StoreShot = {
  id: string;
  /** Small label above the headline. */
  eyebrow: string;
  /** One entry per visual line. One typeface, no accent word. */
  headline: readonly string[];
  /** One entry per visual line. Omitted where the pills say it already. */
  sub?: readonly string[];
  hue: ShotHue;
  /** The app screen behind the phone glass. */
  screen: string;
  screenAlt: string;
  /** Feature list, first frame only. */
  pills?: readonly string[];
};

export const storeShots: readonly StoreShot[] = [
  {
    id: "01-all-in-one",
    eyebrow: "All in one",
    headline: ["Your whole night,", "in one app"],
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
    headline: ["Wake up to a sound", "you chose"],
    sub: ["Set the alarm, see how much sleep it leaves you,", "and pick what plays you out."],
    hue: "blue",
    screen: "/app/wind-down.webp",
    screenAlt: "Tonight: alarm at 06:30, breathing and sounds",
  },
  {
    id: "03-breathing",
    eyebrow: "Breathing practice",
    headline: ["Breathe out", "the day"],
    sub: ["4-7-8, eight guided cycles.", "The circle counts, you just follow it."],
    hue: "blue",
    screen: "/app/practice-session.webp",
    screenAlt: "A 4-7-8 breathing session in progress",
  },
  {
    id: "04-sounds",
    eyebrow: "Sounds",
    headline: ["Fall asleep to", "your own mix"],
    sub: ["Layer rain, campfire, waves and chimes,", "then let a timer fade them out."],
    hue: "coral",
    screen: "/app/sounds-player.webp",
    screenAlt: "A mix of rain, campfire and flute with volume sliders",
  },
];