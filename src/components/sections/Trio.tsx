"use client";

import { motion } from "motion/react";
import { ClipboardCheck, GraduationCap, Sparkles } from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { trio } from "@/data/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const icons = [Sparkles, GraduationCap, ClipboardCheck] as const;

export function Trio() {
  return (
    <Section>
      <Eyebrow>Start here</Eyebrow>
      <div className="mt-7">
        <SectionHeading {...trio.heading} sub={trio.sub} />
      </div>

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3"
      >
        {trio.items.map((item, index) => {
          const Icon = icons[index];

          return (
            <motion.li
              key={item.title}
              variants={fadeUp}
              className="list-none transition-[translate,border-color,background-color] duration-150 hover:-translate-y-[2px]"
            >
              <GlassCard hue={item.hue} className="h-full">
                <Medallion hue={item.hue}>
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </Medallion>
                <h3 className="mt-6 text-[19px] font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
              </GlassCard>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}

export default Trio;
