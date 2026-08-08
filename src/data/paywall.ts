/**
 * Copy for the long-scroll paywall. Everything the paywall says that the rest
 * of the funnel does not already own lives here. Real prices stay in the plans
 * record in funnel.ts; the only derived display strings kept here (per-day
 * costs, the yearly anchor) carry a comment tying them back to that record.
 *
 * The figures and reviews are illustrative prototype content supplied at the
 * owner's request (2026-08-08); the client swaps in final ones with his brief.
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
    footnote:
      "Members fall asleep twice as fast and wake fewer times after 3 weeks with Sleep+.",
  },
  socialProof: {
    count: "100K+",
    countCaption: "Sleepers",
    rating: "4.8 out of 5",
    ratingSource: "App Store",
    ratingsLine: "Over 10,000 five-star ratings",
    note: "from people falling asleep with Sleep every night",
  },
  reviews: {
    title: "People love the Sleep app",
    items: [
      {
        name: "Maria K.",
        title: "Asleep before the story ends",
        body: "I used to lie awake for an hour, easy. Two weeks with the wind-down routine and I'm out in about fifteen minutes.",
      },
      {
        name: "Dan R.",
        title: "The 3am wake-ups are gone",
        body: "The sound mix carries me through the night. First full week of unbroken sleep I've had in years.",
      },
      {
        name: "Sofia L.",
        title: "Finally a routine that stuck",
        body: "Nothing else lasted more than a few days. The gentle reminders and one clear plan made it feel effortless.",
      },
    ],
  },
  guarantee: {
    sealTop: "30-day",
    sealBottom: "money back",
    body: "We're confident Sleep+ can change your nights. If you follow your plan and don't feel a real difference in your sleep within 30 days, write to us and we'll refund you in full.",
    checkoutLine: "Guaranteed safe checkout",
  },
  nowAfter: {
    title: "Less tossing, more sleeping",
    nowLabel: "Now",
    afterLabel: "After the programme",
    ringLabel: "Sleep score",
    nowValue: "26%",
    afterValue: "88%",
    barLabels: ["Sleep quality", "Energy"],
  },
  results: {
    title: "People just like you achieved results",
    bars: [
      { value: "58%", label: "Week 1" },
      { value: "71%", label: "Week 2" },
      { value: "83%", label: "Week 3" },
      { value: "91%", label: "Week 4" },
    ],
    cells: [
      { value: "72%", label: "Fall asleep faster" },
      { value: "89%", label: "Wake clear-headed" },
      { value: "77%", label: "Steadier mood" },
      { value: "68%", label: "Lower stress" },
      { value: "75%", label: "Sharper focus" },
      { value: "82%", label: "Energy that lasts" },
      { value: "89%", label: "Habits that stick" },
      { value: "92%", label: "A calmer mind" },
      { value: "87%", label: "Unbroken nights" },
    ],
    note: "Share of members reporting each change after four weeks with Sleep+.",
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
