import { useEffect, useMemo, useRef, useState } from "react";

import { EditorPanel } from "./components/editor/EditorPanel";
import { AppShell } from "./components/layout/AppShell";
import { PreviewControls } from "./components/preview/PreviewControls";
import { PreviewPane } from "./components/preview/PreviewPane";
import type { CV } from "./models/cv.schema";
import { useCVStore } from "./store/cvStore";
import { exportPdf } from "./utils/exportPdf";
import { createDebouncedSaver } from "./utils/storage";
import { DEFAULT_ZOOM, type ZoomLevel } from "./utils/constants";

const App = () => {
  const cv = useCVStore((state) => state.cv);
  const templateRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<ZoomLevel>(DEFAULT_ZOOM);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isExporting, setIsExporting] = useState(false);

  const persist = useMemo(() => createDebouncedSaver(), []);

  useEffect(() => {
    const unsubscribe = useCVStore.subscribe(
      (state) => state.cv,
      (nextCV: CV) => persist(nextCV),
    );

    return unsubscribe;
  }, [persist]);

  const handleExport = async () => {
    if (!templateRef.current || isExporting) {
      return;
    }

    setIsExporting(true);

    try {
      await exportPdf(templateRef.current, cv.profile.fullName);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <AppShell
        editor={<EditorPanel />}
        previewControls={
          <PreviewControls
            zoom={zoom}
            onZoomChange={setZoom}
            theme={theme}
            onThemeToggle={() =>
              setTheme((current) => (current === "light" ? "dark" : "light"))
            }
            onExport={handleExport}
            isExporting={isExporting}
          />
        }
        preview={<PreviewPane cv={cv} zoom={zoom} templateRef={templateRef} />}
      />
    </div>
  );
};

export default App;
