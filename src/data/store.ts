// The App Store screenshot set.
//
// Four frames, the four things the brief asks the listing to show: the app as
// a whole, the alarm, the breathing practice, the sounds.
//
// Every frame is 1290x2796 - the size App Store Connect asks for on the 6.9"
// iPhone slot, and the one it also accepts for 6.7". Exporting a frame at 1x
// from Figma gives a file Apple takes without resizing.
//
// Headline lines are written out one by one, never as one string left to wrap.
// A wrapped line is what breaks the Figma transfer: the exporter measures it
// badly and prints both lines on top of each other.
//
// Review 2026-08-17 (Artem): the small spaced label above the headline and the
// grey line under it do not read at thumbnail size, so both are gone from every
// frame. The first frame lost its phone as well and lists the features instead.

export type ShotHue = "blue" | "coral" | "mint" | "violet";

/** The four glyphs drawn for the feature list, in the app's own hand. */
export type FeatureGlyph = "alarm" | "breath" | "sounds" | "diary";

export type StoreFeature = {
  glyph: FeatureGlyph;
  hue: ShotHue;
  /** The name the app itself gives the feature. */
  name: string;
  /** Taken from the app's own copy, split into lines the same way headlines are. */
  body: readonly string[];
};

export type StoreShot = {
  id: string;
  /** One entry per visual line. One typeface throughout, never italic. */
  headline: readonly string[];
  /** Index of the headline line lit in the frame's accent, if any. */
  accentLine?: number;
  hue: ShotHue;
  /** The app screen behind the phone glass. Absent on the feature frame. */
  screen?: string;
  screenAlt?: string;
  /** The feature list, first frame only. */
  features?: readonly StoreFeature[];
};

export const storeShots: readonly StoreShot[] = [
  {
    id: "01-all-in-one",
    headline: ["All in one", "app for", "sleep"],
    accentLine: 2,
    hue: "violet",
    features: [
      {
        glyph: "alarm",
        hue: "blue",
        name: "Alarm",
        body: ["Set the wake time and see", "the sleep it leaves you."],
      },
      {
        glyph: "breath",
        hue: "violet",
        name: "Breathing practice",
        body: ["Slow 4-7-8 sessions that settle", "your nervous system."],
      },
      {
        glyph: "sounds",
        hue: "coral",
        name: "Sounds",
        body: ["Layer rain, waves and fire", "into your own sleep mix."],
      },
      {
        glyph: "diary",
        hue: "mint",
        name: "Sleep diary",
        body: ["Track mood and nights", "to see what truly helps."],
      },
    ],
  },
  {
    id: "02-alarm",
    headline: ["Wake up to a sound", "you chose"],
    hue: "blue",
    screen: "/app/wind-down.webp",
    screenAlt: "Tonight: alarm at 06:30, breathing and sounds",
  },
  {
    id: "03-breathing",
    headline: ["Breathe out", "the day"],
    hue: "blue",
    // Shot again for the store: the landing page's copy of this screen caught
    // the pre-roll countdown, where the circle holds a bare digit. This one is
    // mid-inhale, with the phase, the count and the hint all on screen.
    screen: "/store/screen-breathing.webp",
    screenAlt: "A 4-7-8 breathing session mid-inhale",
  },
  {
    id: "04-sounds",
    headline: ["Fall asleep to", "your own mix"],
    hue: "coral",
    screen: "/app/sounds-player.webp",
    screenAlt: "A mix of rain, campfire and flute with volume sliders",
  },
];
