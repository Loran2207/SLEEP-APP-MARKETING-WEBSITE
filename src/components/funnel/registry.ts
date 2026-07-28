import {
  funnelStepIds,
  questionStepIds,
  type FunnelStepId,
  type QuestionStepId,
} from "../../data/funnel.ts";

const stepSet = new Set<string>(funnelStepIds);
const questionSet = new Set<string>(questionStepIds);

export function normalizeStep(step: string | null | undefined): FunnelStepId {
  return step && stepSet.has(step) ? (step as FunnelStepId) : "welcome";
}

export function isQuestionStep(step: FunnelStepId): step is QuestionStepId {
  return questionSet.has(step);
}

export function getNextStep(step: FunnelStepId): FunnelStepId {
  const currentIndex = funnelStepIds.indexOf(step);
  return funnelStepIds[Math.min(currentIndex + 1, funnelStepIds.length - 1)];
}

export function getPreviousStep(step: FunnelStepId): FunnelStepId {
  const currentIndex = funnelStepIds.indexOf(step);
  return funnelStepIds[Math.max(currentIndex - 1, 0)];
}

export function getQuestionProgress(step: QuestionStepId) {
  const index = questionStepIds.indexOf(step);

  return {
    current: index + 1,
    total: questionStepIds.length,
    ratio: (index + 1) / questionStepIds.length,
  };
}
