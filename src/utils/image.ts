const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = src;
  });

export const estimateDataUrlBytes = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.ceil((base64.length * 3) / 4);
};

interface NormalizeImageOptions {
  size?: number;
  quality?: number;
  type?: "image/jpeg" | "image/png";
}

export const normalizeImageFile = async (
  file: File,
  { size = 320, quality = 0.9, type = "image/jpeg" }: NormalizeImageOptions = {},
) => {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context unavailable");
  }

  const minSide = Math.min(image.width, image.height);
  const sourceX = (image.width - minSide) / 2;
  const sourceY = (image.height - minSide) / 2;

  canvas.width = size;
  canvas.height = size;

  context.drawImage(
    image,
    sourceX,
    sourceY,
    minSide,
    minSide,
    0,
    0,
    size,
    size,
  );

  return canvas.toDataURL(type, quality);
};
