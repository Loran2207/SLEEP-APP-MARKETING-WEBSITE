"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/primitives/Button";
import { nav } from "@/data/content";
import { fadeIn, fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ID = "mobile-navigation";

type BrandProps = {
  onClick?: () => void;
};

function Brand({ onClick }: BrandProps) {
  return (
    <Link href="/" onClick={onClick} className="inline-flex items-center gap-2.5 rounded-full">
      <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,var(--color-ink)_0%,var(--color-ink-2)_68%,var(--color-muted)_100%)]">
        <Moon aria-hidden="true" size={14} strokeWidth={2} className="-rotate-12 text-void" />
      </span>
      <span className="text-[15px] font-medium tracking-[0.14em] text-ink">SLEEP</span>
    </Link>
  );
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const primaryNavRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const menuButton = menuButtonRef.current;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : menuButton;
    const previousOverflow = document.body.style.overflow;
    const pageSiblings = headerRef.current?.parentElement
      ? Array.from(headerRef.current.parentElement.children).filter(
          (element): element is HTMLElement =>
            element instanceof HTMLElement && element !== headerRef.current,
        )
      : [];
    const backgroundElements = [primaryNavRef.current, ...pageSiblings].filter(
      (element): element is HTMLElement => element !== null,
    );
    const previousInertStates = backgroundElements.map(
      (element) => [element, element.inert] as const,
    );
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.tabIndex >= 0);
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) return;

      const focusIsOutsidePanel = !panelRef.current.contains(document.activeElement);

      if (
        event.shiftKey &&
        (document.activeElement === firstFocusableElement || focusIsOutsidePanel)
      ) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastFocusableElement || focusIsOutsidePanel)
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    previousInertStates.forEach(([element]) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousInertStates.forEach(([element, wasInert]) => {
        element.inert = wasInert;
      });

      const focusTarget = previouslyFocusedElement?.isConnected
        ? previouslyFocusedElement
        : menuButton;
      focusTarget?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4">
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-[58%] left-1/2 -z-20 h-20 w-[72%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in srgb, var(--color-blue) 12%, transparent)_0%,color-mix(in srgb, var(--color-blue) 5%, transparent)_38%,transparent_76%)] blur-[18px] [mask-image:radial-gradient(ellipse_at_center,black_0%,rgba(0,0,0,0.88)_38%,transparent_78%)] transition-opacity duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isScrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <nav
        ref={primaryNavRef}
        aria-label="Primary navigation"
        className={cn(
          "relative isolate mx-auto mt-4 flex h-14 max-w-[1060px] items-center justify-between rounded-full border border-transparent px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          isScrolled &&
            "border-[rgba(255,255,255,0.10)] bg-[rgba(245,245,247,0.03)] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(255,255,255,0.025),inset_0_0_24px_rgba(255,255,255,0.02)] backdrop-blur-[18px] backdrop-saturate-[1.15]",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 left-[12%] -z-10 h-px w-[76%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22)_50%,transparent)] transition-opacity duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
            isScrolled ? "opacity-100" : "opacity-0",
          )}
        />

        <Brand />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md text-[14px] text-muted transition-colors duration-150 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#get" size="md">
            {nav.cta}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation"
          aria-expanded={isOpen}
          aria-controls={MOBILE_NAV_ID}
          onClick={() => setIsOpen(true)}
          className="grid size-11 place-items-center rounded-full text-ink transition-colors duration-150 hover:bg-ink/[0.06] lg:hidden"
        >
          <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
      </nav>

      <div id={MOBILE_NAV_ID}>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              variants={fadeIn}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col bg-void/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-[88px] shrink-0 items-center justify-between px-9">
                <Brand onClick={closeMenu} />
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close navigation"
                  onClick={closeMenu}
                  className="grid size-11 place-items-center rounded-full text-ink transition-colors duration-150 hover:bg-ink/[0.06]"
                >
                  <X aria-hidden="true" size={22} strokeWidth={1.75} />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="min-h-0 flex-1 overflow-y-auto px-9">
                <motion.ul
                  variants={stagger(0.08, 0.1)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="flex min-h-full flex-col justify-center gap-7 py-10"
                >
                  {nav.links.map((link) => (
                    <motion.li key={link.href} variants={fadeUp}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="inline-flex rounded-md text-[24px] font-medium tracking-[-0.02em] text-ink-2 transition-colors duration-150 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="shrink-0 border-t border-hair px-9 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div onClickCapture={closeMenu}>
                  <Button href="#get" size="md" className="w-full">
                    {nav.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
