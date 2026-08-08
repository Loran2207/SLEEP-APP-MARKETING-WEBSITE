type QuestionTitleProps = {
  title: string;
  /** Kept so callers do not change; the funnel no longer marks a word. */
  accentWord?: string;
};

/**
 * Plain, one typeface. The italic serif accent was pulled out of the questions
 * on the client's note: inside a question it competes with the answer options
 * instead of leading the eye to them.
 */
export function QuestionTitle({ title }: QuestionTitleProps) {
  return <>{title}</>;
}