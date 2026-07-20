"use client";

import { motion } from "motion/react";
import { ClipboardCheck, GraduationCap, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";

import { Medallion } from "@/components/ambient/Medallion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { trio } from "@/data/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const icons = [Sparkles, GraduationCap, ClipboardCheck] as const;

const hueTokens = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
} as const;

type CardStyle = CSSProperties & {
  "--trio-hue": string;
};

const rowLightMask =
  "radial-gradient(ellipse at center, black 0%, rgb(0 0 0 / 0.9) 44%, rgb(0 0 0 / 0.36) 64%, transparent 82%)";

const rowLightStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-blue-soft) 8%, transparent) 0%, color-mix(in srgb, var(--color-blue) 3.5%, transparent) 36%, color-mix(in srgb, var(--color-violet) 1.5%, transparent) 56%, transparent 76%)",
  maskImage: rowLightMask,
  WebkitMaskImage: rowLightMask,
};

const cardGlowMask =
  "radial-gradient(ellipse at center, black 0%, rgb(0 0 0 / 0.86) 46%, rgb(0 0 0 / 0.28) 66%, transparent 82%)";

export function Trio() {
  return (
    <Section>
      <Eyebrow>Start here</Eyebrow>
      <div className="mt-7">
        <SectionHeading {...trio.heading} sub={trio.sub} />
      </div>

      <div className="relative mt-14 isolate md:mt-16">
        <div
          aria-hidden="true"
          className="animate-breathe pointer-events-none absolute -top-16 right-6 left-6 -z-10 h-32 motion-reduce:animate-none md:right-[8%] md:left-[8%]"
          style={rowLightStyle}
        />

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {trio.items.map((item, index) => {
            const Icon = icons[index];
            const hue = hueTokens[item.hue];
            const cardStyle: CardStyle = { "--trio-hue": hue };
            const glowStyle: CSSProperties = {
              backgroundImage: `radial-gradient(ellipse at center, color-mix(in srgb, ${hue} 18%, transparent) 0%, color-mix(in srgb, ${hue} 8%, transparent) 42%, transparent 76%)`,
              maskImage: cardGlowMask,
              WebkitMaskImage: cardGlowMask,
            };
            const rimStyle: CSSProperties = {
              backgroundImage: `linear-gradient(90deg, transparent, color-mix(in srgb, ${hue} 28%, rgba(255,255,255,0.12)), transparent)`,
            };

            return (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="group/trio-card list-none transition-transform duration-150 ease-[var(--ease-out-expo)] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none"
                style={cardStyle}
              >
                <GlassCard
                  className="h-full border-[rgba(255,255,255,0.10)] transition-[border-color] duration-300 ease-[var(--ease-out-expo)] before:hidden group-hover/trio-card:border-[color-mix(in_srgb,var(--trio-hue)_24%,rgba(255,255,255,0.10))] motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 left-4 h-[190px] w-[230px] opacity-60 transition-opacity duration-300 ease-[var(--ease-out-expo)] group-hover/trio-card:opacity-100 motion-reduce:transition-none"
                    style={glowStyle}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-px right-5 left-5 h-px opacity-45 transition-opacity duration-300 ease-[var(--ease-out-expo)] group-hover/trio-card:opacity-90 motion-reduce:transition-none"
                    style={rimStyle}
                  />

                  <div className="relative z-10">
                    <Medallion hue={item.hue}>
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </Medallion>
                    <h3 className="mt-6 text-[19px] leading-snug font-medium tracking-[-0.02em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-2">
                      {item.body}
                    </p>
                  </div>
                </GlassCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}

export default Trio;
