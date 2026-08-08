"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { ReviewCard } from "./ReviewCard";

type AnalyzingStepProps = {
  onComplete: () => void;
  /** Freeze the master progress at this value and never complete. Capture-board only. */
  holdAt?: number;
};

type RowState = "pending" | "active" | "complete";

const FULL_DURATION = 7.6;
const REDUCED_DURATION = 0.6;
/** Each line owns a 0-100 slice of the master progress value. */
const SLICE = 100;

// Not in funnelCopy.analyzing yet; local until the shared copy adds it.
const REVIEWS_GROUP_LABEL = "Reviews";

function AnalyzingRow({
  label,
  index,
  progress,
  state,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  state: RowState;
}) {
  const rowProgress = useTransform(progress, (latest) =>
    Math.min(SLICE, Math.max(0, latest - index * SLICE)),
  );
  const fillWidth = useTransform(rowProgress, (latest) => `${latest}%`);
  const percentRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(rowProgress, "change", (latest) => {
    if (percentRef.current) {
      percentRef.current.textContent = `${Math.round(latest)}%`;
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "text-[14px] transition-colors duration-300 motion-reduce:transition-none",
            state === "pending" ? "text-faint" : "text-ink",
          )}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex items-center gap-1.5 text-[13px] tabular-nums",
            state === "pending" ? "text-faint" : "text-ink-2",
          )}
        >
          {state === "complete" ? (
            <Check
              size={12}
              strokeWidth={2.4}
              className="shrink-0 text-blue"
            />
          ) : null}
          <span ref={percentRef}>{state === "complete" ? "100%" : "0%"}</span>
        </span>
      </div>
      <div
        aria-hidden="true"
        className="h-[2.5px] w-full overflow-hidden rounded-full bg-hair"
      >
        <motion.span
          className="block h-full rounded-full bg-blue"
          style={{
            width: fillWidth,
            boxShadow:
              "0 0 8px color-mix(in srgb, var(--color-blue) 35%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

export function AnalyzingStep({ onComplete, holdAt }: AnalyzingStepProps) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const completionTimer = useRef<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [done, setDone] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const copy = funnelCopy.analyzing;
  const total = copy.lines.length * SLICE;

  useMotionValueEvent(progress, "change", (latest) => {
    const next = Math.min(Math.floor(latest / SLICE), copy.lines.length - 1);
    setActiveStage((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (holdAt != null) {
      progress.set(Math.min(holdAt, total));
      return;
    }

    const duration = reduceMotion ? REDUCED_DURATION : FULL_DURATION;
    const controls = animate(progress, total, {
      duration,
      ease: "linear",
      onComplete: () => {
        setDone(true);
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
  }, [copy.announcement, holdAt, onComplete, progress, reduceMotion, total]);

  return (
    <section className="flex min-h-[100dvh] flex-col items-center px-5 pt-[max(56px,env(safe-area-inset-top))] pb-[max(32px,env(safe-area-inset-bottom))] text-center">
      <div className="w-full max-w-[250px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center py-10">
        <h1 className="max-w-[310px] text-balance text-[30px] leading-[1.16] font-medium tracking-[-0.03em] text-ink">
          {copy.title}
        </h1>

        <div className="mt-10 flex w-full max-w-[344px] flex-col gap-5 text-left">
          {copy.lines.map((line, index) => (
            <AnalyzingRow
              key={line}
              label={line}
              index={index}
              progress={progress}
              state={
                done || index < activeStage
                  ? "complete"
                  : index === activeStage
                    ? "active"
                    : "pending"
              }
            />
          ))}
        </div>

        <p className="mt-10 max-w-[310px] text-pretty text-[14px] text-ink-2">
          {copy.trustedBefore}
          <span className="font-medium text-blue">{copy.trustedCount}</span>
          {copy.trustedAfter}
        </p>

        <div
          role="group"
          aria-label={REVIEWS_GROUP_LABEL}
          tabIndex={0}
          className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 self-stretch overflow-x-auto scroll-px-5 rounded-[20px] px-5 py-1 text-left [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-hair-strong [&::-webkit-scrollbar]:hidden"
        >
          {copy.reviews.map((review, index) => (
            <div key={index} className="w-[268px] shrink-0 snap-center">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
