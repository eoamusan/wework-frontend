"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import { CONTAINER_SIZE, type CropBox, type ResizeEdge } from "./profileImageCropUtils";

type ProfileImageCropPreviewProps = {
  bounds: {
    height: number;
    width: number;
  };
  cropBox: CropBox;
  imageUrl: string;
  offsetX: number;
  offsetY: number;
  onImageLoad: (values: { height: number; width: number }) => void;
  onImagePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onImagePointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onImagePointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onResizePointerDown: (
    edge: ResizeEdge,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => void;
  onResizePointerMove: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onResizePointerUp: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onWheel: (event: ReactWheelEvent<HTMLDivElement>) => void;
};

function EdgeHandle({
  ariaLabel,
  className,
  edge,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  style,
}: {
  ariaLabel: string;
  className: string;
  edge: ResizeEdge;
  onPointerDown: (
    edge: ResizeEdge,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  style: CSSProperties;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={className}
      onPointerCancel={onPointerUp}
      onPointerDown={(event) => onPointerDown(edge, event)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={style}
      type="button"
    />
  );
}

export function ProfileImageCropPreview({
  bounds,
  cropBox,
  imageUrl,
  offsetX,
  offsetY,
  onImageLoad,
  onImagePointerDown,
  onImagePointerMove,
  onImagePointerUp,
  onResizePointerDown,
  onResizePointerMove,
  onResizePointerUp,
  onWheel,
}: ProfileImageCropPreviewProps) {
  return (
    <div className="flex justify-center">
      <div
        aria-label="Image crop preview"
        className="relative overflow-hidden rounded-[2rem] bg-[#f5f2ff] touch-none"
        onPointerCancel={onImagePointerUp}
        onPointerDown={onImagePointerDown}
        onPointerMove={onImagePointerMove}
        onPointerUp={onImagePointerUp}
        onWheel={onWheel}
        style={{ height: CONTAINER_SIZE, width: CONTAINER_SIZE }}
      >
        <img
          alt="Crop preview"
          className="pointer-events-none absolute max-w-none select-none"
          draggable={false}
          onLoad={(event) =>
            onImageLoad({
              height: event.currentTarget.naturalHeight,
              width: event.currentTarget.naturalWidth,
            })}
          src={imageUrl}
          style={{
            height: bounds.height,
            left: `calc(50% + ${offsetX}px)`,
            top: `calc(50% + ${offsetY}px)`,
            transform: "translate(-50%, -50%)",
            width: bounds.width,
          }}
        />

        <div
          className="pointer-events-none absolute left-0 right-0 top-0 bg-[rgba(10,10,25,0.58)]"
          style={{ height: cropBox.y }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 bg-[rgba(10,10,25,0.58)]"
          style={{ top: cropBox.y + cropBox.size }}
        />
        <div
          className="pointer-events-none absolute left-0 bg-[rgba(10,10,25,0.58)]"
          style={{
            height: cropBox.size,
            top: cropBox.y,
            width: cropBox.x,
          }}
        />
        <div
          className="pointer-events-none absolute right-0 bg-[rgba(10,10,25,0.58)]"
          style={{
            height: cropBox.size,
            left: cropBox.x + cropBox.size,
            top: cropBox.y,
          }}
        />

        <div
          className="pointer-events-none absolute rounded-[1.5rem] border-2 border-white shadow-[0_0_0_1px_rgba(10,10,25,0.08)]"
          style={{
            height: cropBox.size,
            left: cropBox.x,
            top: cropBox.y,
            width: cropBox.size,
          }}
        />

        <EdgeHandle
          ariaLabel="Resize crop from top edge"
          className="absolute z-10 h-4 w-16 -translate-x-1/2 cursor-ns-resize rounded-full border border-white/80 bg-white/90 shadow-sm"
          edge="top"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          style={{
            left: cropBox.x + cropBox.size / 2,
            top: cropBox.y - 8,
          }}
        />
        <EdgeHandle
          ariaLabel="Resize crop from bottom edge"
          className="absolute z-10 h-4 w-16 -translate-x-1/2 cursor-ns-resize rounded-full border border-white/80 bg-white/90 shadow-sm"
          edge="bottom"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          style={{
            left: cropBox.x + cropBox.size / 2,
            top: cropBox.y + cropBox.size - 8,
          }}
        />
        <EdgeHandle
          ariaLabel="Resize crop from left edge"
          className="absolute z-10 h-16 w-4 -translate-y-1/2 cursor-ew-resize rounded-full border border-white/80 bg-white/90 shadow-sm"
          edge="left"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          style={{
            left: cropBox.x - 8,
            top: cropBox.y + cropBox.size / 2,
          }}
        />
        <EdgeHandle
          ariaLabel="Resize crop from right edge"
          className="absolute z-10 h-16 w-4 -translate-y-1/2 cursor-ew-resize rounded-full border border-white/80 bg-white/90 shadow-sm"
          edge="right"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          style={{
            left: cropBox.x + cropBox.size - 8,
            top: cropBox.y + cropBox.size / 2,
          }}
        />
      </div>
    </div>
  );
}
