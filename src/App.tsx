import { useEffect, useMemo, useRef, useState } from "react";

import { EditorPanel } from "./components/editor";
import { AppShell } from "./components/layout";
import { PreviewControls, PreviewPane } from "./components/preview";
import type { TranslationKey } from "./i18n";
import type { CV } from "./models/cv.schema";
import { useCVStore } from "./store/cvStore";
import { createDebouncedSaver } from "./utils/storage";
import { DEFAULT_ZOOM, type ZoomLevel } from "./utils/constants";

const App = () => {
  const cv = useCVStore((state) => state.cv);
  const templateRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<ZoomLevel>(DEFAULT_ZOOM);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isExporting, setIsExporting] = useState(false);
  const [storageWarningKey, setStorageWarningKey] =
    useState<TranslationKey | null>(null);

  const persist = useMemo(
    () =>
      createDebouncedSaver({
        onError: () => setStorageWarningKey("storageWarning"),
      }),
    [],
  );

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
      const { exportPdf } = await import("./utils/exportPdf");
      await exportPdf(templateRef.current, cv.profile.fullName);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <AppShell
        editor={<EditorPanel storageWarningKey={storageWarningKey} />}
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
