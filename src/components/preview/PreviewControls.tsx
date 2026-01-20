import { useI18n, type Locale } from "../../i18n";
import type { ZoomLevel } from "../../utils/constants";
import { ZOOM_LEVELS } from "../../utils/constants";
import { Button } from "../ui";

interface PreviewControlsProps {
  zoom: ZoomLevel;
  onZoomChange: (zoom: ZoomLevel) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onExport: () => void;
  isExporting: boolean;
}

export const PreviewControls = ({
  zoom,
  onZoomChange,
  theme,
  onThemeToggle,
  onExport,
  isExporting,
}: PreviewControlsProps) => {
  const { locale, setLocale, t } = useI18n();
  const languageOptions: Array<{ value: Locale; label: string }> = [
    { value: "en", label: t("languageEnglish") },
    { value: "es", label: t("languageSpanish") },
  ];

  return (
    <div className="preview-controls">
      <div className="preview-controls__stack">
        <div className="preview-controls__group">
          <span className="preview-controls__label">{t("previewZoomLabel")}</span>
          <div className="preview-controls__buttons">
            {ZOOM_LEVELS.map((level) => (
              <Button
                key={level}
                type="button"
                variant={zoom === level ? "primary" : "ghost"}
                size="sm"
                onClick={() => onZoomChange(level)}
              >
                {level}%
              </Button>
            ))}
          </div>
        </div>
        <div className="preview-controls__group">
          <span className="preview-controls__label">
            {t("previewLanguageLabel")}
          </span>
          <div className="preview-controls__buttons">
            {languageOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={locale === option.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => setLocale(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="preview-controls__group">
        <Button type="button" variant="soft" size="sm" onClick={onThemeToggle}>
          {theme === "light" ? t("previewDarkMode") : t("previewLightMode")}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? t("previewExporting") : t("previewExportPdf")}
        </Button>
      </div>
    </div>
  );
};
