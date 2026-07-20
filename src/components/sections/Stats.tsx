"use client";

import { motion } from "motion/react";

import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { stats } from "@/data/content";
import { scaleIn, stagger, viewportOnce } from "@/lib/motion";

export default function Stats() {
  return (
    <Section>
      <SectionHeading {...stats.heading} />

      <motion.dl
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-3"
      >
        {stats.items.map((item) => (
          <motion.div
            key={item.label}
            variants={scaleIn}
            className="flex flex-col items-center border-t border-hair px-6 py-2 text-center first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0"
          >
            <dt className="ink-fade font-sans text-[56px] leading-none font-medium tracking-[-0.04em] whitespace-nowrap md:text-[64px] lg:text-[76px]">
              {item.value}
            </dt>
            <dd className="accent-serif mt-1 text-[20px] leading-tight text-blue md:text-[24px]">
              {item.label}
            </dd>
            <dd className="mx-auto mt-3 max-w-[300px] text-pretty text-[15px] leading-relaxed text-ink-2">
              {item.body}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
}
