"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { faq } from "@/data/content";
import { EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
                    "shrink-0 transition-[color,transform] duration-200 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                    isOpen
                      ? "rotate-180 text-blue group-hover:text-blue"
                      : "text-muted group-hover:text-ink-2 group-focus-visible:text-blue",
                  )}
                />
              </button>

              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: isOpen ? 0.42 : 0.2, ease: EASE }
                }
                className="pointer-events-none relative -mt-px h-px"
              >
                <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,color-mix(in srgb, var(--color-blue) 14%, transparent)_18%,color-mix(in srgb, var(--color-blue) 52%, transparent)_50%,color-mix(in srgb, var(--color-blue) 14%, transparent)_82%,transparent_100%)]" />
                <span className="absolute inset-x-[12%] -inset-y-2 bg-[radial-gradient(ellipse_at_center,color-mix(in srgb, var(--color-blue) 16%, transparent)_0%,color-mix(in srgb, var(--color-blue) 6%, transparent)_38%,transparent_74%)] blur-[5px]" />
              </motion.div>

              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        gridTemplateRows: {
                          duration: isOpen ? 0.46 : 0.34,
                          ease: EASE,
                        },
                      }
                }
                className="grid"
              >
                <div className="overflow-hidden">
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: isOpen ? 0.3 : 0.16,
                            delay: isOpen ? 0.09 : 0,
                            ease: EASE,
                          }
                    }
                    className="max-w-[64ch] pr-10 pb-6 text-[15px] leading-[1.65] text-ink-2 md:pr-12 md:pb-7"
                  >
                    {item.a}
                  </motion.p>
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
