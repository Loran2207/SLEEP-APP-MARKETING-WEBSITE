import { User } from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import { PrimaryAction } from "./PrimaryAction";

type ProfileIntroStepProps = {
  onContinue: () => void;
};

/** The app's "Let's build your sleep profile" screen. */
export function ProfileIntroStep({ onContinue }: ProfileIntroStepProps) {
  const copy = funnelCopy.profileIntro;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Medallion hue="coral" size={116}>
          <User aria-hidden="true" size={46} strokeWidth={1.4} />
        </Medallion>

        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="mt-8 max-w-[360px]"
        />

        <p className="mt-4 max-w-[330px] text-pretty text-[15px] leading-[1.55] text-ink-2">
          {copy.body}
        </p>
      </div>

      <div className="mt-8">
        <PrimaryAction onClick={onContinue}>{copy.primary}</PrimaryAction>
      </div>
    </section>
  );
}