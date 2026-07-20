import type { Variants } from "motion/react";

/**
 * Blur-to-focus reveals are the site's signature. Reduced motion is handled
 * globally by the layout's MotionConfig.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

const revealTransition = {
  duration: 0.7,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: revealTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(12px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: revealTransition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: revealTransition },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export function stagger(gap = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        duration: 0.7,
        ease: EASE,
        staggerChildren: gap,
        delayChildren,
      },
    },
  };
}

export const viewportOnce = { once: true, margin: "-90px" } as const;
export const viewportEdge = { once: true } as const;
