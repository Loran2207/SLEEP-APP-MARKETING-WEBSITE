# Reference styles

Four Refero style references ground the craft of this site. They are the source
Kirill picked. Read this together with docs/DESIGN.md before touching any UI:
DESIGN.md says what our system IS, this file says where each move CAME FROM and
what the original does, so a borrowed detail is executed properly rather than
approximated.

Rule of use: borrow specific moves, never a whole look. Our palette, our type,
our content. If a reference and DESIGN.md disagree, DESIGN.md wins.

---

## Reflect Notes - the foundation
https://styles.refero.design/style/e7f92774-3c08-402b-917d-020ba1f3d489
"Starlit violet cosmos - a dark observatory where notes float like constellations."

This is the closest relative of the SLEEP app itself, so it carries the most weight.

What we take:
- A near-black canvas with a colour undertone, not pure neutral grey. Reflect uses
  #030014 (violet cast); we use #000000 because the app is pure black, and we get
  the cast from ambient glow instead of from the base colour.
- Star field as ambient decoration: tiny 1-2px white dots at low opacity scattered
  across the hero.
- Elevation as INSET RIM LIGHT, never drop shadow:
  inset 0 0 24px rgba(255,255,255,0.04). This is the single most important
  borrowed rule and it is why .rim and .rim-strong exist.
- Display type at weight 500, never 600+. Their note: "other brands shout,
  Reflect whispers". For a sleep product that is exactly right.
- One restrained chromatic accent used as punctuation, not paint.
- Aurora gradient dividers: transparent at both ends, colour peaking in the middle.

What we deliberately do NOT take: their violet #9382ff as the accent. Our accent is
the app's own cosmic blue #5c9bff.

---

## AuthKit - glass and halo
https://styles.refero.design/style/e80231a2-e4d6-406a-a2c9-2e6109679690
"Frosted glass cathedral at midnight."

What we take:
- Frosted glass surfaces: a barely-there fill (rgba white ~0.03) plus backdrop
  blur, reading as a lit glass plate rather than a paper card. This is .glass.
- Hairline edges as 1px INSET strokes at ~0.10-0.12 alpha, never a solid border.
- The centred eyebrow label flanked by lines that fade to transparent at both
  ends. This is our Eyebrow primitive and it opens most sections.
- A conic-gradient spotlight halo at the top of full-bleed sections. This is
  SpotlightHalo.
- The fanned floating-card composition in the hero: a central object with cards
  offset to either side at a slight rotation.
- Cathedral spacing: 120px+ section gaps. We use 104 mobile / 160 desktop.

Their imagery note is the one that settles the whole photography question:
"No photography, no lifestyle imagery. The product IS the visual."

---

## Resend - black discipline
https://styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d
"Black velvet with violet neon."

The restraint reference. Resend is what stops the cosmic language turning into a
light show.

What we take:
- Pure #000000 as the canvas. Never an off-black or a tinted dark grey.
- Layers separated by a 1px hairline against the black, not by a filled surface
  and not by a shadow. Cards sit on black with an edge, nothing more.
- Ghost buttons: transparent fill, hairline border, plain text. Resend never uses
  a filled colourful button as its primary action, and neither do we. Our one
  filled button is white, taken from the app's own white pill CTA.
- Anti-decorative heroes: no gradient wash behind the headline, no marketing
  illustration. A single sculptural object anchors the composition.
- Two radius values only, applied consistently per component family.

Its imagery note again: "no photography, no illustrations, no lifestyle imagery."
Three of our four references say this independently. That is why the app
screenshots and code-native atmosphere are the whole visual system.

---

## Slash - the editorial collision
https://styles.refero.design/style/7c38e84b-aea0-4c8f-b3e9-60b994ee6c6b
"Midnight vault with gilded ledger lines."

What we take:
- The serif and sans collision as a brand signature rather than decoration. Slash
  sets display in a high-contrast didone and everything functional in Inter, and
  is explicit that this is "the brand's identity, not decoration".
  We run the same idea at word scale instead of block scale: one italic serif word
  inside a sans headline, because that is what the SLEEP app already does on its
  own screens ("Good afternoon, Kirill" / "The science of sleep").
- A serif numeral for large statistics, for editorial gravitas.
- Very generous section rhythm (they use 160px) so display type can breathe.
- One warm accent used only as punctuation on labels, never on buttons.

What we do NOT take: their copper, their photography, and their didone at body
sizes. Our serif appears only as the accent word and the step numerals.

---

## How the four combine

Reflect gives the world (black canvas, stars, rim light, whisper-weight display).
AuthKit gives the surfaces (glass, hairlines, halo, eyebrow, fanned cards).
Resend gives the discipline (true black, no filled colour buttons, nothing
decorative that is not structural).
Slash gives the voice (serif against sans, editorial numerals, room to breathe).

Everything chromatic comes from the app, not from the references: blue #5c9bff,
coral #ff8e7c, mint #5dddb3, violet #9d7cff, assigned one hue per feature area
exactly as the app assigns them per screen area.
