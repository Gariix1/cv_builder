const sanitizeFileName = (value: string) => {
  const sanitized = value
    .trim()
    .replace(/[^a-z0-9-_]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  return sanitized.length > 0 ? sanitized : "CV";
};

const waitForPrintToFinish = () =>
  new Promise<void>((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    let resolved = false;
    let timeoutId: number | undefined;
    const mediaQuery = window.matchMedia?.("print");
    let handleChange: ((event: MediaQueryListEvent) => void) | null = null;

    const finish = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      window.removeEventListener("afterprint", finish);
      window.removeEventListener("focus", finish);
      if (mediaQuery && handleChange) {
        if ("removeEventListener" in mediaQuery) {
          mediaQuery.removeEventListener("change", handleChange);
        } else if ("removeListener" in mediaQuery) {
          mediaQuery.removeListener(handleChange);
        }
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      resolve();
    };

    if (mediaQuery) {
      handleChange = (event) => {
        if (!event.matches) {
          finish();
        }
      };
      if ("addEventListener" in mediaQuery) {
        mediaQuery.addEventListener("change", handleChange);
      } else if ("addListener" in mediaQuery) {
        mediaQuery.addListener(handleChange);
      }
    }

    window.addEventListener("afterprint", finish, { once: true });
    window.addEventListener("focus", finish, { once: true });
    timeoutId = window.setTimeout(finish, 120000);
  });

export const exportPdf = async (
  element: HTMLElement,
  fullName: string,
): Promise<void> => {
  if (!element) {
    return;
  }

  document.documentElement.classList.add("exporting");
  const previousTitle = document.title;

  try {
    if (document.fonts && "ready" in document.fonts) {
      await document.fonts.ready;
    }
    document.title = `${sanitizeFileName(fullName)}_CV`;
    const printDone = waitForPrintToFinish();
    window.print();
    await printDone;
  } finally {
    document.title = previousTitle;
    document.documentElement.classList.remove("exporting");
  }
};
