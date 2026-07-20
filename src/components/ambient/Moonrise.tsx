import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type MoonriseIntensity = "soft" | "normal" | "strong";

type MoonriseProps = {
  className?: string;
  size?: number;
  intensity?: MoonriseIntensity;
};

const DEFAULT_SIZE = 620;

const layerOpacity = {
  soft: { disc: 0.14, bloom: 0.85, atmosphere: 0.5, spill: 0.6 },
  normal: { disc: 0.22, bloom: 1, atmosphere: 0.66, spill: 0.78 },
  strong: { disc: 0.32, bloom: 1, atmosphere: 0.85, spill: 0.95 },
} as const;

const wrapperMask =
  "radial-gradient(ellipse 54% 65% at 50% 50%, black 0%, black 46%, rgb(0 0 0 / 0.92) 54%, rgb(0 0 0 / 0.55) 63%, rgb(0 0 0 / 0.12) 70%, transparent 76%)";

const discGradient =
  "radial-gradient(ellipse 88% 76% at 50% 2%, rgb(220 234 255 / 0.55) 0%, rgb(92 155 255 / 0.34) 26%, rgb(92 155 255 / 0.12) 48%, transparent 70%)";

const discMask =
  "linear-gradient(to bottom, black 0%, rgb(0 0 0 / 0.72) 22%, rgb(0 0 0 / 0.32) 36%, rgb(0 0 0 / 0.08) 46%, transparent 58%)";

const bloomGradient =
  "radial-gradient(ellipse 70% 54% at 50% 0%, rgb(92 155 255 / 0.82) 0%, rgb(92 155 255 / 0.64) 16%, rgb(92 155 255 / 0.38) 32%, rgb(157 124 255 / 0.2) 50%, rgb(157 124 255 / 0.08) 68%, transparent 88%)";

const bloomMask =
  "linear-gradient(to bottom, black 0%, rgb(0 0 0 / 0.78) 12%, rgb(0 0 0 / 0.5) 24%, rgb(0 0 0 / 0.24) 36%, transparent 48%)";

const atmosphereGradient =
  "radial-gradient(ellipse at center, rgb(92 155 255 / 0.32) 0%, rgb(92 155 255 / 0.18) 30%, rgb(157 124 255 / 0.12) 52%, rgb(157 124 255 / 0.04) 64%, transparent 74%)";

const spillGradient =
  "linear-gradient(90deg, transparent 0%, rgb(157 124 255 / 0.08) 18%, rgb(92 155 255 / 0.34) 38%, rgb(255 255 255 / 0.82) 50%, rgb(92 155 255 / 0.34) 62%, rgb(157 124 255 / 0.08) 82%, transparent 100%)";

export function Moonrise({
  className,
  size = DEFAULT_SIZE,
  intensity = "normal",
}: MoonriseProps) {
  const discSize = Number.isFinite(size) && size > 0 ? size : DEFAULT_SIZE;
  const frameWidth = Math.round(discSize * 2.1);
  const frameHeight = Math.round(discSize * 1.45);
  const discLeft = Math.round((frameWidth - discSize) / 2);
  const discTop = Math.round(frameHeight * 0.16);
  const horizonTop = Math.round(discTop + discSize * 0.52);
  const atmosphereWidth = Math.round(discSize * 1.8);
  const atmosphereHeight = Math.round(discSize * 0.82);
  const spillWidth = Math.round(discSize * 1.72);
  const opacity = layerOpacity[intensity];
  const wrapperStyle: CSSProperties = {
    width: frameWidth,
    height: frameHeight,
    maskImage: wrapperMask,
    WebkitMaskImage: wrapperMask,
  };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none isolate", className)}
      style={wrapperStyle}
    >
      <div className="relative size-full pointer-events-none">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            top: discTop - Math.round(discSize * 0.12),
            left: Math.round((frameWidth - atmosphereWidth) / 2),
            width: atmosphereWidth,
            height: atmosphereHeight,
            opacity: opacity.atmosphere,
            backgroundImage: atmosphereGradient,
            filter: `blur(${Math.round(discSize * 0.12)}px)`,
          }}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            top: discTop,
            left: discLeft,
            width: discSize,
            height: discSize,
            opacity: opacity.disc,
            backgroundImage: discGradient,
            maskImage: discMask,
            WebkitMaskImage: discMask,
          }}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: discTop,
            left: discLeft,
            width: discSize,
            height: discSize,
            opacity: opacity.bloom,
          }}
        >
          <span
            className="animate-breathe pointer-events-none absolute inset-0 rounded-full"
            style={{
              backgroundImage: bloomGradient,
              filter: `blur(${Math.max(30, Math.round(discSize * 0.09))}px)`,
              maskImage: bloomMask,
              WebkitMaskImage: bloomMask,
            }}
          />
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            top: horizonTop - Math.round(discSize * 0.025),
            left: Math.round((frameWidth - spillWidth) / 2),
            width: spillWidth,
            height: Math.max(12, Math.round(discSize * 0.05)),
            opacity: opacity.spill,
            backgroundImage: spillGradient,
            filter: `blur(${Math.round(discSize * 0.065)}px)`,
          }}
        />
      </div>
    </div>
  );
}
