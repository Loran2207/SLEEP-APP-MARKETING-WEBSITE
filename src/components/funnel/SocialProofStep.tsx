"use client";

import { ArrowLeft } from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { PrimaryAction } from "./PrimaryAction";

type SocialProofStepProps = {
  onContinue: () => void;
  onBack: () => void;
};

/** Where the faces sit on the map, in percent of the frame. */
const PEOPLE = [
  { left: 13, top: 20, size: 46, hue: "var(--color-coral)", src: "/funnel/people/p4.webp" },
  { left: 41, top: 6, size: 56, hue: "var(--color-blue)", src: "/funnel/people/p1.webp" },
  { left: 72, top: 16, size: 42, hue: "var(--color-violet)", src: "/funnel/people/p3.webp" },
  { left: 26, top: 58, size: 40, hue: "var(--color-mint)", src: "/funnel/people/p5.webp" },
  { left: 63, top: 62, size: 38, hue: "var(--color-blue)", src: "/funnel/people/p2.webp" },
] as const;

/**
 * The reach screen, laid out like Rest AI's: a dotted world with people on it,
 * one plain sentence, then the agreement button.
 *
 * The map is the real coastline, sampled on a grid. The portraits are generated
 * placeholders, not customers, and there are deliberately no counts next to
 * them: a number beside a face is a claim, and we have none to make yet.
 */
export function SocialProofStep({ onContinue, onBack }: SocialProofStepProps) {
  const copy = funnelCopy.socialProof;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="flex items-center pt-[max(14px,env(safe-area-inset-top))]">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="grid size-10 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.7} />
        </button>
      </div>

      <div className="relative mt-6 h-[210px] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/funnel/world-dots.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 1 }}
        />
        {PEOPLE.map((person) => (
          <span
            key={`${person.left}-${person.top}`}
            className="absolute overflow-hidden rounded-full bg-abyss"
            style={{
              left: `${person.left}%`,
              top: `${person.top}%`,
              width: person.size,
              height: person.size,
              boxShadow: `0 0 0 2px rgba(245,245,247,0.14), 0 0 26px color-mix(in srgb, ${person.hue} 40%, transparent)`,
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
        ))}
      </div>

      <p className="mx-auto mt-9 max-w-[330px] text-center text-[15px] leading-[1.55] text-ink-2">
        {copy.lead}
      </p>

      <h1 className="mt-8 text-center text-[27px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
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