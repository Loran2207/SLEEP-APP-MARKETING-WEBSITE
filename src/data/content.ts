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
      id: "breathing",
      label: "Breathing practice",
      title: "Breathe until the body lets go",
      body: "A guided 4-7-8 session. In for four, hold for seven, out for eight, eight rounds. The screen stays dark the whole way through.",
      hue: "blue",
      shot: "/app/practice-session.webp",
      shotAlt: "Guided 4-7-8 breathing session with a glowing circle and inhale, hold and exhale timings",
    },
    {
      id: "sounds",
      label: "White noise before sleep",
      title: "Pick the sound that switches you off",
      body: "Rain, thunder, ocean, campfire, white and brown noise. Layer a few into a mix, save it, and let it fade out once you are asleep.",
      hue: "coral",
      shot: "/app/sounds-player.webp",
      shotAlt: "Sound player with a glowing coral orb, a mix of three sounds and a fade-out timer",
    },
    {
      id: "alarm",
      label: "Alarm",
      title: "Set the morning, then forget it",
      body: "Choose the wake time and the app shows how much sleep it leaves you. The evening routine runs first, and the sounds stop on their own timer.",
      hue: "blue",
      shot: "/app/wind-down.webp",
      shotAlt: "Tonight screen with the alarm set to 06:30 and the evening routine below it",
    },
    {
      id: "diary",
      label: "Sleep diary",
      title: "Answer while it is still fresh",
      body: "Log mood and a note the moment you wake up, then let the diary fill in the rest of the picture.",
      hue: "mint",
      shot: "/app/wakeup-survey.webp",
      shotAlt: "Morning check-in with a glowing mood face and a grid from sad to happy, low to high energy",
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
 * SAMPLE CONTENT. These six people do not exist and none of these quotes was
 * written by a real user. They are here so the design reads like the finished
 * page instead of a wireframe.
 *
 * REPLACE EVERY ONE OF THEM WITH A REAL, ATTRIBUTABLE REVIEW BEFORE THIS SITE
 * IS PUBLIC. Shipping invented testimonials under invented names would mislead
 * the people reading them, and in most markets it is also illegal.
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
        "The wind-down screen is the only part of my evening I actually keep to. Everything else I tried lasted about four days.",
      name: "Dana Whitfield",
      role: "Pediatric nurse, Portland",
    },
    {
      quote:
        "I stopped reaching for my phone in bed because the sound mixer gave my hands something else to do.",
      name: "Marcus Reyes",
      role: "Software engineer, Austin",
    },
    {
      quote:
        "Three questions in the morning take about a minute. Two weeks in, the diary showed me a pattern I would never have spotted on my own.",
      name: "Alison Park",
      role: "Graduate student, Ann Arbor",
    },
    {
      quote:
        "The breathing session is short enough that I do not talk myself out of it at midnight.",
      name: "Terrence Boyd",
      role: "High school teacher, Atlanta",
    },
    {
      quote:
        "It is the first sleep app that does not glow at me. Black screen, no badges, nothing asking for attention.",
      name: "Nina Kowalczyk",
      role: "Freelance illustrator, Chicago",
    },
    {
      quote:
        "The course reads like someone explaining, not selling. I actually finished it.",
      name: "Greg Sandoval",
      role: "Long-haul driver, Phoenix",
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
  sub: "The parts of the app that do the actual work, at night and during the day.",
  shot: "/app/home.webp",
  items: [
    {
      title: "Breathing and sound at any hour",
      body: "The 4-7-8 practice and the whole sound library are not only for bedtime. Use them to concentrate in the afternoon or to come down after a hard day.",
      hue: "blue",
    },
    {
      title: "Self-checks that explain you",
      body: "Four two-minute tests cover chronotype, sleep need, sleep quality and anxiety. Each one ends with a plain reading of where you actually stand.",
      hue: "violet",
    },
    {
      title: "Advice that improves recovery",
      body: "Twelve short lessons on what genuinely moves sleep quality, written to be read in bed and finished in about two minutes.",
      hue: "mint",
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
      objectPosition: "50% 40%",
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
