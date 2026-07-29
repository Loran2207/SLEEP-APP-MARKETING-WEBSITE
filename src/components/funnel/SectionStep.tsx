import { funnelCopy, type FunnelHue } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { PrimaryAction } from "./PrimaryAction";

type SectionStepProps = {
  section: {
    part: number;
    total: number;
    title: string;
    body: string;
    hue: FunnelHue;
  };
  onContinue: () => void;
};

const partColor: Record<FunnelHue, string> = {
  blue: "text-blue",
  coral: "text-coral",
  mint: "text-mint",
  violet: "text-violet",
};

const dotColor: Record<FunnelHue, string> = {
  blue: "bg-blue",
  coral: "bg-coral",
  mint: "bg-mint",
  violet: "bg-violet",
};

/** The app's "Part 1 of 3" divider between the blocks of questions. */
export function SectionStep({ section, onContinue }: SectionStepProps) {
  const dots = Array.from({ length: section.total }, (_, index) => index);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p
          className={cn(
            "text-[13px] font-medium tracking-[0.02em]",
            partColor[section.hue],
          )}
        >
          Part {section.part} of {section.total}
        </p>

        <h1 className="mt-4 text-[32px] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
          {section.title}
        </h1>

        <p className="mt-4 max-w-[300px] text-pretty text-[15px] leading-[1.5] text-ink-2">
          {section.body}
        </p>

        <div aria-hidden="true" className="mt-8 flex items-center gap-2">
          {dots.map((index) => {
            const done = index <= section.part - 1;
            const current = index === section.part - 1;

            return (
              <span
                key={index}
                className={cn(
                  "h-2 rounded-full transition-[width] duration-300 motion-reduce:transition-none",
                  current ? "w-[26px]" : "w-2",
                  done ? dotColor[section.hue] : "bg-white/14",
                )}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <PrimaryAction onClick={onContinue}>
          {funnelCopy.sections.primary}
        </PrimaryAction>
      </div>
    </section>
  );
}