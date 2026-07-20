# The light language (round 2)

An addendum to docs/DESIGN.md. Kirill fed four more references and one clear
brief: make it deeper, richer, more expensive, and keep the canvas BLACK.

## What the four references actually share

Reflect, Resend, Huly and Wope are different brands with one identical idea:

**One large light event, and the product instead of photography.**

- Reflect: a violet portal-arc cresting from behind the app screenshot, light
  spilling over the top edge of the UI. Plus a beam projected down onto a
  perspective grid floor.
- Huly: a narrow vertical aurora beam, violet into coral, once per page.
- Wope: an underlight. Its own spec is the clearest instruction we have -
  "the screenshot should appear embedded into the purple light field, not
  hovering above it."
- Resend: a single sculptural black object, no glow at all, pure restraint.

None of them uses a device mockup. None uses photography. All build depth from
blur, hairlines and glow rather than drop shadows.

## Our version: the moonrise

We do not copy the violet portal. We do the same technique in service of our own
meaning: a moon rising from behind the phone.

A large disc of light crests from behind the app screen, its glow spilling over
the top edge of the UI and washing into the star field. It is the brand mark of
a sleep app, rendered at hero scale, and it is the reason the light is there at
all. Blue #5c9bff at the core, violet #9d7cff at the outer falloff.

**The canvas stays #000000.** Kirill was explicit: not a violet page like the
references. The colour lives in the glow only, and the glow always dies out into
true black before it reaches a section edge.

## The frameless screen

The phone bezel is gone. Kirill: "просто аккуратно показать сам интерфейс",
the padding around the screenshot looked wrong.

A screenshot is now: a 36px-radius clipped rectangle, a single hairline of
rgba(255,255,255,0.10) as its only edge, an underlight glow beneath it, and a
fade into black across its bottom quarter so it dissolves into the page rather
than stopping. No bezel, no notch, no status bar, no drop shadow.

## Buttons with depth

The white primary button must read as a lit physical object, not a flat fill.
Four layers, all inset except the halo:

1. a top inner highlight, white at low alpha, one pixel
2. a bottom inner shade so the pill has a lower lip
3. an outer halo that widens and brightens on hover
4. a specular sheen: a soft diagonal band that sweeps across the face on hover,
   masked to the pill, 600ms, and never on a loop

Press state moves it down one pixel and shrinks the halo. Motion respects
prefers-reduced-motion: the sheen and lift are dropped, the colour change stays.

The secondary button is glass, exactly as Wope specifies: rgba(255,255,255,0.04)
fill, rgba(255,255,255,0.10) hairline, sheen on hover but no halo.

## Rules that do not change

Black canvas. Hairline borders. Inset rim light instead of drop shadows. One
italic serif word per headline. Blue is the only interactive accent; coral,
mint and violet stay as per-feature hues. No photography, no generated people.
