"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { AccentHeading } from "./AccentHeading";
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

    const normalizedEmail = email.trim();
    const valid =
      normalizedEmail.length <= 254 &&
      EMAIL_PATTERN.test(normalizedEmail);

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

  const statusMessage = invalid
    ? copy.invalid
    : status === "unavailable"
      ? copy.unavailable
      : "";
  const describedBy = statusMessage ? "email-status" : undefined;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(18px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]">
      <header className="flex items-center gap-3">
        <button
          type="button"
          aria-label={funnelCopy.actions.back}
          onClick={onBack}
          className="grid size-11 shrink-0 place-items-center text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" size={21} strokeWidth={1.6} />
        </button>
        <div className="min-w-0 flex-1">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
        </div>
        <span aria-hidden="true" className="size-11 shrink-0" />
      </header>

      <div className="flex flex-1 flex-col justify-center py-12">
        <AccentHeading
          before={copy.headingBefore}
          accent={copy.headingAccent}
          after={copy.headingAfter}
          className="max-w-[390px]"
        />
        <p className="mt-5 max-w-[380px] text-pretty text-[16px] leading-[1.62] text-ink-2">
          {copy.body}
        </p>

        <form
          className="mt-9"
          noValidate
          aria-busy={status === "loading"}
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="plan-email"
            className="text-[14px] font-medium text-ink"
          >
            {copy.label}
          </label>
          <input
            id="plan-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onChange={(event) => handleChange(event.currentTarget.value)}
            className={cn(
              "rim mt-3 h-15 w-full rounded-card border bg-surface/86 px-5 text-[16px] text-ink transition-[background-color,border-color,box-shadow] duration-150 motion-reduce:transition-none",
              invalid
                ? "border-coral ring-1 ring-coral/45"
                : "border-hair hover:border-hair-strong focus:border-blue",
            )}
          />

          <p
            id="email-status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "mt-3 min-h-11 text-pretty text-[14px] leading-[1.5]",
              statusMessage ? "text-coral" : "text-ink-2",
            )}
          >
            {statusMessage}
          </p>

          <div className="mt-4">
            <PrimaryAction
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? copy.saving : copy.primary}
            </PrimaryAction>
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="mx-auto min-h-11 px-4 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
      >
        {copy.skip}
      </button>
    </section>
  );
}
