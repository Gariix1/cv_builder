import type { SelectHTMLAttributes } from "react";

import { Field } from "./Field";

export interface SelectInputProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: Array<{ label: string; value: string }>;
  error?: string | null;
}

export const SelectInput = ({
  label,
  hint,
  options,
  className,
  required,
  error,
  ...props
}: SelectInputProps) => {
  return (
    <Field label={label} hint={hint} required={required} error={error}>
      <select
        required={required}
        aria-invalid={Boolean(error)}
        {...props}
        className={["select-field", className].filter(Boolean).join(" ")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
};
