export type FunnelHue = "blue" | "coral" | "mint" | "violet";
export type BillingPeriod = "yearly" | "monthly";

export type QuestionStepId =
  | "age"
  | "identity"
  | "awake"
  | "want"
  | "rating"
  | "latency"
  | "night-wakes"
  | "early-wake"
  | "racing-mind"
  | "screens"
  | "caffeine"
  | "consistency"
  | "ritual"
  | "daytime"
  | "sleep-goal"
  | "wake-time"
  | "bedtime-nudge";

export type FunnelStepId =
  | "welcome"
  | "promise"
  | QuestionStepId
  | "insight-night"
  | "insight-rhythm"
  | "analyzing"
  | "score"
  | "profile"
  | "preview"
  | "email"
  | "paywall"
  | "checkout"
  | "done";

export type QuestionOption = {
  label: string;
  description?: string;
  expand?: string;
};

export type QuestionDefinition = {
  id: QuestionStepId;
  title: string;
  accentWord: string;
  options: readonly QuestionOption[];
  hue: FunnelHue;
  kind: "single" | "multi" | "sleep-goal" | "time";
  helper?: string;
  inputLabel?: string;
};

export const funnelStepIds: readonly FunnelStepId[] = [
  "welcome",
  "promise",
  "age",
  "identity",
  "awake",
  "want",
  "insight-rhythm",
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
  "insight-night",
  "sleep-goal",
  "wake-time",
  "bedtime-nudge",
  "analyzing",
  "score",
  "profile",
  "preview",
  "email",
  "paywall",
  "checkout",
  "done",
];

export const questionStepIds: readonly QuestionStepId[] = [
  "age",
  "identity",
  "awake",
  "want",
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
  "sleep-goal",
  "wake-time",
  "bedtime-nudge",
];

export const questions: readonly QuestionDefinition[] = [
  {
    id: "age",
    title: "How old are you?",
    accentWord: "old",
    helper: "Sleep needs shift with age - this helps us set the right target.",
    options: [
      { label: "Under 18" },
      { label: "18-24" },
      { label: "25-34" },
      { label: "35-44" },
      { label: "45-54" },
      { label: "55 or older" },
    ],
    hue: "coral",
    kind: "single",
  },
  {
    id: "identity",
    title: "Which best describes you?",
    accentWord: "describes",
    options: [
      { label: "Female" },
      { label: "Male" },
      { label: "Non-binary" },
      { label: "Prefer not to say" },
    ],
    hue: "coral",
    kind: "single",
  },
  {
    id: "awake",
    title: "When do you naturally feel most awake?",
    accentWord: "awake",
    helper: "Your body clock shapes the best moment to wind down.",
    options: [
      { label: "Early morning" },
      { label: "Mid-morning" },
      { label: "Afternoon" },
      { label: "Evening" },
      { label: "Late at night" },
    ],
    hue: "coral",
    kind: "single",
  },
  {
    id: "want",
    title: "What do you want from night?",
    accentWord: "night",
    helper: "Pick everything that matters - we'll tailor your tools to match.",
    options: [
      {
        label: "Fall asleep faster",
        expand:
          "We'll lead with wind-down breathing and soundscapes to quiet the body so sleep comes sooner.",
      },
      {
        label: "Wake up with energy",
        expand:
          "A steady schedule and a smart wake window leave you sharper in the morning.",
      },
      {
        label: "Calm a busy mind",
        expand:
          "Breathing practices and a quick journal ease the racing thoughts that keep you up.",
      },
      {
        label: "Sleep through the night",
        expand:
          "Better sleep hygiene means fewer wake-ups and deeper, unbroken rest.",
      },
      {
        label: "Build a routine that sticks",
        expand:
          "Gentle habits and reminders turn a few good nights into a lasting rhythm.",
      },
    ],
    hue: "violet",
    kind: "multi",
  },
  {
    id: "rating",
    title: "How would you rate your sleep lately?",
    accentWord: "sleep",
    options: [
      { label: "Great" },
      { label: "Good" },
      { label: "So-so" },
      { label: "Poor" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "latency",
    title: "How long does it take you to fall asleep?",
    accentWord: "asleep",
    options: [
      { label: "Under 10 minutes" },
      { label: "10-20 minutes" },
      { label: "20-40 minutes" },
      { label: "Over 40 minutes" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "night-wakes",
    title: "Do you wake up during the night?",
    accentWord: "night",
    options: [
      { label: "Almost never" },
      { label: "A few times a week" },
      { label: "Most nights" },
      { label: "Every night" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "early-wake",
    title: "Do you wake earlier than you'd like and can't drift back?",
    accentWord: "drift",
    options: [
      { label: "Rarely" },
      { label: "Sometimes" },
      { label: "Often" },
      { label: "Most days" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "racing-mind",
    title: "Is your mind racing when you try to sleep?",
    accentWord: "racing",
    options: [
      { label: "No, I drift off" },
      { label: "A little" },
      { label: "Often" },
      { label: "Every single night" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "screens",
    title: "Phone or screens in the last hour before bed?",
    accentWord: "screens",
    options: [
      { label: "Almost never" },
      { label: "Sometimes" },
      { label: "Most nights" },
      { label: "Always" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "caffeine",
    title: "Caffeine in the afternoon or evening?",
    accentWord: "Caffeine",
    options: [
      { label: "Never" },
      { label: "Rarely" },
      { label: "Sometimes" },
      { label: "Most days" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "consistency",
    title: "Same bedtime and wake time each day?",
    accentWord: "bedtime",
    options: [
      { label: "Always" },
      { label: "Mostly" },
      { label: "Rarely" },
      { label: "Never" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "ritual",
    title: "Do you have a wind-down ritual before bed?",
    accentWord: "ritual",
    options: [
      { label: "Yes, a solid one" },
      { label: "Sometimes" },
      { label: "Not really" },
      { label: "None at all" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "daytime",
    title: "How is your energy during the day?",
    accentWord: "energy",
    options: [
      { label: "Strong all day" },
      { label: "Mostly fine" },
      { label: "Dips often" },
      { label: "Tired constantly" },
    ],
    hue: "blue",
    kind: "single",
  },
  {
    id: "sleep-goal",
    title: "How much sleep do you want each night?",
    accentWord: "sleep",
    helper: "7 to 9 hours suits most adults. You can change this anytime.",
    options: [
      { label: "5" },
      { label: "6" },
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "10" },
      { label: "11" },
    ],
    hue: "mint",
    kind: "sleep-goal",
  },
  {
    id: "wake-time",
    title: "What time do you want to wake up?",
    accentWord: "wake",
    helper: "We'll build your schedule and alarm around this.",
    inputLabel: "Wake time",
    options: [],
    hue: "mint",
    kind: "time",
  },
  {
    id: "bedtime-nudge",
    title: "Want a bedtime nudge?",
    accentWord: "nudge",
    options: [
      {
        label: "Yes, remind me",
        description: "A gentle nudge when it's time to wind down.",
      },
      {
        label: "Not right now",
        description: "You can turn this on later in settings.",
      },
    ],
    hue: "mint",
    kind: "single",
  },
];

export const questionById = Object.fromEntries(
  questions.map((question) => [question.id, question]),
) as Record<QuestionStepId, QuestionDefinition>;

export const funnelCopy = {
  welcome: {
    eyebrow: "Sleep",
    headingBefore: "A calmer path to ",
    headingAccent: "better",
    headingAfter: " sleep",
    body: "Tell us what your nights feel like. Sleep will shape a plan that fits.",
    screens: {
      home: "The Sleep home screen with tonight's tools",
      practice: "The 4-7-8 breathing practice in Sleep",
      sounds: "The sound player with a coral audio control in Sleep",
    },
    primary: "Start",
    timing: "About two minutes. No account needed.",
  },
  promise: {
    eyebrow: "Before we begin",
    headingBefore: "A few honest answers, then a plan for ",
    headingAccent: "tonight",
    headingAfter: "",
    lines: [
      { text: "We read your rhythm", icon: "rhythm", hue: "blue" },
      { text: "We shape your wind-down", icon: "wind", hue: "violet" },
      { text: "You keep what works", icon: "keep", hue: "mint" },
    ],
    primary: "Continue",
  },
  insightNight: {
    eyebrow: "Your night",
    headingBefore: "A pattern worth ",
    headingAccent: "noticing",
    headingAfter: "",
    primary: "Keep going",
    latency: {
      "20-40 minutes": [
        "Falling asleep takes you 20 to 40 minutes.",
        "That gap is exactly what a wind-down is for.",
      ],
      "Over 40 minutes": [
        "Falling asleep takes you over 40 minutes.",
        "Your wind-down needs to begin before your head reaches the pillow.",
      ],
    },
    wakes: {
      "A few times a week": [
        "You wake during the night a few times a week.",
        "A consistent sound and wake routine can make that moment feel less abrupt.",
      ],
      "Most nights": [
        "You wake during most nights.",
        "The room and routine should feel the same each time you wake.",
      ],
      "Every night": [
        "You wake during the night every night.",
        "Tonight's plan should keep every cue calm and consistent.",
      ],
    },
    fallback: [
      "Your answers give the night its shape.",
      "That is enough to build a simple first routine.",
    ],
    action:
      "Sleep keeps your wind-down, fading sounds and wake alarm in one evening plan.",
  },
  insightRhythm: {
    eyebrow: "Your rhythm",
    headingBefore: "Your timing has a ",
    headingAccent: "shape",
    headingAfter: "",
    primary: "Continue",
    readings: {
      "Early morning": [
        "You naturally feel most awake in the early morning.",
        "Your plan can protect that early rhythm with a steady evening handoff.",
      ],
      "Mid-morning": [
        "You naturally feel most awake in the mid-morning.",
        "Your plan can ease down without pushing the evening too far forward.",
      ],
      Afternoon: [
        "You naturally feel most awake in the afternoon.",
        "Your rhythm sits near the middle, with room for a consistent wind-down.",
      ],
      Evening: [
        "You naturally feel most awake in the evening.",
        "Your plan should ease down later instead of forcing an early night.",
      ],
      "Late at night": [
        "You naturally feel most awake late at night.",
        "Your rhythm runs late, so the shift toward sleep needs a clear cue.",
      ],
    },
    fallback: [
      "When you feel most awake gives the plan its starting rhythm.",
      "The first routine stays flexible until you choose one.",
    ],
    action:
      "Sleep keeps the wind-down tied to the rhythm and wake time you choose.",
  },
  analyzing: {
    eyebrow: "Your evening",
    title: "Building a quieter plan",
    lines: [
      "Reading your rhythm",
      "Calibrating your wind-down",
      "Choosing your sounds",
      "Fine-tuning your alarm",
    ],
    announcement: "Your sleep plan is ready.",
  },
  score: {
    eyebrow: "Your sleep score",
    lead: "Based on your answers, your sleep quality is",
    outOf: "out of 100",
    primary: "See my plan",
  },
  profile: {
    eyebrow: "Your rhythm",
    headingBefore: "Your plan for ",
    headingAccent: "tonight",
    headingAfter: "",
    ageLabel: "Age range",
    timelineLabel: "Your night timeline",
    timelineMarks: ["Wind-down start", "Lights out", "Wake window"],
    toolsLabel: "Three tools for tonight",
    primary: "See Sleep+",
    secondary: "Continue with the free plan",
  },
  preview: {
    eyebrow: "Tonight's plan",
    headingBefore: "Your first ",
    headingAccent: "night",
    headingAfter: "",
    primary: "See Sleep+",
    breathing: {
      alt: "The 4-7-8 breathing practice in Sleep",
      racingMind: "A 4-7-8 practice for the racing mind you named.",
      slowerStart: "A 4-7-8 practice to begin your wind-down before bed.",
      fallback: "A short breathing practice to mark the end of the day.",
    },
    sounds: {
      alt: "The sound mixer in Sleep",
      wakes: "A consistent sound mix for the moments you wake at night.",
      screen: "A sound cue for the last hour you usually spend on a screen.",
      fallback: "A sound mix that fades after you settle.",
    },
    schedule: {
      alt: "The evening routine and alarm in Sleep",
      goalPrefix: "Your ",
      goalSuffix: "-hour sleep target and ",
      wakeSuffix: " wake time, kept together in one routine.",
      fallback: "Your evening routine and wake alarm, kept together.",
    },
  },
  email: {
    eyebrow: "Keep your setup",
    headingBefore: "Save your plan to your ",
    headingAccent: "inbox",
    headingAfter: "",
    body: "Enter the email you will use in the app. Your answers are saved to it, so SLEEP opens already set up and you never answer these questions again.",
    label: "Email address",
    placeholder: "you@email.com",
    invalid: "Enter a valid email address.",
    unavailable: "We could not save it just now, you can still continue",
    savesLabel: "Saved to this email",
    saves: [
      "Every answer you just gave",
      "Your wind-down and wake schedule",
      "Your sleep score",
    ],
    primary: "Save my plan",
    saving: "Saving...",
    skip: "Skip for now",
  },
  paywall: {
    eyebrow: "Sleep+",
    headingBefore: "Everything the night ",
    headingAccent: "asks",
    headingAfter: " for",
    body: "Seven days free, then keep the parts that work.",
    planLabel: "Choose your plan",
    includedLabel: "What's included",
    freePlan:
      "Free keeps the wind-down routine, the core sound mixer, 4-7-8 breathing and the morning diary.",
    trust: ["Cancel anytime", "Private by default", "No card charged today"],
    primary: "Start 7-day free trial",
  },
  checkout: {
    eyebrow: "Sleep+",
    headingBefore: "Complete your ",
    headingAccent: "checkout",
    headingAfter: "",
    summaryLabel: "Order summary",
    changePlan: "Change plan",
    trialItem: "7-day free trial",
    freeValue: "Free",
    totalLabel: "Total today",
    totalValue: "$0.00",
    cardDivider: "or pay with card",
    secure: "Guaranteed safe and secure checkout",
    methods: {
      applePay: "Apple Pay",
      card: "Card",
      paypal: "PayPal",
    },
    providerLines: {
      applePay: "Apple Pay opens here once payments are live.",
      paypal: "PayPal opens here once payments are live.",
    },
    fields: {
      number: {
        label: "Card number",
        placeholder: "0000 0000 0000 0000",
      },
      expiry: {
        label: "Expiry",
        placeholder: "MM / YY",
      },
      security: {
        label: "Security code",
        placeholder: "3 digits",
      },
      name: {
        label: "Name on card",
        placeholder: "Full name",
      },
    },
    primary: "Start free trial",
    legalBefore: "By starting the trial you agree to our ",
    legalTerms: "Terms",
    legalJoin: " and ",
    legalPrivacy: "Privacy policy",
    legalAfter: ".",
    finePrintBefore:
      "Nothing is charged today. Your seven days start now and Sleep+ continues at ",
    finePrintAfter:
      " unless you cancel at least 24 hours before the trial ends. You can cancel anytime in your account settings.",
    preview:
      "Design preview. No payment is taken and no card details are stored.",
  },
  done: {
    eyebrow: "Your setup",
    headingBefore: "Your plan is ",
    headingAccent: "ready",
    headingAfter: "",
    download: "Download SLEEP on iPhone",
    signInPrefix: "Sign in with ",
    signInFallback: "Sign in with the email you used here",
    answers:
      "Your answers are already there, tonight's routine is set",
    answersUnavailable:
      "Your answers could not be attached to your email yet, so SLEEP may ask them again",
    answersSkipped:
      "Your answers were not attached to an email, so SLEEP may ask them again",
    storeNote: "The badge opens the App Store once the app is published.",
  },
  actions: {
    back: "Go back",
    continue: "Continue",
  },
} as const;

/** Mirrors the four bands the app shows after its own onboarding. */
export const scoreBands = [
  {
    min: 80,
    tag: "Excellent",
    title: "Your sleep is in great shape",
    body: "You have built strong habits. Sleep helps you protect them and fine-tune the details.",
    hue: "mint",
  },
  {
    min: 60,
    tag: "Good",
    title: "Your sleep is on the right track",
    body: "A few small changes could take you from good to genuinely restorative.",
    hue: "blue",
  },
  {
    min: 40,
    tag: "Fair",
    title: "There is real room to grow",
    body: "Some nights are working against you, and the right changes add up fast.",
    hue: "violet",
  },
  {
    min: 0,
    tag: "Needs work",
    title: "Your sleep needs some care",
    body: "You are losing more rest than you should. The good news: this is very fixable.",
    hue: "coral",
  },
] as const satisfies readonly {
  min: number;
  tag: string;
  title: string;
  body: string;
  hue: FunnelHue;
}[];

export const profileReadings = {
  chronotypes: {
    "Early morning": {
      title: "Early lark",
      description:
        "Your rhythm naturally starts early, so a steady evening handoff matters.",
    },
    "Mid-morning": {
      title: "Morning leaning",
      description:
        "Your rhythm favors mornings without pulling bedtime too far forward.",
    },
    Afternoon: {
      title: "Balanced",
      description:
        "Your rhythm sits near the middle, with room for a consistent evening.",
    },
    Evening: {
      title: "Evening leaning",
      description:
        "Your rhythm runs later, so the plan eases down without forcing an early night.",
    },
    "Late at night": {
      title: "Night owl",
      description:
        "Your rhythm runs late, so a clear wind-down cue can mark the shift toward sleep.",
    },
  },
  neutralChronotype: {
    title: "Balanced",
    description:
      "No natural awake time was selected, so this stays a neutral starting point.",
  },
  timelineFallback: {
    summary: "Start winding down one hour before bed",
    windDown: "One hour before bed",
    lightsOut: "Your bedtime",
    wake: "Your wake time",
  },
  tools: {
    breathing: {
      name: "4-7-8 breathing",
      racingMind:
        "A short 4-7-8 practice gives a racing mind one steady rhythm to follow.",
      fallAsleep:
        "A short 4-7-8 practice gives the first minutes in bed a slower pace.",
      fallback:
        "A short 4-7-8 practice marks the shift from the day into bed.",
    },
    sound: {
      name: "A fading sound mix",
      waking:
        "A low sound mix keeps the room consistent when you wake at night, then fades.",
      fallback:
        "A sound mix that fades gives the room one quiet cue without playing all night.",
    },
    alarm: {
      name: "A wake alarm",
      routine:
        "One schedule keeps tonight's wind-down and tomorrow's wake alarm together.",
      wakePrefix: "The evening routine leads into your ",
      wakeSuffix: " wake window.",
      fallback:
        "The evening routine and wake alarm stay together in one schedule.",
    },
  },
} as const;

export const plans: Record<
  BillingPeriod,
  {
    name: string;
    badge?: string;
    price: string;
    billing: string;
    trial: string;
    summaryName: string;
    summaryBilling: string;
    renewal: string;
    finePrint: string;
  }
> = {
  yearly: {
    name: "Yearly",
    badge: "Save 60%",
    price: "$3.99 / month",
    billing: "$47.88 billed once a year",
    trial: "7 days free first",
    summaryName: "Sleep+ Yearly",
    summaryBilling: "then $47.88 a year",
    renewal: "$47.88 a year",
    finePrint: "Then $47.88 a year. Cancel anytime, in one tap.",
  },
  monthly: {
    name: "Monthly",
    price: "$9.99 / month",
    billing: "Billed every month",
    trial: "7 days free first",
    summaryName: "Sleep+ Monthly",
    summaryBilling: "then $9.99 a month",
    renewal: "$9.99 a month",
    finePrint: "Then $9.99 a month. Cancel anytime, in one tap.",
  },
};

export const sleepPlusFeatures = [
  {
    title: "Deep sleep analytics",
    detail: "Cycle breakdown, debt, weekly trends",
    icon: "analytics",
    hue: "blue",
  },
  {
    title: "Smart wake alarm",
    detail: "Wakes you in a light phase, gently",
    icon: "alarm",
    hue: "coral",
  },
  {
    title: "Full sound library",
    detail: "Layered mixes, binaural, brown noise",
    icon: "sound",
    hue: "mint",
  },
  {
    title: "Guided wind-down",
    detail: "Breath, body scan, sleep stories",
    icon: "wind",
    hue: "violet",
  },
  {
    title: "Dream journal plus",
    detail: "Tags, mood map, voice notes, search",
    icon: "journal",
    hue: "blue",
  },
  {
    title: "Unlimited schedules",
    detail: "Build presets for any rhythm or shift",
    icon: "schedule",
    hue: "coral",
  },
  {
    title: "Cloud sync",
    detail: "Across iPhone, iPad and the web",
    icon: "cloud",
    hue: "mint",
  },
] as const;

export const paywallFaq = [
  {
    question: "What happens after seven days?",
    answer:
      "Sleep+ renews on the plan you chose unless you cancel before the trial ends.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. Cancel before renewal and the next payment will not be taken.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Cloud sync needs a connection. Offline access depends on what is already saved on your device.",
  },
] as const;
