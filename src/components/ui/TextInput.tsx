import type { InputHTMLAttributes } from "react";

import { Field } from "./Field";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string | null;
}

export const TextInput = ({
  label,
  hint,
  className,
  required,
  error,
  ...props
}: TextInputProps) => {
  return (
    <Field label={label} hint={hint} required={required} error={error}>
      <input
        required={required}
        aria-invalid={Boolean(error)}
        {...props}
        className={["input-field", className].filter(Boolean).join(" ")}
      />
    </Field>
  );
};
