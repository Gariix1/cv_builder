export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

export const STORAGE_KEY = "cv_builder:cv";
export const DEBOUNCE_MS = 300;

export const ZOOM_LEVELS = [90, 100, 110] as const;
export type ZoomLevel = (typeof ZOOM_LEVELS)[number];
export const DEFAULT_ZOOM: ZoomLevel = 100;

export const EXPORT_PIXEL_RATIO = 2;
