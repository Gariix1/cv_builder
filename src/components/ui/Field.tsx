import type { ReactNode } from "react";

import { useI18n } from "../../i18n";

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string | null;
  children: ReactNode;
}

export const Field = ({ label, hint, required, error, children }: FieldProps) => {
  const { t } = useI18n();

  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required ? (
          <span className="field-required">{t("labelRequired")}</span>
        ) : null}
      </span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
};
