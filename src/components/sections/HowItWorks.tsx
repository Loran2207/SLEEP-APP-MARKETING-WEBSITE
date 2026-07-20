"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { how, nav } from "@/data/content";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const stepColors = [
  "var(--color-blue)",
  "var(--color-coral)",
  "var(--color-violet)",
] as const;

const howLabel = nav.links.find((link) => link.href === `#${how.id}`)?.label;

export default function HowItWorks() {
  return (
    <Section id={how.id}>
      <Eyebrow>{howLabel}</Eyebrow>
      <div className="mt-6">
        <SectionHeading {...how.heading} />
      </div>

      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mt-16 md:mt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[110px] right-[calc((100%_-_80px)/6_+_130px)] left-[calc((100%_-_80px)/6_+_130px)] hidden border-t border-dashed border-hair lg:block"
        />

        <ol className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {how.steps.map((step, index) => (
            <motion.li
              key={step.n}
              variants={fadeUp}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div
                className="relative z-10 size-[220px] shrink-0 rounded-full border border-dashed bg-void"
                style={{
                  borderColor: `color-mix(in srgb, ${stepColors[index]} 38%, transparent)`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full"
                  style={{
                    backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${stepColors[index]} 24%, transparent) 0%, color-mix(in srgb, ${stepColors[index]} 9%, transparent) 42%, transparent 72%)`,
                  }}
                />
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <Image
                    src={step.shot}
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <p className="accent-serif mt-8 text-[20px] text-muted">
                {step.n}
              </p>
              <h3 className="mt-2 text-[19px] font-medium text-ink">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[300px] text-[15px] leading-relaxed text-ink-2">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex justify-center md:mt-16"
        >
          <Button href="#get" size="lg">
            {how.cta}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
