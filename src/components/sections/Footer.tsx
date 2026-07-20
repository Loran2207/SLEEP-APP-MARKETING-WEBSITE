"use client";

import { Moon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/primitives/Container";
import { footer } from "@/data/content";
import { fadeUp, stagger, viewportEdge } from "@/lib/motion";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const legalLinks = footer.columns
    .flatMap((column) => column.links as readonly { label: string; href: string }[])
    .filter((link) => link.href.startsWith("/"));

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <footer className="border-t border-hair py-16">
      <Container>
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={viewportEdge}
        >
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]"
          >
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 rounded-full">
                <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,var(--color-ink)_0%,var(--color-ink-2)_68%,var(--color-muted)_100%)]">
                  <Moon
                    aria-hidden="true"
                    size={14}
                    strokeWidth={2}
                    className="-rotate-12 text-void"
                  />
                </span>
                <span className="text-[15px] font-medium tracking-[0.14em] text-ink">
                  {footer.brand}
                </span>
              </Link>
              <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-muted">
                {footer.tagline}
              </p>
            </div>

            {footer.columns.map((column, columnIndex) => {
              const headingId = `footer-column-${columnIndex}`;

              return (
                <nav key={column.title} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className="text-[13px] font-medium tracking-[0.08em] text-ink"
                  >
                    {column.title}
                  </h2>
                  <ul className="mt-4 flex flex-col items-start gap-3">
                    {column.links.map((link) => {
                      const className =
                        "text-[14px] text-muted transition-colors duration-150 hover:text-ink";

                      return (
                        <li key={link.href}>
                          {link.href.startsWith("mailto:") ? (
                            <a href={link.href} className={className}>
                              {link.label}
                            </a>
                          ) : (
                            <Link href={link.href} className={className}>
                              {link.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12">
            <div aria-hidden="true" className="hair-fade h-px w-full" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[13px]">
              <p className="text-muted">
                © {year ? `${year} ` : ""}{footer.brand}. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted transition-colors duration-150 hover:text-ink-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
