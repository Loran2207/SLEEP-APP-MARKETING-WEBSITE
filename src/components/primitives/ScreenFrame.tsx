import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type ScreenHue = "blue" | "coral" | "mint" | "violet";

type ScreenFrameProps = {
  src: ImageProps["src"];
  alt: string;
  className?: string;
  priority?: boolean;
  hue?: ScreenHue;
  glow?: boolean;
};

const hueTokens: Record<ScreenHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

const underlightMask =
  "radial-gradient(ellipse at center, black 0%, rgb(0 0 0 / 0.9) 42%, transparent 78%)";

export function ScreenFrame({
  src,
  alt,
  className,
  priority = false,
  hue = "blue",
  glow = true,
}: ScreenFrameProps) {
  const hueToken = hueTokens[hue];
  const underlightStyle: CSSProperties = {
    backgroundImage: `radial-gradient(ellipse at center, color-mix(in srgb, ${hueToken} 56%, transparent) 0%, color-mix(in srgb, ${hueToken} 24%, transparent) 40%, transparent 74%)`,
    maskImage: underlightMask,
    WebkitMaskImage: underlightMask,
  };

  return (
    <div className={cn("relative isolate", className)}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[30%] bottom-[8%] -z-10 h-[48%] blur-[80px]"
          style={underlightStyle}
        />
      ) : null}

      <div className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10 ring-inset">
        <Image
          src={src}
          alt={alt}
          width={804}
          height={1748}
          priority={priority}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 402px"
          className="h-auto w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_bottom,transparent,var(--color-void))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-[8%] left-[8%] h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.10),transparent)]"
        />
      </div>
    </div>
  );
}
