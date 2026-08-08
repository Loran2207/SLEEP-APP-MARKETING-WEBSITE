import { paywallCopy } from "@/data/paywall";

import { ReviewCard } from "../ReviewCard";

/** Three placeholder reviews under the Rest AI style heading. */
export function ReviewsBlock() {
  const copy = paywallCopy.reviews;

  return (
    <div>
      <h2 className="text-center text-[19px] font-medium tracking-[-0.015em] text-ink">
        {copy.title}
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        {copy.items.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
