import type { InputHTMLAttributes } from "react";

import { Field } from "./Field";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const TextInput = ({ label, hint, className, ...props }: TextInputProps) => {
  return (
    <Field label={label} hint={hint}>
      <input
        {...props}
        className={["input-field", className].filter(Boolean).join(" ")}
      />
    </Field>
  );
};
