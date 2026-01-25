const splitAndClean = (
  value: string,
  separator: string,
  trailingPattern?: RegExp,
) => {
  const cleaned = value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);

  if (trailingPattern?.test(value) && cleaned.length > 0) {
    cleaned.push("");
  }

  return cleaned;
};

export const joinLines = (items: string[]) => items.join("\n");

export const splitLines = (value: string) =>
  splitAndClean(value, "\n", /\n$/);

export const joinCommaList = (items: string[]) => items.join(", ");

export const splitCommaList = (value: string) =>
  splitAndClean(value, ",", /,\s*$/);
