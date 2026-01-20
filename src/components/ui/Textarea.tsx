import type { TextareaHTMLAttributes } from "react";

import { Field } from "./Field";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string | null;
}

export const Textarea = ({
  label,
  hint,
  className,
  required,
  error,
  ...props
}: TextareaProps) => {
  return (
    <Field label={label} hint={hint} required={required} error={error}>
      <textarea
        required={required}
        aria-invalid={Boolean(error)}
        {...props}
        className={["textarea-field", className].filter(Boolean).join(" ")}
      />
    </Field>
  );
};
