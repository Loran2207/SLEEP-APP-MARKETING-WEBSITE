# SLEEP marketing site

The marketing site for the SLEEP mobile app.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind v4
- motion
- lucide-react

## Getting started

```bash
npm install
npm run dev
npm run build
npm start
```

## Where things live

- `src/app` contains routes, metadata, and the OG image.
- `src/components/sections` contains the eleven landing sections.
- `src/components/primitives` contains shared building blocks.
- `src/components/ambient` contains the starfield, halo, aurora, and medallion.
- `src/data/content.ts` contains all copy.
- `src/lib/motion.ts` contains scroll reveal variants.
- `docs/DESIGN.md` is the design spec every component follows.
- `public/app` contains real screenshots captured from the app.

## Environment

Set `NEWSLETTER_ENDPOINT` and `NEWSLETTER_API_KEY` for newsletter signups. The newsletter form returns a clear error until both variables are set.

## Before launch

- [ ] Replace the placeholder testimonial quotes in `src/data/content.ts` with real reviews.
- [ ] Fill in the app store link behind the "Get the app" buttons.
- [ ] Have a lawyer review the placeholder privacy and terms pages.
- [ ] Set the newsletter environment variables.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
