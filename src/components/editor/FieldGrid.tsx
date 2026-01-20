import type { InputHTMLAttributes } from "react";

import type { TranslationKey } from "../../i18n";
import { useI18n } from "../../i18n";
import { hasText } from "../../utils/validation";
import { TextInput } from "../ui";
import { EditorGrid } from "./EditorGrid";

type StringKeys<T> = {
  [K in keyof T]-?: T[K] extends string | undefined ? K : never;
}[keyof T];

export interface FieldDescriptor<T> {
  key: StringKeys<T>;
  labelKey: TranslationKey;
  placeholderKey?: TranslationKey;
  hintKey?: TranslationKey;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
  validate?: (value: string, values: T) => TranslationKey | null;
}

interface FieldGridProps<T> {
  fields: Array<FieldDescriptor<T>>;
  values: T;
  onChange: (key: StringKeys<T>, value: string) => void;
  keyPrefix?: string;
}

export function FieldGrid<T>({
  fields,
  values,
  onChange,
  keyPrefix,
}: FieldGridProps<T>) {
  const { t } = useI18n();
  return (
    <EditorGrid>
      {fields.map((field) => {
        const fieldKey = `${keyPrefix ?? "field"}-${String(field.key)}`;
        const value = (values[field.key] ?? "") as string;
        const requiredError =
          field.required && !hasText(value) ? t("validationRequired") : null;
        const validationKey = field.validate?.(value, values) ?? null;
        const validationError = validationKey ? t(validationKey) : null;
        const error = requiredError ?? validationError;
        return (
          <TextInput
            key={fieldKey}
            name={fieldKey}
            label={t(field.labelKey)}
            placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
            hint={field.hintKey ? t(field.hintKey) : undefined}
            type={field.type}
            required={field.required}
            value={value}
            error={error}
            onChange={(event) => onChange(field.key, event.target.value)}
          />
        );
      })}
    </EditorGrid>
  );
}
