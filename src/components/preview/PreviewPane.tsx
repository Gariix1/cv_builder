import type { RefObject } from "react";

import type { CV } from "../../models/cv.schema";
import type { ZoomLevel } from "../../utils/constants";
import { LiquidGlassTemplate } from "../../templates/liquid-glass/LiquidGlassTemplate";

interface PreviewPaneProps {
  cv: CV;
  zoom: ZoomLevel;
  templateRef: RefObject<HTMLDivElement | null>;
}

export const PreviewPane = ({ cv, zoom, templateRef }: PreviewPaneProps) => {
  return (
    <div className="preview-stage">
      <div className={`preview-scale zoom-${zoom}`}>
        <LiquidGlassTemplate ref={templateRef} cv={cv} />
      </div>
    </div>
  );
};
