import Image from "next/image";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { AppScreenStack } from "./AppScreenStack";
import { PrimaryAction } from "./PrimaryAction";

type WelcomeStepProps = {
  onStart: () => void;
};

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  const copy = funnelCopy.welcome;
  const screens = [
    {
      src: "/app/home.webp",
      alt: copy.screens.home,
      hue: "blue",
      slot: "center",
    },
    {
      src: "/app/practice-session.webp",
      alt: copy.screens.practice,
      hue: "blue",
      slot: "left",
    },
    {
      src: "/app/sounds-player.webp",
      alt: copy.screens.sounds,
      hue: "coral",
      slot: "right",
    },
  ] as const;

  return (
    <section className="relative isolate grid min-h-[100dvh] grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-hidden px-5 pt-[max(26px,env(safe-area-inset-top))] pb-[max(18px,env(safe-area-inset-bottom))]">
      <Image
        src="/art/hero-night.webp"
        alt=""
        fill
        priority
        sizes="430px"
        aria-hidden="true"
        className="pointer-events-none -z-10 object-cover opacity-[0.58]"
        style={{
          maskImage:
            "radial-gradient(ellipse 52% 52% at 50% 47%, black 0%, black 36%, rgb(0 0 0 / 0.92) 50%, rgb(0 0 0 / 0.5) 72%, rgb(0 0 0 / 0) 91%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 52% 52% at 50% 47%, black 0%, black 36%, rgb(0 0 0 / 0.92) 50%, rgb(0 0 0 / 0.5) 72%, rgb(0 0 0 / 0) 91%)",
        }}
      />

      <div className="mx-auto w-full max-w-[250px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <div className="mt-4 text-center">
        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="mx-auto max-w-[370px] text-[36px] leading-[1.06]"
        />
        <p className="mx-auto mt-3 max-w-[340px] text-pretty text-[15px] leading-[1.5] text-ink-2">
          {copy.body}
        </p>
      </div>

      <AppScreenStack
        screens={screens}
        priority
        size="hero"
        className="h-full min-h-[340px] max-h-[510px]"
      />

      <div className="text-center">
        <PrimaryAction onClick={onStart}>{copy.primary}</PrimaryAction>
        <p className="mt-3 text-[13px] text-ink-2">{copy.timing}</p>
        <p className="mt-2 text-[12px] leading-[1.45] text-muted">
          {copy.trust}
        </p>
      </div>
    </section>
  );
}
