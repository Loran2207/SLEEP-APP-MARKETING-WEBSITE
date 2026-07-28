import { Apple, Play } from "lucide-react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";

import { AccentHeading } from "./AccentHeading";
import type { EmailSaveStatus } from "./EmailStep";

type DoneStepProps = {
  email?: string;
  emailSaveStatus: EmailSaveStatus;
};

const storeIcons = [Apple, Play] as const;

export function DoneStep({ email, emailSaveStatus }: DoneStepProps) {
  const copy = funnelCopy.done;
  const signInLine = email
    ? `${copy.signInPrefix}${email}`
    : copy.signInFallback;
  const answersLine =
    emailSaveStatus === "saved"
      ? copy.answers
      : emailSaveStatus === "unavailable"
        ? copy.answersUnavailable
        : copy.answersSkipped;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(46px,env(safe-area-inset-top))] pb-[max(28px,env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-[260px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </div>

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mx-auto mt-7 max-w-[380px] text-center"
      />

      <ol className="mt-11 border-t border-hair">
        <li className="flex gap-4 border-b border-hair py-6">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-mint/40 bg-mint/10 text-[14px] font-medium text-mint">
            1
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-medium text-ink">
              {copy.download}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {copy.stores.map((store, index) => {
                const Icon = storeIcons[index];

                return (
                  <button
                    key={store.name}
                    type="button"
                    aria-disabled="true"
                    aria-describedby="store-note"
                    className="rim flex min-h-16 cursor-not-allowed items-center gap-2.5 rounded-[14px] border border-hair bg-surface/72 px-3.5 text-left opacity-65"
                  >
                    <Icon
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.55}
                      className="shrink-0 text-ink-2"
                    />
                    <span className="min-w-0">
                      <span className="block text-[10px] leading-none text-muted">
                        {store.label}
                      </span>
                      <span className="mt-1 block text-[14px] leading-none font-medium text-ink">
                        {store.name}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </li>

        <li className="flex gap-4 border-b border-hair py-6">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-blue/40 bg-blue/10 text-[14px] font-medium text-blue">
            2
          </span>
          <p className="min-w-0 flex-1 break-words pt-1 text-[16px] leading-[1.55] text-ink">
            {signInLine}
          </p>
        </li>

        <li className="flex gap-4 border-b border-hair py-6">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-violet/40 bg-violet/10 text-[14px] font-medium text-violet">
            3
          </span>
          <p className="min-w-0 flex-1 pt-1 text-pretty text-[16px] leading-[1.55] text-ink">
            {answersLine}
          </p>
        </li>
      </ol>

      <p
        id="store-note"
        className="mt-5 text-pretty text-center text-[13px] leading-[1.55] text-muted"
      >
        {copy.storeNote}
      </p>
    </section>
  );
}
