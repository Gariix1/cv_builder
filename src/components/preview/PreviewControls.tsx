import type { ZoomLevel } from "../../utils/constants";
import { ZOOM_LEVELS } from "../../utils/constants";
import { Button } from "../ui/Button";

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
  return (
    <div className="preview-controls">
      <div className="preview-controls__group">
        <span className="preview-controls__label">Zoom</span>
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
        <Button type="button" variant="soft" size="sm" onClick={onThemeToggle}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export PDF"}
        </Button>
      </div>
    </div>
  );
};
