# SLEEP - marketing site design spec

The single source of truth for this site. Every component follows it.

## North star

The site is the app's night sky, seen from further away. Pure black, quiet,
luminous. Nothing shouts. The product screenshots are the imagery - there is no
stock photography, no generated people, no lifestyle shots.

The palette, the starfield and the glowing medallions are lifted directly from
the app (`sleep/src/tokens.ts` + `sleep/src/components/cosmic.tsx`), so a visitor
who downloads the app lands somewhere they already recognise.

## Reference synthesis

Four Refero styles ground the craft. We take specific moves, not whole looks:

- **Reflect Notes** - the foundation. Near-black canvas, star field, display type
  at medium weight (never bold), elevation as inset rim light rather than drop
  shadow, one restrained accent, a cosmic metaphor.
- **AuthKit** - frosted glass cards, hairline inset edges, centred eyebrow labels
  flanked by fading lines, a conic spotlight halo at the top of full-bleed
  sections, the fanned floating-card hero.
- **Resend** - pure #000 discipline, hairline borders instead of shadows, ghost
  buttons, anti-decorative restraint.
- **Slash** - the serif and sans collision for editorial weight, and a generous
  section rhythm that lets headlines breathe.

## The signature

The app sets accent words in *italic serif* inside a sans sentence: "Good
afternoon, *Kirill*", "The science of *sleep*". The site does exactly the same.

Every display headline is Inter at weight 500 with tight tracking, and carries
**one** italic-serif word. That single detail is the brand. Use `.accent-serif`.

Never bold a display headline. Authority here comes from size and calm, not weight.

## Tokens

All tokens live in `src/app/globals.css` under `@theme`. Use the Tailwind classes
they generate (`bg-surface`, `text-muted`, `border-hair`). Never hardcode a hex.

| Role | Token | Value |
|---|---|---|
| Page canvas | `void` | `#000000` |
| Deepest card | `abyss` | `#05060a` |
| Raised surface | `surface` | `#0c0e14` |
| Elevated card | `surface-2` | `#14161d` |
| Chip / highest | `surface-3` | `#1c1f27` |
| Heading text | `ink` | `#f5f5f7` |
| Body text | `ink-2` | `#b4b6be` |
| Muted text | `muted` | `#8a8a92` |
| Helper text | `faint` | `#5a5c64` |
| Primary accent | `blue` | `#5c9bff` |
| Feature hue | `coral` | `#ff8e7c` |
| Feature hue | `mint` | `#5dddb3` |
| Feature hue | `violet` | `#9d7cff` |
| Hairline | `hair` | `rgba(245,245,247,0.10)` |

### Accent discipline

Blue is the only accent that appears in interactive elements. Coral, mint and
violet appear **only** as per-feature medallion and glow hues, mirroring how the
app assigns one hue per area (coral = sounds, blue = breathing, violet = night
shift, mint = habits). They never fill a button and never colour body text.

### Elevation

Depth is inset rim light, never a drop shadow. Use `.rim` for cards and
`.rim-strong` for the hero phone and other floating objects. Borders are always
`border border-hair` - one hairline, never a solid stroke.

## Type

- **Sans**: Inter, loaded via `next/font/google` as `--font-inter`.
- **Serif**: Instrument Serif italic, `--font-instrument`, used *only* for the
  one accent word per headline.

Scale (desktop -> mobile):

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display (hero) | 76px -> 40px | 500 | -0.035em |
| Heading (section) | 52px -> 32px | 500 | -0.03em |
| Subheading | 24px -> 20px | 500 | -0.02em |
| Body large | 19px -> 17px | 400 | -0.01em |
| Body | 16px | 400 | -0.01em |
| Eyebrow | 13px | 500 | 0.14em |
| Caption | 13px | 400 | 0 |

Eyebrows use positive tracking in place of the forbidden all-caps. Body copy is
`ink-2`; only headings get `ink`.

## Buttons

Taken from the app, which uses a white pill for the committed action and a
hairline outline pill for everything else.

- **Primary**: white fill, `void` text, fully rounded pill, medium weight.
  On hover it lifts 1px and its glow widens. One per viewport.
- **Secondary**: transparent, `border-hair-strong`, `ink` text, same pill shape.
- **Never** a colour-filled button. Blue is for links, active states and glows.

## Shapes and rhythm

- Cards `rounded-card` (20px), large panels `rounded-tile` (28px), phones
  `rounded-phone` (44px), buttons and badges fully rounded.
- Content max width 1200px, gutters 24px mobile / 40px desktop.
- Section rhythm 160px desktop, 104px mobile. Generous, cathedral-like.
- The page is one continuous black canvas. Sections are never separated by a
  background colour change - only by space, hairlines and ambient glow.

## Motion

Scroll reveals are blur-focus: content rises and resolves from blurred to sharp.
Variants live in `src/lib/motion.ts`; never hand-roll a new one in a section.

- Reveal once, `viewportOnce` margin -90px. The bottom-most element on the page
  uses `viewportEdge` instead, or it can never get 90px inside the viewport and
  stays invisible forever.
- Stagger children by 0.08s.
- Ambient loops: `animate-drift` (floating objects), `animate-breathe` (glows),
  `twinkle` (stars), `animate-marquee` (logo and tag rows).
- Hover: 150ms, translate no more than 2px. Interactive, not bouncy.
- Reduced motion is honoured globally by `<MotionConfig reducedMotion="user">`
  in the layout, plus the media query in `globals.css`.

Cards that mount *after* a click (an expanded list, a revealed row) must carry
their own `initial`/`whileInView`, or they mount invisible because the parent
`whileInView` already fired with `once: true`.

## Section order

Mirrors the competitor's skeleton, executed better.

1. `Nav` - floating glass pill, sticky
2. `Hero` - centred headline, phone, fanned glass cards, spotlight halo
3. `Trio` - three value cards
4. `Features` - four-tab switcher with real app screenshots
5. `Stats` - three product numbers
6. `Testimonials` - review cards
7. `Benefits` - phone plus feature callouts
8. `HowItWorks` - three steps, "Easy to start"
9. `Faq` - accordion
10. `FinalCta` - closing call plus newsletter
11. `Footer`

## Honesty rules

No invented metrics, no fabricated reviews presented as real. The stat block
uses **true, checkable product facts** (a 12-lesson course, 4-7-8 breathing, a
9-question diary), which reads more premium than an invented percentage anyway.
Testimonial copy is marked as placeholder in `src/data/content.ts` and must be
replaced with real quotes before launch.

## Copy rules

Sentence case everywhere. No all-caps. No em or en dashes - use a hyphen, comma
or two sentences. Straight quotes. Say the concrete thing: "drift off to rain,
fire or waves", not "audio experiences".
