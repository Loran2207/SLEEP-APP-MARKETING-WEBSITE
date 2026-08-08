"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Check } from "lucide-react";

import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { AccentHeading } from "./AccentHeading";
import { FunnelHeader } from "./FunnelHeader";
import { PrimaryAction } from "./PrimaryAction";

type EmailStatus = "idle" | "loading" | "unavailable";
export type EmailSaveStatus = "idle" | "saved" | "unavailable" | "skipped";

type EmailStepProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
  onSaveStatusChange: (status: EmailSaveStatus) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailStep({
  email,
  onEmailChange,
  onBack,
  onContinue,
  onSkip,
  onSaveStatusChange,
}: EmailStepProps) {
  const copy = funnelCopy.email;
  const [status, setStatus] = useState<EmailStatus>("idle");
  const [invalid, setInvalid] = useState(false);

  function handleChange(value: string) {
    onEmailChange(value);
    onSaveStatusChange("idle");
    setInvalid(false);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    // Our own failure must not trap anyone: the second press moves on.
    if (status === "unavailable") {
      onContinue();
      return;
    }

    const normalizedEmail = email.trim();
    const valid =
      normalizedEmail.length <= 254 && EMAIL_PATTERN.test(normalizedEmail);

    if (!valid) {
      setInvalid(true);
      setStatus("idle");
      return;
    }

    onEmailChange(normalizedEmail);
    setInvalid(false);
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        setStatus("unavailable");
        onSaveStatusChange("unavailable");
        return;
      }

      onSaveStatusChange("saved");
      onContinue();
    } catch {
      setStatus("unavailable");
      onSaveStatusChange("unavailable");
    }
  }

  function handleSkip() {
    if (status !== "unavailable") {
      onEmailChange("");
      onSaveStatusChange("skipped");
    }

    onSkip();
  }

  const looksValid = EMAIL_PATTERN.test(email.trim());
  const statusMessage = invalid
    ? copy.invalid
    : status === "unavailable"
      ? copy.unavailable
      : "";

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader onBack={onBack} />

      <form
        className="flex flex-1 flex-col pt-9"
        noValidate
        aria-busy={status === "loading"}
        onSubmit={handleSubmit}
      >
        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="max-w-[390px]"
        />
        <p className="mt-5 max-w-[380px] text-pretty text-[16px] leading-[1.62] text-ink-2">
          {copy.body}
        </p>

        <label
          htmlFor="plan-email"
          className="mt-9 text-[14px] font-medium text-ink"
        >
          {copy.label}
        </label>
        <div className="relative mt-3">
          <input
            id="plan-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.placeholder}
            required
            value={email}
            aria-invalid={invalid}
            aria-describedby="email-status"
            onChange={(event) => handleChange(event.currentTarget.value)}
            className={cn(
              "rim h-15 w-full rounded-card border bg-surface/86 pl-5 pr-12 text-[16px] text-ink transition-[background-color,border-color,box-shadow] duration-150 placeholder:text-muted motion-reduce:transition-none",
              invalid
                ? "border-coral ring-1 ring-coral/45"
                : "border-hair hover:border-hair-strong focus:border-blue focus:ring-1 focus:ring-blue/35",
            )}
          />
          {looksValid && !invalid ? (
            <Check
              aria-hidden="true"
              size={19}
              strokeWidth={2}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mint"
            />
          ) : null}
        </div>

        <p
          id="email-status"
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            "mt-3 min-h-6 text-pretty text-[14px] leading-[1.5]",
            statusMessage ? "text-coral" : "text-ink-2",
          )}
        >
          {statusMessage}
        </p>

        <div className="mt-8 rounded-card border border-hair bg-surface/45 px-5 py-4">
          <p className="text-[13px] font-medium text-ink-2">
            {copy.savesLabel}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {copy.saves.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-mint"
                />
                <span className="text-[14px] leading-[1.45] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-10">
          <PrimaryAction type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? copy.saving
              : status === "unavailable"
                ? copy.continueAnyway
                : copy.primary}
          </PrimaryAction>
          <button
            type="button"
            onClick={handleSkip}
            className="mx-auto mt-4 block min-h-11 px-4 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
          >
            {copy.skip}
          </button>
        </div>
      </form>
    </section>
  );
}