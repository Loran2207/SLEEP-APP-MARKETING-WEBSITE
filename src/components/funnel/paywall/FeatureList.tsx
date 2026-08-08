import { Star } from "lucide-react";

import { sleepPlusFeatures, type FunnelHue } from "@/data/funnel";
import { paywallCopy } from "@/data/paywall";

const hueColors: Record<FunnelHue, string> = {
  blue: "var(--color-blue)",
  coral: "var(--color-coral)",
  mint: "var(--color-mint)",
  violet: "var(--color-violet)",
};

/** Rest AI's starred benefit rows, fed by the app's real Sleep+ features. */
export function FeatureList() {
  const features = sleepPlusFeatures.slice(0, 5);

  return (
    <div>
      <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink">
        {paywallCopy.featuresTitle}
      </h2>
      <ul className="mt-5 flex flex-col gap-4">
        {features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-3.5">
            <Star
              aria-hidden="true"
              size={17}
              className="mt-0.5 shrink-0 fill-current"
              style={{ color: hueColors[feature.hue] }}
            />
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium leading-[1.35] text-ink">
                {feature.title}
              </h3>
              <p className="mt-0.5 text-[13px] leading-[1.5] text-ink-2">
                {feature.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
