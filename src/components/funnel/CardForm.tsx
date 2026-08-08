import type { ReactNode } from "react";
import { Info } from "lucide-react";

import {
  AmexMark,
  MastercardMark,
  VisaMark,
} from "@/components/brand/marks";
import { funnelCopy } from "@/data/funnel";
import { cn } from "@/lib/utils";

type CardFormProps = {
  previewNoteId: string;
};

// The transcribe2text checkout describes each field in its placeholder and
// shows no label line. funnelCopy.checkout has no slot for these lines yet.
const descriptivePlaceholders = {
  number: "Credit or debit card number",
  expiry: "Expiry date MM / YY",
  security: "CVV/CVC",
} as const;

const fieldClass =
  "h-12 w-full cursor-default rounded-[10px] border border-hair bg-surface/80 text-ink placeholder:text-muted focus:border-blue focus:outline-none";

function Field({
  label,
  placeholder,
  previewNoteId,
  className,
  inputClassName,
  trailing,
}: {
  label: string;
  placeholder: string;
  previewNoteId: string;
  className?: string;
  inputClassName: string;
  trailing?: ReactNode;
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <input
        type="text"
        readOnly
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        aria-describedby={previewNoteId}
        className={cn(fieldClass, inputClassName)}
      />
      {trailing ? (
        <span className="pointer-events-none absolute top-1/2 right-3.5 flex -translate-y-1/2 items-center gap-2">
          {trailing}
        </span>
      ) : null}
    </label>
  );
}

export function CardForm({ previewNoteId }: CardFormProps) {
  const copy = funnelCopy.checkout;

  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <Field
        label={copy.fields.number.label}
        placeholder={descriptivePlaceholders.number}
        previewNoteId={previewNoteId}
        className="col-span-2"
        inputClassName="pl-[14px] pr-28 text-[14px]"
        trailing={
          <>
            <VisaMark className="h-[15px] w-auto text-ink" />
            <MastercardMark className="h-[17px] w-auto" />
            <AmexMark className="h-[17px] w-auto" />
          </>
        }
      />
      <Field
        label={copy.fields.expiry.label}
        placeholder={descriptivePlaceholders.expiry}
        previewNoteId={previewNoteId}
        inputClassName="px-[12px] text-[13.5px]"
      />
      <Field
        label={copy.fields.security.label}
        placeholder={descriptivePlaceholders.security}
        previewNoteId={previewNoteId}
        inputClassName="pl-[12px] pr-10 text-[13.5px]"
        trailing={
          <Info
            aria-hidden="true"
            size={18}
            strokeWidth={1.5}
            className="text-muted"
          />
        }
      />
      <Field
        label={copy.fields.name.label}
        placeholder={copy.fields.name.label}
        previewNoteId={previewNoteId}
        className="col-span-2"
        inputClassName="px-[14px] text-[14px]"
      />
    </div>
  );
}
