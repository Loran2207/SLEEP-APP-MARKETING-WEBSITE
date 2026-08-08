"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Medallion } from "@/components/ambient/Medallion";
import { AppStoreBadge } from "@/components/brand/marks";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

import type { EmailSaveStatus } from "./EmailStep";
import { FunnelHeader } from "./FunnelHeader";

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
    <section className="flex min-h-[100dvh] flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
      <FunnelHeader />

      <div className="mt-4">
        <Medallion hue="mint" size={56}>
          <Check aria-hidden="true" size={24} strokeWidth={2} />
        </Medallion>
      </div>

      <h1 className="mt-5 text-[24px] leading-[1.22] font-medium tracking-[-0.025em] text-ink">
        {copy.headingBefore}
        <span className="text-blue whitespace-nowrap">{copy.headingAccent}</span>
        {copy.headingAfter}
      </h1>

      <ol className="mt-6 w-full border-t border-hair">
        <li className="flex gap-3 border-b border-hair py-4">
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-hair-strong bg-white/[0.04] text-[13px] font-medium text-ink-2">
            1
          </span>
          <p className="min-w-0 flex-1 pt-[3px] text-[15px] leading-[1.5] text-ink">
            {copy.steps.download}
          </p>
        </li>

        <li className="flex gap-3 border-b border-hair py-4">
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-hair-strong bg-white/[0.04] text-[13px] font-medium text-ink-2">
            2
          </span>
          <div className="min-w-0 flex-1 pt-[3px]">
            <p id={loginLabelId} className="text-[15px] leading-[1.5] text-ink">
              {email ? copy.steps.login : copy.steps.loginFallback}
            </p>
            {email ? (
              <div className="relative mt-2.5">
                <input
                  ref={inputRef}
                  type="email"
                  readOnly
                  value={email}
                  aria-labelledby={loginLabelId}
                  className="h-[46px] w-full rounded-[12px] border border-hair bg-surface/70 pl-3.5 pr-11 text-[14px] text-ellipsis text-ink focus:border-blue/60 focus:ring-1 focus:ring-blue/30 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={copy.copyEmail}
                  onClick={handleCopy}
                  className={cn(
                    "absolute top-1/2 right-1 grid h-9 -translate-y-1/2 place-items-center rounded-[9px] px-2.5 transition-colors duration-150 motion-reduce:transition-none",
                    copied ? "text-mint" : "text-muted hover:text-ink",
                  )}
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5 text-[12px] font-medium">
                      <Check aria-hidden="true" size={14} strokeWidth={2.2} />
                      {copy.copied}
                    </span>
                  ) : (
                    <Copy aria-hidden="true" size={15} strokeWidth={1.8} />
                  )}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copied ? copy.copied : ""}
                </span>
              </div>
            ) : null}
          </div>
        </li>

        <li className="flex gap-3 border-b border-hair py-4">
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-hair-strong bg-white/[0.04] text-[13px] font-medium text-ink-2">
            3
          </span>
          <p className="min-w-0 flex-1 pt-[3px] text-[15px] leading-[1.5] text-ink">
            {copy.steps.start}
          </p>
        </li>
      </ol>

      <p className="mt-4 max-w-[340px] text-pretty text-[12px] leading-[1.55] text-muted">
        {answersLine}
      </p>

      <div className="mt-6 flex flex-col items-start">
        <button
          type="button"
          aria-disabled="true"
          aria-describedby="store-note"
          className="block cursor-not-allowed rounded-[9px] border border-white/25 bg-black p-px opacity-80"
        >
          <AppStoreBadge className="h-11 w-auto" />
        </button>
        <p
          id="store-note"
          className="mt-2 max-w-[320px] text-pretty text-[12px] leading-[1.55] text-muted"
        >
          {copy.storeNote}
        </p>
      </div>

      <p className="mt-5 text-[13px] text-ink-2">{copy.qrLead}</p>

      <div className="relative mt-3 size-[148px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/funnel/qr-start.svg"
          alt={QR_ALT}
          className="h-full w-full"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-void"
        >
          <span
            className="relative block size-7 overflow-hidden rounded-full"
            style={{
              background:
                "radial-gradient(circle at 34% 28%, #ffffff 0%, #f2f4f8 60%, #dceaff 100%)",
            }}
          >
            <span
              className="absolute rounded-full bg-void"
              style={{ width: 22, height: 22, left: 10, top: -4 }}
            />
          </span>
        </span>
      </div>
    </section>
  );
}
