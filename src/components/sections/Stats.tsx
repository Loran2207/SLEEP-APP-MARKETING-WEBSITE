"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { stats } from "@/data/content";
import { fadeUp, scaleIn, stagger, viewportOnce } from "@/lib/motion";

const bloomMask =
  "radial-gradient(ellipse 50% 50% at center, black 0%, rgb(0 0 0 / 0.92) 32%, rgb(0 0 0 / 0.48) 54%, transparent 72%)";

const statBloomStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-blue) 28%, transparent) 0%, color-mix(in srgb, var(--color-blue) 12%, transparent) 42%, transparent 66%)",
  maskImage: bloomMask,
  WebkitMaskImage: bloomMask,
};

export default function Stats() {
  return (
    <Section>
      <SectionHeading {...stats.heading} />

      <motion.dl
        variants={stagger(0.16, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-3"
      >
        {stats.items.map((item, index) => (
          <motion.div
            key={item.label}
            variants={stagger(0.07)}
            className="relative flex flex-col items-center px-2 py-5 text-center md:px-6 md:py-4"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.10)_20%,rgba(255,255,255,0.10)_80%,transparent)] md:inset-y-0 md:right-auto md:h-auto md:w-px md:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.10)_18%,rgba(255,255,255,0.10)_82%,transparent)]"
              />
            ) : null}

            <motion.dt
              variants={scaleIn}
              className="relative isolate font-sans text-[64px] leading-none font-medium tracking-[-0.045em] whitespace-nowrap md:text-[72px] lg:text-[88px] xl:text-[96px]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-[46%] left-1/2 -z-10 h-[2.25em] w-[4.75em] -translate-x-1/2 -translate-y-1/2 blur-[18px]"
                style={statBloomStyle}
              />
              <span className="ink-fade relative inline-block">{item.value}</span>
            </motion.dt>
            <motion.dd
              variants={fadeUp}
              className="accent-serif mt-2 text-[20px] leading-[1.1] text-blue md:text-[24px]"
            >
              {item.label}
            </motion.dd>
            <motion.dd
              variants={fadeUp}
              className="mx-auto mt-4 max-w-[300px] text-pretty text-[15px] leading-relaxed text-ink-2"
            >
              {item.body}
            </motion.dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
}
