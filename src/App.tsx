import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { EditorPanel } from "./components/editor";
import { AppShell } from "./components/layout";
import {
  ExportThemeModal,
  PreviewControls,
  PreviewPane,
} from "./components/preview";
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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
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

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", theme === "dark");
    root.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  const handleExportRequest = () => {
    if (isExporting || isExportModalOpen) {
      return;
    }
    setIsExportModalOpen(true);
  };

  const handleExportTheme = async (nextTheme: "light" | "dark") => {
    if (!templateRef.current || isExporting) {
      return;
    }

    const previousTheme = theme;

    flushSync(() => {
      setIsExporting(true);
      if (nextTheme !== previousTheme) {
        setTheme(nextTheme);
      }
    });

    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => resolve()),
      );
    });

    try {
      const { exportPdf } = await import("./utils/exportPdf");
      await exportPdf(templateRef.current, cv.profile.fullName);
    } finally {
      flushSync(() => {
        if (nextTheme !== previousTheme) {
          setTheme(previousTheme);
        }
        setIsExporting(false);
      });
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
            onExport={handleExportRequest}
            isExporting={isExporting}
          />
        }
        preview={<PreviewPane cv={cv} zoom={zoom} templateRef={templateRef} />}
      />
      <ExportThemeModal
        isOpen={isExportModalOpen}
        cv={cv}
        isExporting={isExporting}
        onSelect={handleExportTheme}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default App;
