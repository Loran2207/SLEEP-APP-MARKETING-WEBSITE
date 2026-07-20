import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
};

const bodyClassName = "mt-4 text-[16px] leading-[1.7] text-ink-2";
const headingClassName = "mt-12 text-[20px] font-medium text-ink";

export default function PrivacyPage() {
  return (
    <article id="main" className="mx-auto max-w-[720px] px-6 py-[120px]">
      <Link
        href="/"
        className="text-[14px] text-muted transition-colors hover:text-ink"
      >
        Back to home
      </Link>

      <h1 className="mt-10 text-[32px] font-medium tracking-[-0.03em] text-ink md:text-[40px]">
        Privacy policy
      </h1>
      <p className="mt-3 text-[14px] text-muted">
        Last updated: July 20, 2026
      </p>

      <p className="mt-10 rounded-card border border-hair bg-surface px-5 py-4 text-[15px] leading-[1.6] text-ink">
        This is placeholder wording. It must be reviewed by a lawyer and updated
        to match how SLEEP actually handles personal data before launch.
      </p>

      <h2 className={headingClassName}>What we collect</h2>
      <p className={bodyClassName}>
        SLEEP may receive the email address you use to sign in or join the
        newsletter, information you add to the app, such as routines, sleep
        entries and diary notes, and limited technical data needed to keep the
        service working. Before launch, this section must be checked against the
        product and every service it uses.
      </p>

      <h2 className={headingClassName}>How information is used</h2>
      <p className={bodyClassName}>
        Information is intended to be used to provide the features you request,
        keep accounts secure, send the newsletter when you subscribe, diagnose
        problems and improve the service. The final policy must state each use
        and the legal reason for it.
      </p>

      <h2 className={headingClassName}>Storage and retention</h2>
      <p className={bodyClassName}>
        Some information may stay on your device, while other information may be
        stored by services that run SLEEP. The final policy must explain what
        leaves the device, where it is stored, how it is protected and how long
        it is kept.
      </p>

      <h2 className={headingClassName}>Third parties</h2>
      <p className={bodyClassName}>
        SLEEP may use providers for hosting, email delivery, authentication,
        payments, analytics or error reporting. Those providers should receive
        only the information needed to do their work. The final policy must name
        the providers actually in use and link to their privacy information.
      </p>

      <h2 className={headingClassName}>Your rights</h2>
      <p className={bodyClassName}>
        Depending on where you live, you may be able to ask for access to your
        personal data, correct it, delete it, receive a copy, object to some uses
        or withdraw consent. These rights vary by location. The final policy must
        explain how requests are handled and any limits that apply.
      </p>

      <h2 className={headingClassName}>Contact</h2>
      <p className={bodyClassName}>
        Questions about privacy can be sent to{" "}
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
