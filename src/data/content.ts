/**
 * Testimonial quotes are PLACEHOLDER content and must be replaced with real
 * reviews before launch.
 */

export const nav = {
  links: [
    { label: "Features", href: "#features" },
    { label: "Science", href: "#science" },
    { label: "Reviews", href: "#reviews" },
    { label: "How it works", href: "#how" },
  ],
  cta: "Get the app",
} as const;

export type NavLink = (typeof nav.links)[number];

export const hero = {
  eyebrow: "Your night, start to finish",
  heading: {
    before: "Wind down, drift off, wake up ",
    accent: "clear",
    after: "",
  },
  sub: "Your evening routine, sound mixer, breathing practice, sleep tracker and morning diary. One pure black app that never shouts at you.",
  primaryCta: "Get the app",
  secondaryCta: "See how it works",
  shot: "/app/home.webp",
  shotAlt:
    "The SLEEP app home screen, showing tonight's breathing and sounds tools, wind down cards and self-checks.",
  floatingCards: [
    { title: "Breathing", value: "2 sessions today", hue: "blue" },
    { title: "Sounds", value: "Rain, fire, flute", hue: "coral" },
    { title: "Tonight", value: "Alarm 06:30", hue: "violet" },
    { title: "Diary", value: "9 questions", hue: "mint" },
  ],
} as const;

export type FloatingCard = (typeof hero.floatingCards)[number];

export const trio = {
  heading: {
    before: "Three ways in, one ",
    accent: "night",
    after: "",
  },
  sub: "Start wherever you are tonight.",
  items: [
    {
      title: "Ready-made routines",
      body: "Pick a wind-down routine and it sets your alarm, breathing and sounds in two taps.",
      hue: "blue",
    },
    {
      title: "The science of sleep",
      body: "A 12-lesson course on how sleep actually works, written to be read in bed.",
      hue: "violet",
    },
    {
      title: "Self-checks that fit in a break",
      body: "Two-minute checks for chronotype, sleep need and anxiety, with results you can act on.",
      hue: "mint",
    },
  ],
} as const;

export type TrioItem = (typeof trio.items)[number];

export const features = {
  id: "features",
  heading: {
    before: "Everything the night ",
    accent: "asks for",
    after: "",
  },
  sub: "Four tools that hand off to each other, so you never have to think about the next step.",
  tabs: [
    {
      id: "track",
      label: "Track your night",
      title: "Start tracking in one tap",
      body: "Nap or full night. Put the phone face down beside you and the app takes it from there.",
      hue: "blue",
      shot: "/app/place-device.webp",
      shotAlt: "Setup screen asking you to place the phone beside the bed, with a glowing charge medallion",
    },
    {
      id: "winddown",
      label: "Wind down",
      title: "Set tonight before tonight arrives",
      body: "Toggle alarm, breathing and sounds for the evening ahead. The app remembers what worked.",
      hue: "blue",
      shot: "/app/wind-down.webp",
      shotAlt: "Wind-down routine settings screen",
    },
    {
      id: "sounds",
      label: "Sounds and breathing",
      title: "Mix your own quiet",
      body: "Layer rain, fire and flute at your own levels, set a stop timer, then run a guided 4-7-8 breathing session.",
      hue: "coral",
      shot: "/app/schedule-mix.webp",
      shotAlt: "Sound library with quick mixes and sound icon grid",
    },
    {
      id: "diary",
      label: "Morning diary",
      title: "Answer while it is still fresh",
      body: "Log mood and a note the moment you wake up, then let the diary fill in the rest of the picture.",
      hue: "mint",
      shot: "/app/wakeup-survey.webp",
      shotAlt: "Morning wake-up survey screen",
    },
  ],
} as const;

export type FeatureTab = (typeof features.tabs)[number];

export const stats = {
  heading: {
    before: "Small app, ",
    accent: "real",
    after: " substance",
  },
  items: [
    {
      value: "12",
      label: "lessons",
      body: "A full course on the science of sleep, one short lesson at a time.",
    },
    {
      value: "4-7-8",
      label: "breathing",
      body: "The guided pattern that slows you down before bed, with a live session timer.",
    },
    {
      value: "9",
      label: "diary questions",
      body: "A morning check-in that takes under a minute and builds a real record.",
    },
  ],
} as const;

export type StatItem = (typeof stats.items)[number];

/**
 * These testimonial quotes are PLACEHOLDER content and must be replaced with
 * real reviews before launch.
 */
export const testimonials = {
  id: "reviews",
  heading: {
    before: "What people say after a ",
    accent: "week",
    after: "",
  },
  items: [
    {
      quote:
        "The wind-down screen is the only part of my evening I actually keep to.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
    {
      quote:
        "I stopped reaching for my phone in bed because the sound mixer gave me something else to do.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
    {
      quote:
        "Answering the morning questions takes a minute and I finally see a pattern.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
    {
      quote:
        "The breathing session is short enough that I do not talk myself out of it.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
    {
      quote: "It is the first sleep app that does not glow at me.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
    {
      quote: "The course reads like someone explaining, not selling.",
      name: "Placeholder name",
      role: "Placeholder role",
    },
  ],
} as const;

export type Testimonial = (typeof testimonials.items)[number];

export const benefits = {
  id: "science",
  heading: {
    before: "Everything your night needs, ",
    accent: "nothing",
    after: " it does not",
  },
  sub: "The quiet features that do the actual work.",
  shot: "/app/home.webp",
  items: [
    {
      title: "Block distracting apps",
      body: "Mute the apps that keep you scrolling, from thirty minutes before bed.",
      hue: "mint",
    },
    {
      title: "Night Shift",
      body: "Warm your screen after sunset so the light stops arguing with your body clock.",
      hue: "violet",
    },
    {
      title: "Sounds that stop themselves",
      body: "Set a stop timer and the mix fades out on its own, long after you are asleep.",
      hue: "coral",
    },
  ],
} as const;

export type BenefitItem = (typeof benefits.items)[number];

export const how = {
  id: "how",
  heading: {
    before: "Easy to ",
    accent: "start",
    after: "",
  },
  steps: [
    {
      n: "01",
      title: "Set tonight in two taps",
      body: "Choose alarm, breathing and sounds once. Tonight is ready.",
      shot: "/app/wind-down.webp",
      objectPosition: "50% 8%",
    },
    {
      n: "02",
      title: "Put the phone down",
      body: "Start tracking, place the phone face down and let the sounds do their work.",
      shot: "/app/tracking-active.webp",
      objectPosition: "50% 19%",
    },
    {
      n: "03",
      title: "Answer three questions",
      body: "Log mood and a note in the morning. The diary builds the rest.",
      shot: "/app/wakeup-survey.webp",
      objectPosition: "50% 9%",
    },
  ],
  cta: "Get the app",
} as const;

export type HowStep = (typeof how.steps)[number];

export const faq = {
  items: [
    {
      q: "Is SLEEP free?",
      a: "The core routine, sound mixer and breathing practice are free to use. The course and the deeper diary history sit behind a subscription.",
    },
    {
      q: "Does it need to stay open all night?",
      a: "Yes. Start tracking, put the phone face down beside you and leave the app open. Nothing is recorded or uploaded.",
    },
    {
      q: "Will it keep me awake?",
      a: "The whole app is pure black with no bright surfaces, and Night Shift warms the screen after sunset.",
    },
    {
      q: "What is 4-7-8 breathing?",
      a: "Breathe in for four counts, hold for seven, out for eight. It is a short, guided pattern that slows your heart rate before bed.",
    },
    {
      q: "Do I need an account?",
      a: "You sign in with your email and a six-digit code. There are no passwords anywhere in the app.",
    },
  ],
} as const;

export type FaqItem = (typeof faq.items)[number];

export const finalCta = {
  heading: {
    before: "Tonight can be ",
    accent: "different",
    after: "",
  },
  sub: "Set your routine once and let the evening run itself.",
  cta: "Get the app",
  newsletterTitle: "Notes on sleeping better",
  newsletterBody:
    "An occasional letter on wind-down habits, light and rest. No noise.",
  newsletterPlaceholder: "you@email.com",
  newsletterCta: "Subscribe",
} as const;

export const footer = {
  tagline: "A calmer end to the day.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how" },
        { label: "Reviews", href: "#reviews" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
        { label: "Contact", href: "mailto:hello@sleepapp.com" },
      ],
    },
  ],
  brand: "SLEEP",
} as const;

export type FooterColumn = (typeof footer.columns)[number];
export type FooterLink = FooterColumn["links"][number];
