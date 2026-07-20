import type { ReactNode } from "react";

import { SpotlightHalo } from "@/components/ambient/SpotlightHalo";
import { Container } from "@/components/primitives/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Renders the conic spotlight halo at the top of the section. */
  halo?: boolean;
  /** Skips the Container wrapper for sections that manage their own width. */
  bare?: boolean;
  className?: string;
};

export function Section({ children, id, halo = false, bare = false, className }: SectionProps) {
  return (
    <section
      id={id}
      className={["relative isolate overflow-hidden py-[104px] md:py-[160px]", className].filter(Boolean).join(" ")}
    >
      {halo ? <SpotlightHalo className="-z-10" /> : null}
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
