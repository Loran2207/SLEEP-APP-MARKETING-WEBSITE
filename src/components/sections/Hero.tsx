"use client";

import { AlarmClock, AudioLines, BookOpenText, Wind } from "lucide-react";
import { motion } from "motion/react";

import { Medallion } from "@/components/ambient/Medallion";
import { Moonrise } from "@/components/ambient/Moonrise";
import { StarField } from "@/components/ambient/StarField";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { DisplayHeading } from "@/components/primitives/DisplayHeading";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GlassCard } from "@/components/primitives/GlassCard";
import { ScreenFrame } from "@/components/primitives/ScreenFrame";
import { hero } from "@/data/content";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  stagger,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const floatingCards = [
  {
    content: hero.floatingCards[0],
    icon: Wind,
    reveal: fadeRight,
    driftDelay: "-1.4s",
    position: "top-[12%] right-[calc(50%_+_182px)]",
    rotation: "-rotate-[3deg]",
  },
  {
    content: hero.floatingCards[1],
    icon: AudioLines,
    reveal: fadeLeft,
    driftDelay: "-4.8s",
    position: "top-[28%] left-[calc(50%_+_182px)]",
    rotation: "rotate-[3deg]",
  },
  {
    content: hero.floatingCards[2],
    icon: AlarmClock,
    reveal: fadeRight,
    driftDelay: "-3.2s",
    position: "top-[55%] right-[calc(50%_+_182px)]",
    rotation: "rotate-[2deg]",
  },
  {
    content: hero.floatingCards[3],
    icon: BookOpenText,
    reveal: fadeLeft,
    driftDelay: "-6.1s",
    position: "top-[71%] left-[calc(50%_+_182px)]",
    rotation: "-rotate-[2deg]",
  },
] as const;

function FloatingCard({ item }: { item: (typeof floatingCards)[number] }) {
  const Icon = item.icon;

  return (
    <div className="animate-drift h-full" style={{ animationDelay: item.driftDelay }}>
      <GlassCard hue={item.content.hue} className="h-full">
        <div className="flex h-full flex-col items-start gap-4 md:flex-row md:items-center">
          <Medallion hue={item.content.hue} size={44}>
            <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
          </Medallion>
          <div className="min-w-0 text-left">
            <p className="text-[14px] text-ink">{item.content.title}</p>
            <p className="mt-1 text-[13px] text-muted">{item.content.value}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[132px] pb-[72px] md:pt-[168px] md:pb-[96px]">
      <StarField count={120} className="z-0" />

      <Container className="relative">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative z-[30] mx-auto flex max-w-[920px] flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="w-full max-w-[520px]">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6">
            <DisplayHeading {...hero.heading} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[660px] text-pretty text-[17px] text-ink-2 md:text-[19px]"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="#get" size="lg" variant="primary">
              {hero.primaryCta}
            </Button>
            <Button href="#how" size="lg" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative mt-16 md:mt-20">
          {/* The moon crests just above the screen's top edge. It must never sit
              behind the paragraph, where its brightness eats the text contrast. */}
          <Moonrise
            size={460}
            intensity="soft"
            className="absolute top-[-168px] left-1/2 z-10 origin-[50%_58%] -translate-x-1/2 scale-[0.52] sm:scale-[0.74] lg:scale-95"
          />

          <motion.div
            variants={stagger(0, 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative z-20"
          >
            <motion.div variants={scaleIn} className="mx-auto w-[264px] md:w-[300px]">
              <ScreenFrame
                src={hero.shot}
                alt={hero.shotAlt}
                hue="blue"
                priority
                className="w-full"
              />
            </motion.div>
          </motion.div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-18px] left-1/2 z-[25] h-20 w-[min(440px,92vw)] -translate-x-1/2 opacity-40 blur-[22px]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-blue-soft) 30%, transparent) 0%, color-mix(in srgb, var(--color-blue) 18%, transparent) 38%, transparent 74%)",
              maskImage: "radial-gradient(ellipse at center, black 0%, transparent 76%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 76%)",
            }}
          />

          <div className="relative z-[30] mt-10 grid grid-cols-2 gap-3 lg:hidden">
            {floatingCards.map((item) => (
              <motion.article
                key={item.content.title}
                variants={item.reveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <FloatingCard item={item} />
              </motion.article>
            ))}
          </div>

          <div className="hidden lg:block">
            {floatingCards.map((item) => (
              <motion.article
                key={item.content.title}
                variants={item.reveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className={cn("absolute z-[30] w-[228px] xl:w-[252px]", item.position)}
              >
                <div className={item.rotation}>
                  <FloatingCard item={item} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%] bg-linear-to-b from-transparent to-void"
      />
    </section>
  );
}
