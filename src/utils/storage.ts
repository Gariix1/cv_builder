import type { CV } from "../models/cv.schema";
import { DEBOUNCE_MS, STORAGE_KEY } from "./constants";
import { normalizeCV } from "./normalizeCv";

export const loadCV = (fallback: CV): CV => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as unknown;
    return normalizeCV(parsed, fallback);
  } catch {
    return fallback;
  }
};

export const saveCV = (cv: CV): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
    return true;
  } catch {
    return false;
  }
};

interface DebouncedSaverOptions {
  delayMs?: number;
  onError?: (error: Error) => void;
}

export const createDebouncedSaver = (options: DebouncedSaverOptions = {}) => {
  const { delayMs = DEBOUNCE_MS, onError } = options;
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (cv: CV) => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      const success = saveCV(cv);
      if (!success && onError) {
        onError(new Error("Failed to save to local storage."));
      }
    }, delayMs);
  };
};
