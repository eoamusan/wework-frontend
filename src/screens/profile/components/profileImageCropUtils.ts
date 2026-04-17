export type CropBox = {
  size: number;
  x: number;
  y: number;
};

export type ResizeEdge = "bottom" | "left" | "right" | "top";

export const CONTAINER_SIZE = 320;
export const INITIAL_CROP_SIZE = 220;
export const MIN_CROP_SIZE = 120;

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function createInitialCropBox(): CropBox {
  return {
    size: INITIAL_CROP_SIZE,
    x: (CONTAINER_SIZE - INITIAL_CROP_SIZE) / 2,
    y: (CONTAINER_SIZE - INITIAL_CROP_SIZE) / 2,
  };
}

export function getImageBounds(
  imageSize: { height: number; width: number } | null,
  zoom: number,
) {
  if (!imageSize) {
    return {
      height: CONTAINER_SIZE,
      maxOffsetX: 0,
      maxOffsetY: 0,
      width: CONTAINER_SIZE,
    };
  }

  const coverScale = Math.max(
    CONTAINER_SIZE / imageSize.width,
    CONTAINER_SIZE / imageSize.height,
  );
  const width = imageSize.width * coverScale * zoom;
  const height = imageSize.height * coverScale * zoom;

  return {
    height,
    maxOffsetX: Math.max(0, (width - CONTAINER_SIZE) / 2),
    maxOffsetY: Math.max(0, (height - CONTAINER_SIZE) / 2),
    width,
  };
}

export function resizeCropBox(
  edge: ResizeEdge,
  cropBox: CropBox,
  deltaX: number,
  deltaY: number,
) {
  const right = cropBox.x + cropBox.size;
  const bottom = cropBox.y + cropBox.size;
  const centerX = cropBox.x + cropBox.size / 2;
  const centerY = cropBox.y + cropBox.size / 2;

  if (edge === "left") {
    const nextLeft = clamp(cropBox.x + deltaX, 0, right - MIN_CROP_SIZE);
    const nextSize = right - nextLeft;

    return {
      size: nextSize,
      x: nextLeft,
      y: clamp(centerY - nextSize / 2, 0, CONTAINER_SIZE - nextSize),
    };
  }

  if (edge === "right") {
    const nextRight = clamp(right + deltaX, cropBox.x + MIN_CROP_SIZE, CONTAINER_SIZE);
    const nextSize = nextRight - cropBox.x;

    return {
      size: nextSize,
      x: cropBox.x,
      y: clamp(centerY - nextSize / 2, 0, CONTAINER_SIZE - nextSize),
    };
  }

  if (edge === "top") {
    const nextTop = clamp(cropBox.y + deltaY, 0, bottom - MIN_CROP_SIZE);
    const nextSize = bottom - nextTop;

    return {
      size: nextSize,
      x: clamp(centerX - nextSize / 2, 0, CONTAINER_SIZE - nextSize),
      y: nextTop,
    };
  }

  const nextBottom = clamp(bottom + deltaY, cropBox.y + MIN_CROP_SIZE, CONTAINER_SIZE);
  const nextSize = nextBottom - cropBox.y;

  return {
    size: nextSize,
    x: clamp(centerX - nextSize / 2, 0, CONTAINER_SIZE - nextSize),
    y: cropBox.y,
  };
}
