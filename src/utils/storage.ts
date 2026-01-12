import type { CV } from "../models/cv.schema";
import { DEBOUNCE_MS, STORAGE_KEY } from "./constants";

export const loadCV = (fallback: CV): CV => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as CV;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const saveCV = (cv: CV): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  } catch {
    return;
  }
};

export const createDebouncedSaver = (delayMs: number = DEBOUNCE_MS) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (cv: CV) => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => saveCV(cv), delayMs);
  };
};
