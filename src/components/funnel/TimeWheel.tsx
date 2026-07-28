"use client";

import { useRef } from "react";

import type { FunnelHue } from "@/data/funnel";
import { cn } from "@/lib/utils";

const ITEM_HEIGHT = 40;
const VISIBLE = 5;
const HALF = Math.floor(VISIBLE / 2);

const bandByHue: Record<FunnelHue, string> = {
  blue: "border-blue/30 bg-blue/[0.14]",
  coral: "border-coral/30 bg-coral/[0.14]",
  mint: "border-mint/30 bg-mint/[0.14]",
  violet: "border-violet/30 bg-violet/[0.14]",
};

type Column = {
  label: string;
  values: readonly number[];
  value: number;
  onChange: (value: number) => void;
};

/**
 * A time wheel that never depends on scroll position: it renders the five
 * values around the selection, so a screenshot always shows the real state.
 */
function WheelColumn({ label, values, value, onChange }: Column) {
  const dragOrigin = useRef<{ y: number; index: number } | null>(null);
  const count = values.length;
  const index = Math.max(0, values.indexOf(value));

  // A clock wheel wraps: 23 sits above 00, 55 sits above 00 minutes.
  function at(position: number) {
    return values[((position % count) + count) % count];
  }

  function moveTo(nextIndex: number) {
    const next = at(nextIndex);

    if (next !== value) {
      onChange(next);
    }
  }

  function moveBy(steps: number) {
    moveTo(index + steps);
  }

  return (
    <div
      role="spinbutton"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={values[0]}
      aria-valuemax={values[values.length - 1]}
      aria-valuenow={value}
      aria-valuetext={String(value).padStart(2, "0")}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          moveBy(event.key === "ArrowUp" ? -1 : 1);
        }
      }}
      onWheel={(event) => {
        event.preventDefault();
        moveBy(event.deltaY > 0 ? 1 : -1);
      }}
      onPointerDown={(event) => {
        dragOrigin.current = { y: event.clientY, index };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const origin = dragOrigin.current;

        if (!origin) {
          return;
        }

        const steps = Math.round((origin.y - event.clientY) / ITEM_HEIGHT);
        moveTo(origin.index + steps);
      }}
      onPointerUp={() => {
        dragOrigin.current = null;
      }}
      onPointerCancel={() => {
        dragOrigin.current = null;
      }}
      className="w-[86px] shrink-0 cursor-grab touch-none select-none rounded-[18px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:cursor-grabbing"
      style={{ height: ITEM_HEIGHT * VISIBLE }}
    >
      {Array.from({ length: VISIBLE }, (_, slot) => {
        const distance = slot - HALF;
        const item = at(index + distance);
        const depth = Math.abs(distance);

        return (
          <div
            key={slot}
            onClick={() => moveBy(distance)}
            className={cn(
              "grid place-items-center tabular-nums transition-colors duration-150 motion-reduce:transition-none",
              depth === 0 && "text-[27px] font-medium tracking-[-0.02em] text-ink",
              depth === 1 && "text-[20px] text-ink-2",
              depth === 2 && "text-[17px] text-muted/70",
            )}
            style={{ height: ITEM_HEIGHT }}
          >
            {String(item).padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}

type TimeWheelProps = {
  hours: number;
  minutes: number;
  minuteStep?: number;
  hue?: FunnelHue;
  onChange: (hours: number, minutes: number) => void;
};

export function TimeWheel({
  hours,
  minutes,
  minuteStep = 5,
  hue = "mint",
  onChange,
}: TimeWheelProps) {
  const hourValues = Array.from({ length: 24 }, (_, index) => index);
  const minuteValues = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, index) => index * minuteStep,
  );
  const snappedMinutes =
    minuteValues.find((value) => value === minutes) ??
    minuteValues[Math.round(minutes / minuteStep) % minuteValues.length];

  return (
    <div
      className="relative flex items-center justify-center gap-1"
      style={{ height: ITEM_HEIGHT * VISIBLE }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-[16px] border",
          bandByHue[hue],
        )}
        style={{ height: ITEM_HEIGHT + 8 }}
      />
      <WheelColumn
        label="Hour"
        values={hourValues}
        value={hours}
        onChange={(value) => onChange(value, snappedMinutes)}
      />
      <span
        aria-hidden="true"
        className="-translate-y-px text-[22px] leading-none font-medium text-ink-2 tabular-nums"
      >
        :
      </span>
      <WheelColumn
        label="Minute"
        values={minuteValues}
        value={snappedMinutes}
        onChange={(value) => onChange(hours, value)}
      />
    </div>
  );
}