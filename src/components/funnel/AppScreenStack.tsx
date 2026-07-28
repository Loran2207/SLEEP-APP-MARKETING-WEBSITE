"use client";

import { motion, useReducedMotion } from "motion/react";

import { ScreenFrame } from "@/components/primitives/ScreenFrame";
import type { FunnelHue } from "@/data/funnel";
import { cn } from "@/lib/utils";

type StackScreen = {
  src: string;
  alt: string;
  hue: FunnelHue;
  slot: "left" | "center" | "right";
};

type AppScreenStackProps = {
  screens: readonly StackScreen[];
  className?: string;
  priority?: boolean;
  size?: "compact" | "hero";
};

const placements = {
  compact: {
    left: {
      outer: "absolute top-[46px] left-[12px] z-10 w-[132px]",
      inner: "-rotate-[6deg]",
    },
    center: {
      outer:
        "absolute top-[4px] left-1/2 z-30 w-[152px] -translate-x-1/2",
      inner: "",
    },
    right: {
      outer: "absolute top-[38px] right-[10px] z-0 w-[134px]",
      inner: "rotate-[6deg]",
    },
  },
  hero: {
    left: {
      outer:
        "absolute top-[calc(50%+20px)] left-[-6px] z-20 w-[188px] -translate-y-1/2 sm:left-[-4px]",
      inner: "-rotate-[5.5deg]",
    },
    center: {
      outer:
        "absolute top-[calc(50%+20px)] left-1/2 z-30 w-[216px] -translate-x-1/2 -translate-y-1/2",
      inner: "",
    },
    right: {
      outer:
        "absolute top-[calc(50%+20px)] right-[-4px] z-10 w-[186px] -translate-y-1/2 sm:right-[-2px]",
      inner: "rotate-[5.5deg]",
    },
  },
} as const;

export function AppScreenStack({
  screens,
  className,
  priority = false,
  size = "compact",
}: AppScreenStackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[370px] overflow-hidden",
        size === "hero" ? "h-[430px]" : "h-[318px]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[12%] right-[10%] bottom-[12%] left-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-blue)_28%,transparent)_0%,color-mix(in_srgb,var(--color-violet)_14%,transparent)_44%,transparent_76%)] blur-[36px]"
      />

      {screens.map((screen, index) => {
        const placement = placements[size][screen.slot];

        return (
          <motion.div
            key={`${screen.slot}-${screen.src}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: screen.slot === "center" ? 18 : 26,
                    scale: 0.98,
                  }
            }
            animate={{
              opacity: screen.slot === "center" ? 1 : 0.78,
              y: 0,
              scale: 1,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.72,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            className={placement.outer}
          >
            <div className={cn("relative", placement.inner)}>
              <ScreenFrame
                src={screen.src}
                alt={screen.alt}
                hue={screen.hue}
                glow={false}
                priority={priority && screen.slot === "center"}
              />
              {screen.slot === "center" ? null : (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[36px] bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.16)_58%,rgba(0,0,0,0.34)_100%)]"
                />
              )}
            </div>
          </motion.div>
        );
      })}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[30%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.72)_58%,var(--color-void)_92%)]"
      />
    </div>
  );
}
