"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Moon } from "lucide-react";

import { AppStoreBadge } from "@/components/brand/marks";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import { AccentHeading } from "./AccentHeading";
import type { EmailSaveStatus } from "./EmailStep";
import { BrandPill } from "./QuestionChrome";

const QR_ALT = "QR code that opens this Sleep site";

type DoneStepProps = {
  email?: string;
  emailSaveStatus: EmailSaveStatus;
};

export function DoneStep({ email, emailSaveStatus }: DoneStepProps) {
  const copy = funnelCopy.done;
  const loginLabelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  async function handleCopy() {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; leave the address selected for a manual copy.
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }

  const answersLine =
    emailSaveStatus === "saved"
      ? copy.answers
      : emailSaveStatus === "unavailable"
        ? copy.answersUnavailable
        : copy.answersSkipped;

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pt-[max(24px,env(safe-area-inset-top))] pb-[max(28px,env(safe-area-inset-bottom))]">
      <div className="flex justify-center">
        <BrandPill />
      </div>

      <div className="relative mx-auto mt-9 grid place-items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-[230px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at center, rgba(93,221,179,0.2), transparent 72%)",
          }}
        />
        <span
          aria-hidden="true"
          className="rim relative grid size-[76px] place-items-center rounded-full border border-mint/50 bg-mint/12 text-mint"
        >
          <Check aria-hidden="true" size={34} strokeWidth={2.2} />
        </span>
      </div>

      <AccentHeading
        before={copy.headingBefore}
        accent={copy.headingAccent}
        after={copy.headingAfter}
        className="mx-auto mt-7 max-w-[380px] text-center"
      />

      <ol className="mx-auto mt-9 w-full max-w-[380px] border-t border-hair">
        <li className="flex gap-4 border-b border-hair py-5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-mint/40 bg-mint/10 text-[14px] font-medium text-mint">
            1
          </span>
          <p className="min-w-0 flex-1 pt-1 text-[16px] leading-[1.55] text-ink">
            {copy.steps.download}
          </p>
        </li>

        <li className="flex gap-4 border-b border-hair py-5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-blue/40 bg-blue/10 text-[14px] font-medium text-blue">
            2
          </span>
          <div className="min-w-0 flex-1 pt-1">
            <p
              id={loginLabelId}
              className="text-[16px] leading-[1.55] text-ink"
            >
              {email ? copy.steps.login : copy.steps.loginFallback}
            </p>
            {email ? (
              <div className="relative mt-3">
                <input
                  ref={inputRef}
                  type="email"
                  readOnly
                  value={email}
                  aria-labelledby={loginLabelId}
                  className="h-13 w-full rounded-[14px] border border-hair bg-surface/70 pl-4 pr-12 text-[15px] text-ellipsis text-ink focus:border-blue/60 focus:ring-1 focus:ring-blue/30 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={copy.copyEmail}
                  onClick={handleCopy}
                  className={cn(
                    "absolute top-1/2 right-1.5 grid h-10 -translate-y-1/2 place-items-center rounded-[10px] px-2.5 transition-colors duration-150 motion-reduce:transition-none",
                    copied ? "text-mint" : "text-muted hover:text-ink",
                  )}
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5 text-[13px] font-medium">
                      <Check aria-hidden="true" size={15} strokeWidth={2.2} />
                      {copy.copied}
                    </span>
                  ) : (
                    <Copy aria-hidden="true" size={16} strokeWidth={1.8} />
                  )}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? copy.copied : ""}
                </span>
              </div>
            ) : null}
          </div>
        </li>

        <li className="flex gap-4 border-b border-hair py-5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-violet/40 bg-violet/10 text-[14px] font-medium text-violet">
            3
          </span>
          <p className="min-w-0 flex-1 pt-1 text-[16px] leading-[1.55] text-ink">
            {copy.steps.start}
          </p>
        </li>
      </ol>

      <p className="mx-auto mt-5 max-w-[360px] text-pretty text-center text-[13px] leading-[1.55] text-muted">
        {answersLine}
      </p>

      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          aria-disabled="true"
          aria-describedby="store-note"
          className="block cursor-not-allowed rounded-[10px] border border-white/25 bg-black p-px opacity-80"
        >
          <AppStoreBadge className="h-[52px] w-auto" />
        </button>
        <p
          id="store-note"
          className="mt-3 max-w-[320px] text-pretty text-center text-[13px] leading-[1.55] text-muted"
        >
          {copy.storeNote}
        </p>
      </div>

      <p className="mt-8 text-center text-[14px] text-ink-2">{copy.qrLead}</p>

      <div className="relative mx-auto mt-4 size-40 rounded-[16px] bg-white p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/funnel/qr-start.svg"
          alt={QR_ALT}
          className="h-full w-full"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[9px] bg-void"
        >
          <Moon aria-hidden="true" size={18} strokeWidth={1.8} className="text-mint" />
        </span>
      </div>
    </section>
  );
}
