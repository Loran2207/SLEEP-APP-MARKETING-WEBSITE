"use client";

import { useState } from "react";

import { ApplePayMark, PayPalMark } from "@/components/brand/marks";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

type Wallet = "applePay" | "paypal";

/*
 * The wallet buttons a real checkout puts above the card form. They are drawn
 * with the official marks; the note says plainly that payments are not live.
 */
export function ExpressPay() {
  const copy = funnelCopy.checkout;
  const [opened, setOpened] = useState<Wallet | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => setOpened("applePay")}
          aria-label={copy.methods.applePay}
          className="flex h-12 w-full items-center justify-center rounded-full bg-white transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <ApplePayMark className="h-[20px] w-auto" />
        </button>

        <button
          type="button"
          onClick={() => setOpened("paypal")}
          aria-label={copy.methods.paypal}
          className="flex h-12 w-full items-center justify-center rounded-full bg-[#ffc439] transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <PayPalMark className="h-[18px] w-auto" />
        </button>
      </div>

      <p
        aria-live="polite"
        className={cn(
          "text-center text-[12px] leading-[1.5] text-muted",
          opened ? "mt-2.5" : undefined,
        )}
      >
        {opened ? copy.providerLines[opened] : ""}
      </p>
    </div>
  );
}