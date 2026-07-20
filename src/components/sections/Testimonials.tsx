"use client";

import { Quote } from "lucide-react";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GlassCard } from "@/components/primitives/GlassCard";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { nav, testimonials } from "@/data/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const reviewsLabel = nav.links.find(
  (link) => link.href === `#${testimonials.id}`,
)?.label;

export default function Testimonials() {
  return (
    <Section id={testimonials.id}>
      <Eyebrow>{reviewsLabel}</Eyebrow>
      <div className="mt-6">
        <SectionHeading {...testimonials.heading} />
      </div>

      {/* Testimonial quotes are placeholder content until real reviews are available. */}
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.items.map((testimonial) => (
          <motion.div
            key={testimonial.quote}
            variants={fadeUp}
            className="h-full"
          >
            <GlassCard className="h-full">
              <figure className="flex h-full flex-col">
                <Quote
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.5}
                  className="text-faint"
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
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
