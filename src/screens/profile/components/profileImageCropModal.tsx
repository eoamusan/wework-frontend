"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@wew/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@wew/components/ui/modal";

import { ProfileImageCropPreview } from "./profileImageCropPreview";
import { ProfileImageCropSidebar } from "./profileImageCropSidebar";
import {
  CONTAINER_SIZE,
  clamp,
  createInitialCropBox,
  getImageBounds,
  resizeCropBox,
} from "./profileImageCropUtils";

import type { CropBox, ResizeEdge } from "./profileImageCropUtils";

type ProfileImageCropModalProps = {
  imageUrl: string;
  isSubmitting?: boolean;
  onConfirm: (values: {
    containerSize: number;
    cropSize: number;
    cropX: number;
    cropY: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
  }) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export function ProfileImageCropModal({
  imageUrl,
  isSubmitting = false,
  onConfirm,
  onOpenChange,
  open,
}: ProfileImageCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [cropBox, setCropBox] = useState<CropBox>(createInitialCropBox);
  const [imageSize, setImageSize] = useState<{ height: number; width: number } | null>(null);
  const imageDragRef = useRef<{
    pointerId: number;
    startOffsetX: number;
    startOffsetY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const resizeRef = useRef<{
    edge: ResizeEdge;
    pointerId: number;
    startCropBox: CropBox;
    startX: number;
    startY: number;
  } | null>(null);

  const bounds = useMemo(() => getImageBounds(imageSize, zoom), [imageSize, zoom]);

  useEffect(() => {
    setOffsetX((current) => clamp(current, -bounds.maxOffsetX, bounds.maxOffsetX));
    setOffsetY((current) => clamp(current, -bounds.maxOffsetY, bounds.maxOffsetY));
  }, [bounds.maxOffsetX, bounds.maxOffsetY]);

  const resetState = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setImageSize(null);
    setCropBox(createInitialCropBox());
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) {
      return;
    }
    onOpenChange(nextOpen);
    if (!nextOpen) {
      resetState();
    }
  };

  const handleConfirm = async () => {
    await onConfirm({
      containerSize: CONTAINER_SIZE,
      cropSize: cropBox.size,
      cropX: cropBox.x,
      cropY: cropBox.y,
      offsetX,
      offsetY,
      zoom,
    });
  };

  const handleImagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (resizeRef.current) {
      return;
    }
    imageDragRef.current = {
      pointerId: event.pointerId,
      startOffsetX: offsetX,
      startOffsetY: offsetY,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleImagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = imageDragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }
    setOffsetX(
      clamp(
        dragState.startOffsetX + (event.clientX - dragState.startX),
        -bounds.maxOffsetX,
        bounds.maxOffsetX,
      ),
    );
    setOffsetY(
      clamp(
        dragState.startOffsetY + (event.clientY - dragState.startY),
        -bounds.maxOffsetY,
        bounds.maxOffsetY,
      ),
    );
  };

  const handleImagePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (imageDragRef.current?.pointerId !== event.pointerId) {
      return;
    }
    imageDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleResizePointerDown = (
    edge: ResizeEdge,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    resizeRef.current = {
      edge,
      pointerId: event.pointerId,
      startCropBox: cropBox,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const resizeState = resizeRef.current;
    if (!resizeState || resizeState.pointerId !== event.pointerId) {
      return;
    }
    const { edge, startCropBox, startX, startY } = resizeState;
    setCropBox(
      resizeCropBox(
        edge,
        startCropBox,
        event.clientX - startX,
        event.clientY - startY,
      ),
    );
  };

  const handleResizePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (resizeRef.current?.pointerId !== event.pointerId) {
      return;
    }
    resizeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((current) => clamp(Number((current + (event.deltaY > 0 ? -0.08 : 0.08)).toFixed(2)), 1, 3));
  };

  return (
    <Modal onOpenChange={handleOpenChange} open={open}>
      <ModalContent
        className="w-[min(92vw,44rem)] gap-5 rounded-[1.5rem] border border-[#ece6fb] bg-white p-6 sm:p-8"
        showCloseButton={!isSubmitting}
      >
        <ModalHeader>
          <ModalTitle>Crop profile picture</ModalTitle>
          <ModalDescription>
            Drag the photo to reposition it, then resize the crop area from any edge.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
          <ProfileImageCropPreview
            bounds={bounds}
            cropBox={cropBox}
            imageUrl={imageUrl}
            offsetX={offsetX}
            offsetY={offsetY}
            onImageLoad={setImageSize}
            onImagePointerDown={handleImagePointerDown}
            onImagePointerMove={handleImagePointerMove}
            onImagePointerUp={handleImagePointerUp}
            onResizePointerDown={handleResizePointerDown}
            onResizePointerMove={handleResizePointerMove}
            onResizePointerUp={handleResizePointerUp}
            onWheel={handleWheel}
          />
          <ProfileImageCropSidebar onZoomChange={setZoom} zoom={zoom} />
        </div>
        <ModalFooter>
          <Button
            className="h-12 rounded-[0.9rem] px-5 shadow-none hover:translate-y-0"
            onClick={() => handleOpenChange(false)}
            size={null}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="h-12 rounded-[0.9rem] px-5 shadow-none hover:translate-y-0"
            isLoading={isSubmitting}
            loadingText="Uploading..."
            onClick={handleConfirm}
            size={null}
            type="button"
            variant="primary"
          >
            Crop and upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
