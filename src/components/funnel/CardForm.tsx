import type { ReactNode } from "react";

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

const fieldClass =
  "h-13 w-full cursor-default rounded-[14px] border border-hair bg-surface/80 px-4 text-[15px] text-ink placeholder:text-muted focus:border-blue focus:outline-none";

function Field({
  label,
  placeholder,
  className,
  previewNoteId,
  children,
}: {
  label: string;
  placeholder: string;
  className?: string;
  previewNoteId: string;
  children?: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[13px] font-medium text-ink-2">
        {label}
      </span>
      <span className="relative block">
        <input
          type="text"
          readOnly
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          aria-describedby={previewNoteId}
          className={cn(fieldClass, children ? "pr-30" : undefined)}
        />
        {children ? (
          <span className="pointer-events-none absolute top-1/2 right-3.5 flex -translate-y-1/2 items-center gap-2">
            {children}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function CardForm({ previewNoteId }: CardFormProps) {
  const copy = funnelCopy.checkout;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Field
        label={copy.fields.number.label}
        placeholder={copy.fields.number.placeholder}
        previewNoteId={previewNoteId}
        className="col-span-2"
      >
        <VisaMark className="h-[15px] w-auto text-ink" />
        <MastercardMark className="h-[17px] w-auto" />
        <AmexMark className="h-[17px] w-auto" />
      </Field>
      <Field
        label={copy.fields.expiry.label}
        placeholder={copy.fields.expiry.placeholder}
        previewNoteId={previewNoteId}
      />
      <Field
        label={copy.fields.security.label}
        placeholder={copy.fields.security.placeholder}
        previewNoteId={previewNoteId}
      />
      <Field
        label={copy.fields.name.label}
        placeholder={copy.fields.name.placeholder}
        previewNoteId={previewNoteId}
        className="col-span-2"
      />
    </div>
  );
}