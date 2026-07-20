import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type StarFieldProps = {
  count?: number;
  seed?: number;
  className?: string;
};

type Star = {
  top: number;
  left: number;
  size: 1 | 2;
  opacity: number;
  delay: number;
  duration: number;
};

const DEFAULT_COUNT = 80;
const DEFAULT_SEED = 7283;

function mulberry32(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(count: number, seed: number): Star[] {
  const random = mulberry32(seed);

  return Array.from({ length: count }, (_, index) => {
    const bright = (index + Math.abs(seed)) % 7 === 0;

    return {
      top: random() * 85,
      left: random() * 100,
      size: bright ? 2 : 1,
      opacity: bright ? 0.9 + random() * 0.1 : 0.42 + random() * 0.3,
      delay: random() * 5,
      duration: 2.8 + random() * 3.2,
    };
  });
}

const DEFAULT_STARS = createStars(DEFAULT_COUNT, DEFAULT_SEED);

function getStars(count: number, seed: number) {
  const normalizedCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : DEFAULT_COUNT;
  const normalizedSeed = Number.isFinite(seed) ? Math.trunc(seed) : DEFAULT_SEED;

  if (normalizedCount === DEFAULT_COUNT && normalizedSeed === DEFAULT_SEED) {
    return DEFAULT_STARS;
  }

  return createStars(normalizedCount, normalizedSeed);
}

export function StarField({
  count = DEFAULT_COUNT,
  seed = DEFAULT_SEED,
  className,
}: StarFieldProps) {
  const stars = getStars(count, seed);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {stars.map((star, index) => {
        const style: CSSProperties = {
          top: `${star.top.toFixed(3)}%`,
          left: `${star.left.toFixed(3)}%`,
          width: star.size,
          height: star.size,
          backgroundColor: `rgb(255 255 255 / ${star.opacity.toFixed(3)})`,
          boxShadow: star.size === 2 ? "0 0 5px rgb(255 255 255 / 0.55)" : undefined,
          animationName: "twinkle",
          animationDuration: `${star.duration.toFixed(2)}s`,
          animationDelay: `-${star.delay.toFixed(2)}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        };

        return <span key={`${seed}-${index}`} className="absolute rounded-full" style={style} />;
      })}
    </div>
  );
}
