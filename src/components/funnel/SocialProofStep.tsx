"use client";

import { funnelCopy } from "@/data/funnel";

import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type SocialProofStepProps = {
  onContinue: () => void;
  /** Kept so Funnel.tsx compiles; this ceremonial screen renders no back arrow. */
  onBack: () => void;
};

/**
 * Where the faces sit on the map, in percent of the frame, sized like the
 * Rest AI original: one large face in the middle, four around it, each with
 * a small reaction badge. The counts mirror the reference composition and
 * are part of the illustration, not a measured claim.
 */
const PEOPLE = [
  { left: 8, top: 16, size: 60, hue: "var(--color-coral)", src: "/funnel/people/p4.webp", thumb: true, heart: false, smile: false, count: "65" },
  { left: 38, top: 2, size: 94, hue: "var(--color-blue)", src: "/funnel/people/p1.webp", thumb: true, heart: true, smile: false, count: "57" },
  { left: 74, top: 12, size: 56, hue: "var(--color-violet)", src: "/funnel/people/p3.webp", thumb: false, heart: true, smile: true, count: "46" },
  { left: 20, top: 56, size: 58, hue: "var(--color-mint)", src: "/funnel/people/p5.webp", thumb: false, heart: false, smile: true, count: "72" },
  { left: 62, top: 60, size: 56, hue: "var(--color-blue)", src: "/funnel/people/p2.webp", thumb: true, heart: false, smile: false, count: "84" },
] as const;

/**
 * The emoji heart renders as a white text glyph in the capture browser, so the
 * heart is drawn; its red is the pictographic emoji red, not a palette accent.
 */
function HeartGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-[11px]" aria-hidden="true">
      <path
        fill="#ff4b55"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

/**
 * The reach screen, laid out like Rest AI's: a dotted world with people on it,
 * one plain sentence, then the agreement button. The map is the real
 * coastline, sampled on a grid; the portraits are generated placeholders,
 * not customers.
 */
export function SocialProofStep({ onContinue }: SocialProofStepProps) {
  const copy = funnelCopy.socialProof;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <div className="relative mt-6 h-[230px] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/funnel/world-dots.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain opacity-90"
        />
        {PEOPLE.map((person) => (
          <span
            key={person.src}
            className="absolute"
            style={{
              left: `${person.left}%`,
              top: `${person.top}%`,
              width: person.size,
              height: person.size,
            }}
          >
            <span
              className="block h-full w-full overflow-hidden rounded-full bg-abyss"
              style={{
                boxShadow: `0 0 0 2px rgba(245,245,247,0.16), 0 0 26px color-mix(in srgb, ${person.hue} 38%, transparent)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={person.src}
                alt=""
                width={person.size}
                height={person.size}
                className="h-full w-full object-cover"
              />
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-1.5 flex items-center gap-1 rounded-full border border-hair bg-[rgba(0,0,0,0.82)] px-2 py-0.5"
            >
              {person.thumb ? (
                <span className="text-[11px] leading-[1.4]">{"\u{1F44D}"}</span>
              ) : null}
              {person.smile ? (
                <span className="text-[11px] leading-[1.4]">{"\u{1F60D}"}</span>
              ) : null}
              {person.heart ? <HeartGlyph /> : null}
              <span className="text-[11px] leading-[1.4] font-medium text-ink tabular-nums">
                {person.count}
              </span>
            </span>
          </span>
        ))}
      </div>

      <p className="mt-7 max-w-[330px] text-[14px] leading-[1.55] text-ink-2">
        {copy.leadBefore}
        <strong className="font-medium text-ink">{copy.leadStrong}</strong>
        {copy.leadAfter}
      </p>

      <h1 className="mt-5 max-w-[350px] text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.titleBefore}
        <span className="text-blue">{copy.titleAccent}</span>
        {copy.titleAfter}
      </h1>

      <p className="mt-4 max-w-[330px] text-[14px] leading-[1.55] text-ink-2">
        {copy.bodyBefore}
        <span className="font-medium text-blue">{copy.bodyAccent}</span>
        {copy.bodyAfter}
      </p>

      <p className="mt-4 text-[14px] text-ink-2">{copy.tagline}</p>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}
