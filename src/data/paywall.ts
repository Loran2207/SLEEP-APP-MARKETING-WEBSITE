/**
 * Copy for the long-scroll paywall. Everything the paywall says that the rest
 * of the funnel does not already own lives here. Real prices stay in the plans
 * record in funnel.ts; the only derived display strings kept here (per-day
 * costs, the yearly anchor) carry a comment tying them back to that record.
 */
export const paywallCopy = {
  cta: "Get my plan",
  header: {
    headingBefore: "Your plan for ",
    headingAccent: "calmer",
    headingAfter: " nights is ready",
    sub: "Built from your answers, around how you actually sleep.",
  },
  chart: {
    title: "Where your nights are headed",
    awakeLabel: "Time awake in bed",
    qualityLabel: "Sleep quality",
    axis: ["Now", "Week 3", "Week 6", "Week 9", "Week 12"],
    footnote: "An illustration of the plan's direction, not a measured result.",
  },
  ready: {
    title: "Your personalized plan is ready and saved",
    reservedBefore: "Discount reserved for: ",
  },
  featuresTitle: "What you get with Sleep+",
  planCard: {
    heading: "Grab your personal plan before it's gone!",
    offerBefore: "This offer ends in ",
    offerAfter: " min",
    perDayUnit: "per day",
    monthly: {
      badge: "Try it out",
      name: "Monthly plan",
      // plans.monthly $9.99 spread across a 30-day month.
      perDay: "$0.33",
    },
    yearly: {
      name: "Yearly plan",
      // Twelve months at the monthly $9.99: the price the yearly plan replaces.
      anchor: "$119.88",
      // plans.yearly $47.88 spread across the year.
      perDay: "$0.13",
      recommended: "Recommended based on your answers",
    },
    footnote: "Statistic to be supplied by the client.",
  },
  socialProof: {
    count: "N+",
    countCaption: "Sleepers",
    rating: "N.N out of 5",
    ratingSource: "App Store",
    ratingsLine: "Over N,NNN five-star ratings",
    note: "Numbers to be supplied by the client.",
  },
  reviews: {
    title: "People love the Sleep app",
    items: [
      {
        name: "Name",
        title: "Headline goes here",
        body: "Review copy to be supplied by the client.",
      },
      {
        name: "Name",
        title: "Headline goes here",
        body: "Review copy to be supplied by the client.",
      },
      {
        name: "Name",
        title: "Headline goes here",
        body: "Review copy to be supplied by the client.",
      },
    ],
  },
  guarantee: {
    sealTop: "30-day",
    sealBottom: "money back",
    body: "Guarantee terms to be supplied by the client. The refund window and the conditions that apply will be described here.",
    checkoutLine: "Guaranteed safe checkout",
  },
  nowAfter: {
    title: "Less tossing, more sleeping",
    nowLabel: "Now",
    afterLabel: "After the programme",
    ringLabel: "Sleep score",
    ringValue: "NN%",
    barLabels: ["Sleep quality", "Energy"],
  },
  results: {
    title: "People just like you achieved results",
    value: "NN%",
    // Wording reused from funnelCopy.benefits.items and the goals question,
    // trimmed to fit the cells. No new claims.
    cells: [
      "Fall asleep faster",
      "Wake clear-headed",
      "Steadier mood",
      "Lower stress",
      "Sharper focus",
      "Energy that lasts",
      "Habits that stick",
      "A calmer mind",
      "Unbroken nights",
    ],
    note: "Numbers to be supplied by the client.",
  },
  closing: {
    iphoneOnly: "Available only for iPhone users.",
  },
  help: {
    title: "Need help?",
    lead: "Send us an email: ",
    email: "hello@sleepapp.com",
  },
  billing: {
    trialBullet: "The free trial lasts 7 days. Nothing is charged today.",
    renewalBefore: "After the trial, Sleep+ renews at ",
    renewalAfter: " until you cancel.",
    cancelBullet: "Cancel anytime in your account settings, in one tap.",
    legalBefore: "Your membership is bound by our ",
    legalTerms: "Terms",
    legalJoin: " and ",
    legalPrivacy: "Privacy policy",
    legalAfter: ".",
  },
} as const;
