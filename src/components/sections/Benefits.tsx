"use client";

import { MoonStar, ShieldBan, Timer } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { Medallion } from "@/components/ambient/Medallion";
import { StarField } from "@/components/ambient/StarField";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ScreenFrame } from "@/components/primitives/ScreenFrame";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { benefits } from "@/data/content";
import { fadeUp, scaleIn, stagger, viewportOnce } from "@/lib/motion";

const benefitIcons = [ShieldBan, MoonStar, Timer] as const;
const ambientMask =
  "radial-gradient(ellipse 54% 65% at 50% 50%, black 0%, black 46%, rgb(0 0 0 / 0.92) 54%, rgb(0 0 0 / 0.55) 63%, rgb(0 0 0 / 0.12) 70%, transparent 76%)";
const ambientStyle: CSSProperties = {
  backgroundImage: [
    "radial-gradient(ellipse 48% 42% at 34% 32%, color-mix(in srgb, var(--color-violet) 10%, transparent) 0%, color-mix(in srgb, var(--color-violet) 5%, transparent) 42%, transparent 72%)",
    "radial-gradient(ellipse 46% 40% at 70% 48%, color-mix(in srgb, var(--color-mint) 12%, transparent) 0%, color-mix(in srgb, var(--color-mint) 6%, transparent) 42%, transparent 72%)",
    "radial-gradient(ellipse 42% 34% at 48% 74%, color-mix(in srgb, var(--color-violet) 10%, transparent) 0%, color-mix(in srgb, var(--color-violet) 5%, transparent) 42%, transparent 72%)",
  ].join(", "),
  maskImage: ambientMask,
  WebkitMaskImage: ambientMask,
};

export default function Benefits() {
  return (
    <Section id={benefits.id} halo>
      <div className="flex flex-col gap-14 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-center xl:gap-20">
        <div className="order-1 w-full lg:order-2 lg:col-start-2 lg:row-start-1 lg:self-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <Eyebrow align="left">What is inside</Eyebrow>
          </motion.div>
          <div className="mt-6">
            <SectionHeading
              {...benefits.heading}
              sub={benefits.sub}
              align="left"
            />
          </div>
        </div>

        <div className="relative isolate order-2 w-full py-8 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[82%] w-[min(520px,92%)] -translate-x-1/2 -translate-y-1/2 blur-[72px]"
            style={ambientStyle}
          />
          <StarField count={40} />
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <ScreenFrame
              src={benefits.shot}
              alt="Sleep app home screen showing tonight's sleep tools"
              hue="violet"
              className="animate-drift relative mx-auto w-[268px]"
            />
          </motion.div>
        </div>

        <motion.ul
          variants={stagger(0.08, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="order-3 w-full divide-y divide-hair lg:col-start-2 lg:row-start-2 lg:self-start"
        >
          {benefits.items.map((item, index) => {
            const Icon = benefitIcons[index];

            return (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="flex items-start gap-5 py-6 first:pt-0"
              >
                <Medallion hue={item.hue} size={44}>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                </Medallion>
                <div className="pt-1">
                  <h3 className="text-[17px] font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[16px] leading-relaxed text-ink-2">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
