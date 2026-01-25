import { useEffect } from "react";

import { useI18n } from "../../i18n";
import type { CV } from "../../models/cv.schema";
import { LiquidGlassTemplate } from "../../templates/liquid-glass/LiquidGlassTemplate";
import { Button } from "../ui";

interface ExportThemeModalProps {
  isOpen: boolean;
  cv: CV;
  isExporting: boolean;
  onSelect: (theme: "light" | "dark") => void;
  onClose: () => void;
}

export const ExportThemeModal = ({
  isOpen,
  cv,
  isExporting,
  onSelect,
  onClose,
}: ExportThemeModalProps) => {
  const { t } = useI18n();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const titleId = "export-theme-title";
  const descriptionId = "export-theme-description";

  return (
    <div
      className="export-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="export-modal__backdrop" onClick={onClose} />
      <div
        className="export-modal__card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="export-modal__header">
          <h2 id={titleId}>{t("exportThemeTitle")}</h2>
          <p id={descriptionId}>{t("exportThemeSubtitle")}</p>
        </div>
        <div className="export-modal__options">
          <div className="export-option theme-light">
            <span className="export-option__label">
              {t("exportThemeLightLabel")}
            </span>
            <div className="export-option__preview">
              <div className="export-option__frame">
                <LiquidGlassTemplate cv={cv} />
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => onSelect("light")}
              disabled={isExporting}
            >
              {isExporting ? t("previewExporting") : t("exportThemeLightCta")}
            </Button>
          </div>
          <div className="export-option theme-dark">
            <span className="export-option__label">
              {t("exportThemeDarkLabel")}
            </span>
            <div className="export-option__preview">
              <div className="export-option__frame">
                <LiquidGlassTemplate cv={cv} />
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => onSelect("dark")}
              disabled={isExporting}
            >
              {isExporting ? t("previewExporting") : t("exportThemeDarkCta")}
            </Button>
          </div>
        </div>
        <div className="export-modal__footer">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isExporting}
          >
            {t("exportThemeCancel")}
          </Button>
        </div>
      </div>
    </div>
  );
};
