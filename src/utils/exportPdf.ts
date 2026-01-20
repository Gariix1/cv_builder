const sanitizeFileName = (value: string) => {
  const sanitized = value
    .trim()
    .replace(/[^a-z0-9-_]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  return sanitized.length > 0 ? sanitized : "CV";
};

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
    window.print();
  } finally {
    document.title = previousTitle;
    document.documentElement.classList.remove("exporting");
  }
};
