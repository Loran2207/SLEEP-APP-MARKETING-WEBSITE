"use client";

import { ArrowLeft } from "lucide-react";

import { funnelCopy } from "@/data/funnel";

import { BrandPill } from "./QuestionChrome";

type FunnelHeaderProps = {
  onBack?: () => void;
};

/**
 * The one header every standalone funnel screen shares, mirroring the
 * question chrome: wordmark pill centered, back arrow on the left when the
 * screen can go back. Questions keep their own richer chrome.
 */
export function FunnelHeader({ onBack }: FunnelHeaderProps) {
  return (
    <header className="pt-[max(10px,env(safe-area-inset-top))]">
      <div className="relative flex h-10 items-center justify-center">
        {onBack ? (
          <button
            type="button"
            aria-label={funnelCopy.actions.back}
            onClick={onBack}
            className="absolute top-1/2 left-0 grid size-11 -translate-y-1/2 place-items-center text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none"
          >
            <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        ) : null}
        <BrandPill />
      </div>
    </header>
  );
}
