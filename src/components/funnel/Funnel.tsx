"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  questionById,
  type BillingPeriod,
  type FunnelHue,
  type FunnelStepId,
  type QuestionStepId,
} from "@/data/funnel";

import { AnalyzingStep } from "./AnalyzingStep";
import { CheckoutStep } from "./CheckoutStep";
import { DoneStep } from "./DoneStep";
import { EmailStep, type EmailSaveStatus } from "./EmailStep";
import { FunnelShell } from "./FunnelShell";
import { MultiSelectStep } from "./MultiSelectStep";
import { PaywallStep } from "./PaywallStep";
import { buildPreview, buildProfile, buildScore } from "./plan";
import { PreviewStep } from "./PreviewStep";
import { ProfileStep } from "./ProfileStep";
import { PromiseStep } from "./PromiseStep";
import {
  getNextStep,
  getPreviousStep,
  isQuestionStep,
  normalizeStep,
} from "./registry";
import { ScoreStep } from "./ScoreStep";
import { SingleSelectStep } from "./SingleSelectStep";
import { SleepGoalStep } from "./SleepGoalStep";
import type { FunnelAnswers } from "./types";
import { WakeTimeStep } from "./WakeTimeStep";
import { WelcomeStep } from "./WelcomeStep";

const stepHues: Record<FunnelStepId, FunnelHue> = {
  welcome: "blue",
  promise: "violet",
  age: "coral",
  identity: "coral",
  awake: "coral",
  want: "violet",
  rating: "blue",
  latency: "blue",
  "night-wakes": "blue",
  "early-wake": "blue",
  "racing-mind": "blue",
  screens: "blue",
  caffeine: "blue",
  consistency: "blue",
  ritual: "blue",
  daytime: "blue",
  "sleep-goal": "mint",
  "wake-time": "mint",
  "bedtime-nudge": "mint",
  analyzing: "blue",
  score: "blue",
  profile: "mint",
  preview: "violet",
  email: "blue",
  paywall: "violet",
  checkout: "blue",
  done: "mint",
};

const AUTO_ADVANCE_DELAY = 220;

export function Funnel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const step = normalizeStep(searchParams.get("step"));
  const selectionTimer = useRef<number | null>(null);
  const [answers, setAnswers] = useState<FunnelAnswers>({ want: [] });
  const [email, setEmail] = useState("");
  const [emailSaveStatus, setEmailSaveStatus] =
    useState<EmailSaveStatus>("idle");
  const [billing, setBilling] = useState<BillingPeriod>("yearly");

  const clearSelectionTimer = useCallback(() => {
    if (selectionTimer.current) {
      window.clearTimeout(selectionTimer.current);
      selectionTimer.current = null;
    }
  }, []);

  useEffect(() => clearSelectionTimer, [clearSelectionTimer]);

  const goTo = useCallback(
    (nextStep: FunnelStepId, replace = false) => {
      clearSelectionTimer();
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", nextStep);
      window.scrollTo(0, 0);

      startTransition(() => {
        const href = `/start?${params.toString()}`;
        if (replace) {
          router.replace(href, { scroll: false });
        } else {
          router.push(href, { scroll: false });
        }
      });
    },
    [clearSelectionTimer, router, searchParams],
  );

  const selectSingle = useCallback(
    (questionId: QuestionStepId, option: string) => {
      setAnswers((current) => ({ ...current, [questionId]: option }));
      clearSelectionTimer();
      selectionTimer.current = window.setTimeout(
        () => goTo(getNextStep(questionId)),
        reduceMotion ? 40 : AUTO_ADVANCE_DELAY,
      );
    },
    [clearSelectionTimer, goTo, reduceMotion],
  );

  const toggleMulti = useCallback(
    (questionId: QuestionStepId, option: string) => {
      setAnswers((current) => {
        const selected = (current[questionId] as string[] | undefined) ?? [];
        const next = selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option];

        return { ...current, [questionId]: next };
      });
    },
    [],
  );

  function renderQuestion(questionId: QuestionStepId) {
    const question = questionById[questionId];
    const onBack = () => goTo(getPreviousStep(questionId));

    if (question.kind === "multi") {
      return (
        <MultiSelectStep
          question={question}
          selected={(answers[questionId] as string[] | undefined) ?? []}
          onToggle={(option) => toggleMulti(questionId, option)}
          onContinue={() => goTo(getNextStep(questionId))}
          onBack={onBack}
        />
      );
    }

    if (question.kind === "sleep-goal") {
      return (
        <SleepGoalStep
          question={question}
          selected={answers[questionId] as string | undefined}
          onSelect={(option) =>
            setAnswers((current) => ({
              ...current,
              [questionId]: option,
            }))
          }
          onContinue={() => goTo(getNextStep(questionId))}
          onBack={onBack}
        />
      );
    }

    if (question.kind === "time") {
      return (
        <WakeTimeStep
          question={question}
          value={answers[questionId] as string | undefined}
          sleepGoalHours={Number(answers["sleep-goal"]) || undefined}
          onChange={(value) =>
            setAnswers((current) => ({
              ...current,
              [questionId]: value,
            }))
          }
          onContinue={() => goTo(getNextStep(questionId))}
          onBack={onBack}
        />
      );
    }

    return (
      <SingleSelectStep
        question={question}
        selected={answers[questionId] as string | undefined}
        onSelect={(option) => selectSingle(questionId, option)}
        onBack={onBack}
      />
    );
  }

  function renderStep() {
    if (isQuestionStep(step)) {
      return renderQuestion(step);
    }

    switch (step) {
      case "welcome":
        return <WelcomeStep onStart={() => goTo("promise")} />;
      case "promise":
        return <PromiseStep onContinue={() => goTo("age")} />;
      case "analyzing":
        return <AnalyzingStep onComplete={() => goTo("score", true)} />;
      case "score":
        return (
          <ScoreStep
            result={buildScore(answers)}
            onContinue={() => goTo("profile")}
          />
        );
      case "profile":
        return (
          <ProfileStep
            profile={buildProfile(answers)}
            onPaywall={() => goTo("preview")}
            onFreePlan={() => goTo("done")}
          />
        );
      case "preview":
        return (
          <PreviewStep
            cards={buildPreview(answers)}
            onContinue={() => goTo("email")}
          />
        );
      case "email":
        return (
          <EmailStep
            email={email}
            onEmailChange={setEmail}
            onBack={() => goTo("preview")}
            onContinue={() => goTo("paywall")}
            onSkip={() => goTo("paywall")}
            onSaveStatusChange={setEmailSaveStatus}
          />
        );
      case "paywall":
        return (
          <PaywallStep
            billing={billing}
            onBillingChange={setBilling}
            onBack={() => goTo("email")}
            onTrial={() => goTo("checkout")}
          />
        );
      case "checkout":
        return (
          <CheckoutStep
            billing={billing}
            onBack={() => goTo("paywall")}
            onChangePlan={() => goTo("paywall")}
            onTrial={() => goTo("done")}
          />
        );
      case "done":
        return (
          <DoneStep
            email={email.trim() || undefined}
            emailSaveStatus={emailSaveStatus}
          />
        );
    }
  }

  return (
    <FunnelShell hue={stepHues[step]}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="min-h-[100dvh]"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </FunnelShell>
  );
}
