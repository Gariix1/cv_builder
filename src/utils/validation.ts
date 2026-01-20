import type { TranslationKey } from "../i18n";

export const hasText = (value?: string) => Boolean(value && value.trim().length > 0);

export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

export const isYear = (value: string) => /^(19|20)\d{2}$/.test(value.trim());

export const isUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      new URL(trimmed);
      return true;
    } catch {
      return false;
    }
  }

  return /\./.test(trimmed) && !/\s/.test(trimmed);
};

export const validateEmail = (value: string): TranslationKey | null =>
  hasText(value) && !isEmail(value) ? "validationInvalidEmail" : null;

export const validateUrl = (value: string): TranslationKey | null =>
  hasText(value) && !isUrl(value) ? "validationInvalidUrl" : null;

export const validateYear = (value: string): TranslationKey | null =>
  hasText(value) && !isYear(value) ? "validationInvalidYear" : null;
