import { Star } from "lucide-react";

export type Review = {
  name: string;
  title: string;
  body: string;
};

/**
 * A review card. The copy is a marked placeholder until the client supplies
 * real ones: this site does not print testimonials nobody said.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[18px] border border-hair bg-white/[0.035] p-4">
      <div className="flex items-start justify-between gap-3">
        <div aria-label="Five stars" className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              size={13}
              className="fill-mint text-mint"
            />
          ))}
        </div>
        <span className="shrink-0 text-[12px] text-muted">{review.name}</span>
      </div>
      <h3 className="mt-3 text-[15px] font-medium text-ink">{review.title}</h3>
      <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-2">{review.body}</p>
    </article>
  );
}