"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { faq } from "@/data/content";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <Eyebrow>Questions</Eyebrow>
      <div className="mt-6">
        <SectionHeading before="Answers before you " accent="ask" after="" />
      </div>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-14 max-w-[760px] md:mt-16"
      >
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const triggerId = `faq-trigger-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <motion.div
              key={item.q}
              variants={fadeUp}
              className="border-t border-hair last:border-b"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="min-w-0 text-[17px] font-medium text-ink">
                  {item.q}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 text-muted transition-[color,transform] duration-200 group-hover:text-ink-2 group-focus-visible:text-blue",
                    isOpen && "rotate-180 text-blue",
                  )}
                />
              </button>

              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{
                  gridTemplateRows: { duration: 0.3, ease: EASE },
                  opacity: {
                    duration: 0.18,
                    delay: isOpen ? 0.05 : 0,
                    ease: EASE,
                  },
                }}
                className="grid"
              >
                <div className="overflow-hidden">
                  <p className="max-w-[64ch] pr-10 pb-6 text-[15px] leading-[1.65] text-ink-2 md:pr-12 md:pb-7">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

export default Faq;
