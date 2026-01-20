const splitAndClean = (value: string, separator: string) =>
  value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);

export const joinLines = (items: string[]) => items.join("\n");

export const splitLines = (value: string) => splitAndClean(value, "\n");

export const joinCommaList = (items: string[]) => items.join(", ");

export const splitCommaList = (value: string) => splitAndClean(value, ",");
