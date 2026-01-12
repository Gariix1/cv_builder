import type { TextareaHTMLAttributes } from "react";

import { Field } from "./Field";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export const Textarea = ({ label, hint, className, ...props }: TextareaProps) => {
  return (
    <Field label={label} hint={hint}>
      <textarea
        {...props}
        className={["textarea-field", className].filter(Boolean).join(" ")}
      />
    </Field>
  );
};
