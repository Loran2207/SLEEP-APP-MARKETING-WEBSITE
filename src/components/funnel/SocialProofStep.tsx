"use client";

import { funnelCopy } from "@/data/funnel";

import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type SocialProofStepProps = {
  onContinue: () => void;
  onBack: () => void;
};

/**
 * Where the faces sit on the map, in percent of the frame, sized like the
 * Rest AI original: one large face in the middle, four around it, each with
 * a small reaction badge. The counts mirror the reference composition and
 * are part of the illustration, not a measured claim.
 */
const PEOPLE = [
  { left: 8, top: 16, size: 68, hue: "var(--color-coral)", src: "/funnel/people/p4.webp", badge: "\u{1F44D}", count: "65" },
  { left: 38, top: 2, size: 100, hue: "var(--color-blue)", src: "/funnel/people/p1.webp", badge: "\u{1F44D}❤️", count: "57" },
  { left: 74, top: 12, size: 62, hue: "var(--color-violet)", src: "/funnel/people/p3.webp", badge: "\u{1F60D}❤️", count: "46" },
  { left: 20, top: 56, size: 64, hue: "var(--color-mint)", src: "/funnel/people/p5.webp", badge: "\u{1F60D}", count: "72" },
  { left: 62, top: 60, size: 60, hue: "var(--color-blue)", src: "/funnel/people/p2.webp", badge: "\u{1F44D}", count: "84" },
] as const;

/**
 * The reach screen, laid out like Rest AI's: a dotted world with people on it,
 * one plain sentence, then the agreement button. The map is the real
 * coastline, sampled on a grid; the portraits are generated placeholders,
 * not customers.
 */
export function SocialProofStep({ onContinue, onBack }: SocialProofStepProps) {
  const copy = funnelCopy.socialProof;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <div className="relative mt-8 h-[252px] w-full">
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
                boxShadow: `0 0 0 2px rgba(245,245,247,0.16), 0 0 30px color-mix(in srgb, ${person.hue} 38%, transparent)`,
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
              <span className="text-[11px] leading-[1.4]">{person.badge}</span>
              <span className="text-[11px] leading-[1.4] font-medium text-ink tabular-nums">
                {person.count}
              </span>
            </span>
          </span>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-[330px] text-center text-[15px] leading-[1.55] text-ink-2">
        {copy.lead}
      </p>

      <h1 className="mx-auto mt-7 max-w-[360px] text-balance text-center text-[27px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.title}
      </h1>

      <p className="mx-auto mt-5 max-w-[340px] text-center text-[15px] leading-[1.55] text-ink-2">
        {copy.body}
      </p>

      <div className="mt-auto pt-10">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}
