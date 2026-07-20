"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "motion/react";

import { Aurora } from "@/components/ambient/Aurora";
import { SpotlightHalo } from "@/components/ambient/SpotlightHalo";
import { StarField } from "@/components/ambient/StarField";
import { Button } from "@/components/primitives/Button";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { finalCta } from "@/data/content";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SubscribeStatus = "idle" | "loading" | "done" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL_MESSAGE = "Enter a valid email address.";
const LOADING_MESSAGE = "Submitting.";
const SUCCESS_MESSAGE = "You're subscribed.";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
const NETWORK_ERROR_MESSAGE = "Could not connect. Please try again.";

function getApiMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const raw =
    (payload as { error?: unknown; message?: unknown }).error ??
    (payload as { message?: unknown }).message;
  return typeof raw === "string" && raw.trim() ? raw : null;
}

export function FinalCta() {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email || !EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setStatusMessage(INVALID_EMAIL_MESSAGE);
      return;
    }

    setStatus("loading");
    setStatusMessage(LOADING_MESSAGE);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let responseBody: unknown = null;

      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(getApiMessage(responseBody) ?? GENERIC_ERROR_MESSAGE);
        return;
      }

      setStatus("done");
      setStatusMessage(SUCCESS_MESSAGE);
    } catch {
      setStatus("error");
      setStatusMessage(NETWORK_ERROR_MESSAGE);
    }
  }

  return (
    <Section id="get">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <Aurora hues={["blue", "violet"]} />
        <SpotlightHalo hue="blue" />
        <StarField count={90} />
      </div>

      <div className="relative text-center">
        <SectionHeading
          before={finalCta.heading.before}
          accent={finalCta.heading.accent}
          after={finalCta.heading.after}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] text-ink-2 md:text-[19px]">
            {finalCta.sub}
          </p>
          <div className="mt-8">
            {/* TODO: Add the app store link before launch. */}
            <Button type="button" size="lg">
              {finalCta.cta}
            </Button>
          </div>
        </motion.div>

        <div
          aria-hidden="true"
          className="hair-fade mx-auto mt-24 h-px w-full max-w-[720px] md:mt-32"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-[520px] md:mt-20"
        >
          <h3 className="text-[19px] font-medium text-ink">{finalCta.newsletterTitle}</h3>
          <p className="mt-3 text-[15px] text-ink-2">{finalCta.newsletterBody}</p>

          {status !== "done" ? (
            <form
              className="mt-7"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "loading"}
            >
              <div className="rim flex w-full items-center gap-2 rounded-full border border-hair bg-surface p-1.5 pl-5 transition-colors duration-150 focus-within:border-hair-strong focus-within:ring-1 focus-within:ring-ink/25">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  aria-label="Email address"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "subscribe-status" : undefined}
                  placeholder={finalCta.newsletterPlaceholder}
                  className="min-w-0 flex-1 appearance-none border-0 bg-transparent py-2 text-[15px] text-ink placeholder:text-faint"
                />
                <Button type="submit" size="md" className="shrink-0">
                  {finalCta.newsletterCta}
                </Button>
              </div>
            </form>
          ) : null}

          <p
            id="subscribe-status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "min-h-5 text-[14px]",
              status !== "idle" && status !== "done" && "mt-4",
              status === "done"
                ? "mt-7 text-mint"
                : status === "error"
                  ? "text-coral"
                  : "text-ink-2",
            )}
          >
            {statusMessage}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

export default FinalCta;
