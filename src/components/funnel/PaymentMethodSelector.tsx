import {
  CreditCard,
  Smartphone,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

export type PaymentMethod = "applePay" | "card" | "paypal";

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  previewNoteId: string;
};

type Method = {
  id: PaymentMethod;
  icon: LucideIcon;
  label: string;
};

const fieldClass =
  "h-13 w-full cursor-default rounded-[14px] border border-hair bg-surface/80 px-4 text-[15px] text-ink placeholder:text-muted";

function PreviewField({
  label,
  placeholder,
  className,
  previewNoteId,
}: {
  label: string;
  placeholder: string;
  className?: string;
  previewNoteId: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[13px] font-medium text-ink-2">
        {label}
      </span>
      <input
        type="text"
        readOnly
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        aria-describedby={previewNoteId}
        className={fieldClass}
      />
    </label>
  );
}

export function PaymentMethodSelector({
  value,
  onChange,
  previewNoteId,
}: PaymentMethodSelectorProps) {
  const copy = funnelCopy.checkout;
  const methods: readonly Method[] = [
    {
      id: "applePay",
      icon: Smartphone,
      label: copy.methods.applePay,
    },
    {
      id: "card",
      icon: CreditCard,
      label: copy.methods.card,
    },
    {
      id: "paypal",
      icon: WalletCards,
      label: copy.methods.paypal,
    },
  ];

  return (
    <fieldset className="mt-9">
      <legend className="text-[17px] font-medium tracking-[-0.02em] text-ink">
        {copy.paymentLabel}
      </legend>

      <div className="rim mt-4 overflow-hidden rounded-card border border-hair bg-surface/55">
        {methods.map((method, index) => {
          const Icon = method.icon;
          const selected = value === method.id;

          return (
            <label
              key={method.id}
              className={cn(
                "block cursor-pointer",
                index > 0 && "border-t border-hair",
              )}
            >
              <input
                type="radio"
                name="preview-payment-method"
                value={method.id}
                checked={selected}
                onChange={() => onChange(method.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-17 items-center gap-3.5 px-4 transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-3 peer-focus-visible:outline-blue motion-reduce:transition-none",
                  selected ? "bg-blue/[0.08]" : "bg-transparent",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-[13px] border",
                    selected
                      ? "border-blue/35 bg-blue/10 text-blue"
                      : "border-hair bg-white/[0.025] text-ink-2",
                  )}
                >
                  <Icon size={18} strokeWidth={1.55} />
                </span>
                <span className="flex-1 text-[15px] font-medium text-ink">
                  {method.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border",
                    selected ? "border-blue" : "border-hair-strong",
                  )}
                >
                  {selected ? (
                    <span className="size-2.5 rounded-full bg-blue" />
                  ) : null}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {value === "card" ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <PreviewField
            label={copy.fields.number.label}
            placeholder={copy.fields.number.placeholder}
            previewNoteId={previewNoteId}
            className="col-span-2"
          />
          <PreviewField
            label={copy.fields.expiry.label}
            placeholder={copy.fields.expiry.placeholder}
            previewNoteId={previewNoteId}
          />
          <PreviewField
            label={copy.fields.security.label}
            placeholder={copy.fields.security.placeholder}
            previewNoteId={previewNoteId}
          />
          <PreviewField
            label={copy.fields.name.label}
            placeholder={copy.fields.name.placeholder}
            previewNoteId={previewNoteId}
            className="col-span-2"
          />
        </div>
      ) : (
        <p className="mt-5 rounded-[14px] border border-hair bg-surface/55 px-4 py-3.5 text-[13px] leading-[1.55] text-ink-2">
          {copy.providerLines[value]}
        </p>
      )}
    </fieldset>
  );
}
