"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MoonStar } from "lucide-react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { Medallion } from "@/components/ambient/Medallion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

type AnalyzingStepProps = {
  onComplete: () => void;
};

const FULL_DURATION = 4.5;
const REDUCED_DURATION = 0.72;

export function AnalyzingStep({ onComplete }: AnalyzingStepProps) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const displayProgress = useTransform(progress, (latest) =>
    Math.round(latest),
  );
  const percentRef = useRef<HTMLSpanElement>(null);
  const completionTimer = useRef<number | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [completeStages, setCompleteStages] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const copy = funnelCopy.analyzing;

  useMotionValueEvent(displayProgress, "change", (latest) => {
    if (percentRef.current) {
      percentRef.current.textContent = `${latest}%`;
    }

    const nextStage = Math.min(Math.floor(latest / 25), copy.lines.length - 1);
    const nextComplete = Math.min(Math.floor(latest / 25), copy.lines.length);
    setCurrentStage((current) => (current === nextStage ? current : nextStage));
    setCompleteStages((current) =>
      current === nextComplete ? current : nextComplete,
    );
  });

  useEffect(() => {
    const duration = reduceMotion ? REDUCED_DURATION : FULL_DURATION;
    const controls = animate(progress, 100, {
      duration,
      ease: "linear",
      onComplete: () => {
        setCompleteStages(copy.lines.length);
        setAnnouncement(copy.announcement);
        completionTimer.current = window.setTimeout(
          onComplete,
          reduceMotion ? 40 : 180,
        );
      },
    });

    return () => {
      if (completionTimer.current) {
        window.clearTimeout(completionTimer.current);
      }
      controls.stop();
    };
  }, [copy.announcement, copy.lines.length, onComplete, progress, reduceMotion]);

  return (
    <section className="flex min-h-[100dvh] flex-col items-center px-5 pt-[max(56px,env(safe-area-inset-top))] pb-[max(32px,env(safe-area-inset-bottom))] text-center">
      <div className="w-full max-w-[250px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="relative">
          <span
            aria-hidden="true"
            className="animate-breathe absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-blue)_22%,transparent)_0%,color-mix(in_srgb,var(--color-violet)_8%,transparent)_48%,transparent_72%)] blur-[10px]"
          />
          <Medallion hue="blue" size={92}>
            <MoonStar aria-hidden="true" size={33} strokeWidth={1.35} />
          </Medallion>
        </div>

        <h1 className="mt-10 text-balance text-[30px] leading-[1.16] font-medium tracking-[-0.03em] text-ink">
          {copy.title}
        </h1>

        <p aria-hidden="true" className="mt-4 font-medium text-blue">
          <span ref={percentRef}>0%</span>
        </p>

        <div className="mt-9 flex w-full max-w-[300px] flex-col gap-4 text-left">
          {copy.lines.map((line, index) => {
            const complete = index < completeStages;
            const active = index === currentStage && !complete;

            return (
              <div
                key={line}
                className={cn(
                  "flex items-center gap-3 text-[15px] transition-colors duration-300 motion-reduce:transition-none",
                  complete || active ? "text-ink" : "text-faint",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-6 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none",
                    complete
                      ? "border-blue/40 bg-blue/12 text-blue"
                      : active
                        ? "border-blue/40 bg-blue/8 text-transparent"
                      : "border-hair text-transparent",
                  )}
                >
                  <Check size={13} strokeWidth={2.2} />
                </span>
                <span>{line}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
