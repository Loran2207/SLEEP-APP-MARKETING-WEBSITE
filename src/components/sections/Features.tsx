"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";

import { Aurora } from "@/components/ambient/Aurora";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ScreenFrame } from "@/components/primitives/ScreenFrame";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { features, nav } from "@/data/content";
import { EASE, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 7000;
const AUTO_ADVANCE_SECONDS = AUTO_ADVANCE_MS / 1000;

type FeatureTab = (typeof features.tabs)[number];

// Keyed on the whole palette rather than on the hues that happen to be in the data
// right now, so re-colouring a tab never breaks the build.
const hueTokens: Record<"blue" | "coral" | "mint" | "violet", string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

const featuresEyebrow = nav.links.find(
  (link) => link.href === `#${features.id}`,
)?.label;

type FeatureProgressProps = {
  tab: FeatureTab;
  paused: boolean;
  autoAdvanceStopped: boolean;
  reducedMotion: boolean | null;
  restartKey: number;
};

function FeatureProgress({
  tab,
  paused,
  autoAdvanceStopped,
  reducedMotion,
  restartKey,
}: FeatureProgressProps) {
  const controls = useAnimationControls();
  const previousRestartKey = useRef(restartKey);

  useEffect(() => {
    if (previousRestartKey.current !== restartKey) {
      controls.set({ scaleX: 0 });
      previousRestartKey.current = restartKey;
    }

    if (autoAdvanceStopped || reducedMotion) {
      controls.set({ scaleX: 1 });
      return;
    }

    if (paused) {
      controls.stop();
      return;
    }

    void controls.start({
      scaleX: 1,
      transition: { duration: AUTO_ADVANCE_SECONDS, ease: "linear" },
    });

    return () => controls.stop();
  }, [autoAdvanceStopped, controls, paused, reducedMotion, restartKey]);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={controls}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
      style={{
        backgroundColor: hueTokens[tab.hue],
        transformOrigin: "left",
      }}
    />
  );
}

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [restartKey, setRestartKey] = useState(0);
  const [pointerPaused, setPointerPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeTab = features.tabs[activeIndex];

  useEffect(() => {
    if (pointerPaused || reducedMotion || userInteracted) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % features.tabs.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, pointerPaused, reducedMotion, restartKey, userInteracted]);

  function selectTab(index: number) {
    setActiveIndex(index);
    setRestartKey((key) => key + 1);
    setUserInteracted(true);
  }

  return (
    <Section id={features.id}>
      <div
        onPointerEnter={() => setPointerPaused(true)}
        onPointerLeave={() => setPointerPaused(false)}
      >
        <div className="mx-auto max-w-[720px]">
          <Eyebrow>{featuresEyebrow}</Eyebrow>
          <div className="mt-7 [&_p]:text-balance">
            <SectionHeading {...features.heading} sub={features.sub} />
          </div>
        </div>

        <div className="mt-12 grid min-w-0 items-start gap-12 md:mt-16 lg:grid-cols-[1fr_auto] xl:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="min-h-[400px] min-w-0 w-full md:min-h-[420px] lg:pt-6"
          >
            <div>
              {features.tabs.map((tab, index) => {
                const isActive = index === activeIndex;
                const buttonId = `feature-tab-${tab.id}`;
                const panelId = `feature-panel-${tab.id}`;

                return (
                  <div
                    key={tab.id}
                    className="relative border-b border-hair last:border-b-0"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={isActive ? panelId : undefined}
                      onClick={() => selectTab(index)}
                      className={cn(
                        "w-full py-5 text-left text-[18px] leading-7 font-medium whitespace-nowrap transition-colors duration-150 md:text-[20px]",
                        isActive ? "text-ink" : "text-muted hover:text-ink-2",
                      )}
                    >
                      {tab.label}
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          aria-live="polite"
                          aria-atomic="true"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[560px] pb-6">
                            <p className="text-[15px] leading-6 text-ink">
                              {tab.title}
                            </p>
                            <p className="mt-2 text-[15px] leading-6 text-ink-2">
                              {tab.body}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    {isActive ? (
                      <FeatureProgress
                        key={tab.id}
                        tab={tab}
                        paused={pointerPaused}
                        autoAdvanceStopped={userInteracted}
                        reducedMotion={reducedMotion}
                        restartKey={restartKey}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative flex w-full justify-center lg:w-auto"
          >
            <div className="pointer-events-none absolute -inset-x-32 -inset-y-20 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_100%)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`aurora-${activeTab.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Aurora hues={[activeTab.hue]} intensity="soft" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative aspect-[201/437] w-[280px] shrink-0 lg:w-[320px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-x-0 top-0"
                >
                  <ScreenFrame
                    src={activeTab.shot}
                    alt={activeTab.shotAlt}
                    hue={activeTab.hue}
                    className="w-[280px] lg:w-[320px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default Features;
