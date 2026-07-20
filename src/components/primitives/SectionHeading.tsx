"use client";

import { motion } from "motion/react";

import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  before: string;
  accent: string;
  after?: string;
  sub?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  before,
  accent,
  after,
  sub,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      <h2 className="max-w-[15ch] text-balance text-[32px] leading-[1.08] font-medium tracking-[-0.03em] text-ink md:max-w-[19ch] md:text-[52px]">
        {before}<span className="accent-serif">{accent}</span>{after}
      </h2>
      {sub ? (
        <p className="mt-5 max-w-[620px] text-pretty text-[17px] text-ink-2 md:text-[19px]">
          {sub}
        </p>
      ) : null}
    </motion.div>
  );
}
