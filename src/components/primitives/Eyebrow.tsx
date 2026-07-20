import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  align?: "center" | "left";
};

export function Eyebrow({ children, align = "center" }: EyebrowProps) {
  return (
    <div className="flex w-full items-center gap-4">
      {align === "center" ? <span aria-hidden="true" className="hair-fade h-px flex-1" /> : null}
      <span className="shrink-0 text-[13px] font-medium tracking-[0.14em] text-muted">
        {children}
      </span>
      <span aria-hidden="true" className="hair-fade h-px flex-1" />
    </div>
  );
}
