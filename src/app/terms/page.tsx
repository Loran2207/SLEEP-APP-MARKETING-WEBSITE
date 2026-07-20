import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of use",
};

const bodyClassName = "mt-4 text-[16px] leading-[1.7] text-ink-2";
const headingClassName = "mt-12 text-[20px] font-medium text-ink";

export default function TermsPage() {
  return (
    <article id="main" className="mx-auto max-w-[720px] px-6 py-[120px]">
      <Link
        href="/"
        className="text-[14px] text-muted transition-colors hover:text-ink"
      >
        Back to home
      </Link>

      <h1 className="mt-10 text-[32px] font-medium tracking-[-0.03em] text-ink md:text-[40px]">
        Terms of use
      </h1>
      <p className="mt-3 text-[14px] text-muted">
        Last updated: July 20, 2026
      </p>

      <p className="mt-10 rounded-card border border-hair bg-surface px-5 py-4 text-[15px] leading-[1.6] text-ink">
        This is placeholder wording. It must be reviewed by a lawyer and updated
        to match the final SLEEP product, payments and support process before
        launch.
      </p>

      <h2 className={headingClassName}>Using the app</h2>
      <p className={bodyClassName}>
        You may use SLEEP only in line with these terms and the law. SLEEP offers
        tools for routines, relaxation and sleep reflection. It is not medical
        advice and does not replace care from a qualified health professional.
      </p>

      <h2 className={headingClassName}>Accounts</h2>
      <p className={bodyClassName}>
        If an account is required, provide accurate information and keep access
        to your email secure. Tell us promptly if you believe someone has used
        your account without permission. The final terms must explain any age or
        eligibility requirements.
      </p>

      <h2 className={headingClassName}>Subscriptions</h2>
      <p className={bodyClassName}>
        Some features may require a paid subscription. The price, billing period,
        renewal terms and way to cancel should be shown before purchase. If an
        app store handles the payment, its billing and refund rules may also
        apply. The final terms must match the purchase flow that ships.
      </p>

      <h2 className={headingClassName}>Acceptable use</h2>
      <p className={bodyClassName}>
        Do not use SLEEP to break the law, harm another person, interfere with
        the service, bypass its security or gain access to accounts or systems
        that are not yours. We may limit access when reasonably needed to protect
        the service or other people.
      </p>

      <h2 className={headingClassName}>Liability</h2>
      <p className={bodyClassName}>
        Sleep and health outcomes differ from person to person, and uninterrupted
        service cannot be guaranteed. To the extent allowed by law, the final
        terms should set fair limits on responsibility without removing rights
        that cannot legally be excluded.
      </p>

      <h2 className={headingClassName}>Changes to these terms</h2>
      <p className={bodyClassName}>
        These terms may change as SLEEP develops or legal requirements change.
        The updated date should be shown here, and important changes should be
        explained in a reasonable way before they take effect.
      </p>

      <h2 className={headingClassName}>Contact</h2>
      <p className={bodyClassName}>
        Questions about these terms can be sent to{" "}
        <a
          href="mailto:hello@sleepapp.com"
          className="text-ink underline decoration-hair-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          hello@sleepapp.com
        </a>
        .
      </p>
    </article>
  );
}
