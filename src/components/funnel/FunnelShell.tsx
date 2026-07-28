import type { ReactNode } from "react";

import { Aurora } from "@/components/ambient/Aurora";
import { SpotlightHalo } from "@/components/ambient/SpotlightHalo";
import { StarField } from "@/components/ambient/StarField";
import type { FunnelHue } from "@/data/funnel";

type FunnelShellProps = {
  children: ReactNode;
  hue: FunnelHue;
};

export function FunnelShell({ children, hue }: FunnelShellProps) {
  return (
    <main id="main" className="relative min-h-[100dvh] overflow-x-clip bg-void">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-120px] left-1/2 h-[760px] w-[620px] -translate-x-1/2 overflow-hidden opacity-60"
      >
        <Aurora hues={[hue]} intensity="soft" />
      </div>

      <div className="relative mx-auto min-h-[100dvh] w-full max-w-[430px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface)_30%,var(--color-void))_0%,var(--color-void)_38%)] shadow-[inset_1px_0_0_var(--color-hair),inset_-1px_0_0_var(--color-hair)]">
        <StarField count={42} seed={2841} className="opacity-45" />
        <SpotlightHalo hue={hue} className="opacity-35" />
        <div className="relative min-h-[100dvh]">{children}</div>
      </div>
    </main>
  );
}
