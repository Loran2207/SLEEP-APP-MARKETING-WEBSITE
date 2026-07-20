"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { motion } from "motion/react";

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

const sceneMask =
  "radial-gradient(ellipse 38% 68% at 50% 34%, black 0%, black 34%, rgb(0 0 0 / 0.78) 56%, rgb(0 0 0 / 0.22) 78%, transparent 100%)";

const sceneStyle: CSSProperties = {
  maskImage: sceneMask,
  WebkitMaskImage: sceneMask,
};

const emitterStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-blue-soft) 34%, transparent) 0%, color-mix(in srgb, var(--color-blue) 16%, transparent) 44%, transparent 78%)",
};

const emitterLineStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-blue) 48%, transparent), transparent)",
};

const beamMask =
  "linear-gradient(to bottom, transparent 0%, black 9%, rgb(0 0 0 / 0.88) 58%, rgb(0 0 0 / 0.22) 82%, transparent 100%)";

const beamStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to bottom, color-mix(in srgb, var(--color-blue-soft) 18%, transparent) 0%, color-mix(in srgb, var(--color-blue) 11%, transparent) 44%, color-mix(in srgb, var(--color-violet) 5%, transparent) 72%, transparent 100%)",
  clipPath: "polygon(43% 0%, 57% 0%, 88% 100%, 12% 100%)",
  filter: "blur(20px)",
  maskImage: beamMask,
  WebkitMaskImage: beamMask,
};

const gridMask =
  "radial-gradient(ellipse 48% 68% at 50% 8%, black 0%, rgb(0 0 0 / 0.82) 34%, rgb(0 0 0 / 0.28) 62%, transparent 82%)";

const gridStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse 38% 24% at 50% 7%, color-mix(in srgb, var(--color-blue) 20%, transparent) 0%, color-mix(in srgb, var(--color-violet) 7%, transparent) 46%, transparent 76%), linear-gradient(to right, color-mix(in srgb, var(--color-blue) 11%, transparent) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.055) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 56px 100%, 100% 36px",
  maskImage: gridMask,
  WebkitMaskImage: gridMask,
  transform: "translateX(-50%) perspective(520px) rotateX(64deg)",
  transformOrigin: "50% 0%",
};

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
        <StarField count={76} seed={9127} />

        <div
          className="absolute top-2 left-1/2 h-[440px] w-full -translate-x-1/2 md:top-6 md:h-[520px]"
          style={sceneStyle}
        >
          {/* The source is light itself, not an object. A bordered box here read as a
              piece of UI with a hard edge, which is the defect the owner keeps flagging. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-10 w-44 -translate-x-1/2 sm:w-60"
          >
            <span
              className="absolute inset-x-0 bottom-0 h-16 -translate-y-1 blur-[26px]"
              style={emitterStyle}
            />
            <span
              className="absolute right-6 bottom-1 left-6 h-px"
              style={emitterLineStyle}
            />
          </div>

          <div className="absolute top-6 left-1/2 h-[280px] w-[min(88vw,620px)] -translate-x-1/2 md:h-[340px]">
            <div
              className="animate-breathe motion-reduce:animate-none absolute inset-0"
              style={beamStyle}
            />
          </div>

          <div
            className="absolute top-[156px] left-1/2 h-[310px] w-[min(92vw,920px)] md:top-[190px] md:h-[390px]"
            style={gridStyle}
          />
        </div>
      </div>

      <div className="relative z-10 text-center">
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
          className="hair-fade mx-auto mt-24 h-px w-full max-w-[720px]"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-[520px]"
        >
          <h3 className="text-[19px] font-medium text-ink">{finalCta.newsletterTitle}</h3>
          <p className="mt-3 text-[15px] text-ink-2">{finalCta.newsletterBody}</p>

          <div className="mt-7 grid grid-rows-[3.625rem_1.25rem] gap-4">
            {status !== "done" ? (
              <form
                className="row-start-1"
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
                    className="h-11 min-w-0 flex-1 appearance-none border-0 bg-transparent text-[15px] text-ink placeholder:text-faint"
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
                status === "done"
                  ? "row-start-1 self-center text-mint"
                  : status === "error"
                    ? "row-start-2 text-coral"
                    : "row-start-2 text-ink-2",
              )}
            >
              {statusMessage}
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default FinalCta;
