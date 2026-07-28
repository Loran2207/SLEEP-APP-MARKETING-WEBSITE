import type { Metadata } from "next";
import { Suspense } from "react";

import { Funnel } from "@/components/funnel/Funnel";

export const metadata: Metadata = {
  title: "Your sleep plan",
  description:
    "A quiet, personal path through your evening rhythm and the SLEEP tools that fit it.",
};

function FunnelFallback() {
  return <main id="main" className="min-h-[100dvh] bg-void" />;
}

export default function StartPage() {
  return (
    <Suspense fallback={<FunnelFallback />}>
      <Funnel />
    </Suspense>
  );
}
