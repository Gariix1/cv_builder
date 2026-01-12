import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import { A4_HEIGHT_MM, A4_WIDTH_MM, EXPORT_PIXEL_RATIO } from "./constants";

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

  try {
    if (document.fonts && "ready" in document.fonts) {
      await document.fonts.ready;
    }

    const dataUrl = await toPng(element, {
      pixelRatio: EXPORT_PIXEL_RATIO,
      cacheBust: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [A4_WIDTH_MM, A4_HEIGHT_MM],
    });

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      A4_WIDTH_MM,
      A4_HEIGHT_MM,
      undefined,
      "FAST",
    );

    pdf.save(`${sanitizeFileName(fullName)}_CV.pdf`);
  } finally {
    document.documentElement.classList.remove("exporting");
  }
};
