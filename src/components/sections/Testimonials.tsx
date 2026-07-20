"use client";

import { Quote } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { nav, testimonials } from "@/data/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const reviewsLabel = nav.links.find(
  (link) => link.href === `#${testimonials.id}`,
)?.label;

const gridLightStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse 48% 44% at 50% 50%, color-mix(in srgb, var(--color-ink) 7%, transparent) 0%, color-mix(in srgb, var(--color-blue) 6%, transparent) 32%, color-mix(in srgb, var(--color-violet) 3%, transparent) 56%, transparent 78%)",
  maskImage:
    "radial-gradient(ellipse 50% 46% at 50% 50%, black 0%, rgb(0 0 0 / 0.94) 38%, rgb(0 0 0 / 0.58) 58%, rgb(0 0 0 / 0.14) 72%, transparent 82%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 50% 46% at 50% 50%, black 0%, rgb(0 0 0 / 0.94) 38%, rgb(0 0 0 / 0.58) 58%, rgb(0 0 0 / 0.14) 72%, transparent 82%)",
};

export default function Testimonials() {
  return (
    <Section id={testimonials.id}>
      <Eyebrow>{reviewsLabel}</Eyebrow>
      <div className="mt-6">
        <SectionHeading {...testimonials.heading} />
      </div>

      {/* Testimonial quotes are placeholder content until real reviews are available. */}
      <div className="relative isolate mt-14 md:mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(100svh,720px)] md:inset-0 md:h-auto"
          style={gridLightStyle}
        />

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative z-10 grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.items.map((testimonial) => (
            <motion.div
              key={testimonial.quote}
              variants={fadeUp}
              className="h-full"
            >
              <div className="group/card h-full transition-transform duration-150 ease-[var(--ease-out-expo)] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
                <GlassCard className="h-full">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-px z-0 rounded-[19px] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_0_32px_color-mix(in_srgb,var(--color-coral)_3%,transparent)] transition-opacity duration-150 group-hover/card:opacity-100 motion-reduce:transition-none"
                  />
                  <figure className="relative z-10 flex h-full flex-col">
                    <Quote
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.5}
                      className="text-faint transition-colors duration-150 group-hover/card:text-muted motion-reduce:transition-none"
                    />
                    <blockquote className="flex-1 text-pretty text-[16px] leading-[1.6] text-ink-2">
                      {testimonial.quote}
                    </blockquote>
                    <div
                      aria-hidden="true"
                      className="my-6 w-full border-t border-hair"
                    />
                    <figcaption>
                      <span className="block text-[14px] font-medium text-ink">
                        {testimonial.name}
                      </span>
                      <span className="mt-1 block text-[13px] text-muted">
                        {testimonial.role}
                      </span>
                    </figcaption>
                  </figure>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
