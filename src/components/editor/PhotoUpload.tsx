import { useState, type ChangeEvent } from "react";

import { useI18n } from "../../i18n";
import {
  MAX_PHOTO_BYTES,
  PHOTO_MIME,
  PHOTO_QUALITY,
  PHOTO_SIZE,
} from "../../utils/constants";
import { estimateDataUrlBytes, normalizeImageFile } from "../../utils/image";
import { Button, Field } from "../ui";

interface PhotoUploadProps {
  label: string;
  hint?: string;
  value?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const PhotoUpload = ({
  label,
  hint,
  value,
  onChange,
  onClear,
}: PhotoUploadProps) => {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const normalized = await normalizeImageFile(file, {
        size: PHOTO_SIZE,
        quality: PHOTO_QUALITY,
        type: PHOTO_MIME,
      });
      if (estimateDataUrlBytes(normalized) > MAX_PHOTO_BYTES) {
        setError(t("photoTooLarge"));
        return;
      }
      onChange(normalized);
    } catch {
      setError(t("photoError"));
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="photo-upload">
        <div className="photo-upload__controls">
          <input
            className="input-field"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {value ? (
            <Button type="button" variant="soft" size="sm" onClick={onClear}>
              {t("editorActionRemove")}
            </Button>
          ) : null}
        </div>
        {isLoading ? (
          <span className="photo-upload__status">{t("photoProcessing")}</span>
        ) : null}
        {error ? (
          <span className="photo-upload__status photo-upload__error">{error}</span>
        ) : null}
        {value ? (
          <div className="photo-upload__preview">
            <img src={value} alt={t("photoLabel")} />
          </div>
        ) : null}
      </div>
    </Field>
  );
};
