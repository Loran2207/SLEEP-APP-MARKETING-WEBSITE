"use client";

import { UserRound } from "lucide-react";
import { useState } from "react";

import { funnelCopy } from "@/data/funnel";

import { PrimaryAction } from "./PrimaryAction";
import { QuestionChrome } from "./QuestionChrome";

type NameStepProps = {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

/**
 * The name, asked the way Rest AI asks it: one warm question, one field, and a
 * skip that is a real way out rather than a hidden link. Nothing downstream
 * depends on the answer, so skipping costs the visitor nothing.
 */
export function NameStep({ value, onChange, onContinue, onBack }: NameStepProps) {
  const copy = funnelCopy.name;
  const [touched, setTouched] = useState(false);
  const filled = value.trim().length > 0;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <QuestionChrome stepId="age" hue="coral" onBack={onBack} />

      <div className="flex flex-1 flex-col pt-9">
        <h1 className="max-w-[390px] text-[30px] leading-[1.16] font-medium tracking-[-0.03em] text-ink">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-[360px] text-[15px] leading-[1.5] text-ink-2">
          {copy.body}
        </p>

        <label
          className="mt-8 flex items-center gap-3 rounded-[18px] border px-4 py-4 transition-colors duration-150 motion-reduce:transition-none"
          style={{
            borderColor: touched
              ? "color-mix(in srgb, var(--color-coral) 52%, transparent)"
              : "var(--color-hair)",
            backgroundColor: "rgba(245,245,247,0.035)",
          }}
        >
          <UserRound
            aria-hidden="true"
            size={19}
            strokeWidth={1.7}
            className="shrink-0 text-muted"
          />
          <input
            type="text"
            name="name"
            autoComplete="given-name"
            value={value}
            placeholder={copy.placeholder}
            onFocus={() => setTouched(true)}
            onBlur={() => setTouched(false)}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-faint"
          />
        </label>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryAction onClick={onContinue} disabled={!filled}>
          {copy.primary}
        </PrimaryAction>
        <button
          type="button"
          onClick={onContinue}
          className="mt-4 block w-full text-center text-[14px] font-medium text-muted transition-colors duration-150 hover:text-ink-2 motion-reduce:transition-none"
        >
          {copy.skip}
        </button>
      </div>
    </section>
  );
}