"use client";

export type ImageCropTransform = {
  containerSize: number;
  cropSize: number;
  cropX: number;
  cropY: number;
  offsetX: number;
  offsetY: number;
  zoom: number;
};

function loadImage(sourceUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("We could not load that image."));
    image.src = sourceUrl;
  });
}

function getOutputMimeType(file: File) {
  if (file.type === "image/png" || file.type === "image/webp") {
    return file.type;
  }

  return "image/jpeg";
}

function buildCroppedFileName(file: File, mimeType: string) {
  const extension = mimeType === "image/png"
    ? "png"
    : mimeType === "image/webp"
      ? "webp"
      : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "profile-picture";

  return `${baseName}-cropped.${extension}`;
}

export async function createCroppedImageFile(
  sourceUrl: string,
  file: File,
  transform: ImageCropTransform,
) {
  const image = await loadImage(sourceUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Your browser does not support image cropping.");
  }

  const coverScale = Math.max(
    transform.containerSize / image.naturalWidth,
    transform.containerSize / image.naturalHeight,
  );
  const scaledWidth = image.naturalWidth * coverScale * transform.zoom;
  const scaledHeight = image.naturalHeight * coverScale * transform.zoom;
  const imageX = (transform.containerSize - scaledWidth) / 2 + transform.offsetX;
  const imageY = (transform.containerSize - scaledHeight) / 2 + transform.offsetY;
  const sourceX = Math.max(
    0,
    ((transform.cropX - imageX) / scaledWidth) * image.naturalWidth,
  );
  const sourceY = Math.max(
    0,
    ((transform.cropY - imageY) / scaledHeight) * image.naturalHeight,
  );
  const sourceWidth = Math.min(
    image.naturalWidth - sourceX,
    (transform.cropSize / scaledWidth) * image.naturalWidth,
  );
  const sourceHeight = Math.min(
    image.naturalHeight - sourceY,
    (transform.cropSize / scaledHeight) * image.naturalHeight,
  );
  const mimeType = getOutputMimeType(file);

  canvas.width = 600;
  canvas.height = 600;

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (!value) {
        reject(new Error("We could not finish cropping that image."));
        return;
      }

      resolve(value);
    }, mimeType, 0.92);
  });

  return new File([blob], buildCroppedFileName(file, mimeType), {
    lastModified: Date.now(),
    type: mimeType,
  });
}
