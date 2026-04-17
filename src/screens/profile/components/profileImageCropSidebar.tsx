"use client";

type ProfileImageCropSidebarProps = {
  zoom: number;
  onZoomChange: (value: number) => void;
};

export function ProfileImageCropSidebar({
  zoom,
  onZoomChange,
}: ProfileImageCropSidebarProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-medium text-secondary">Position</p>
        <p className="text-xs leading-5 text-secondary/70">
          Drag the image to place it under the crop box.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-secondary">Resize</p>
        <p className="text-xs leading-5 text-secondary/70">
          Pull any crop edge to reshape the selected area.
        </p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-secondary">Zoom</span>
        <input
          className="w-full accent-accent-blue"
          max={3}
          min={1}
          onChange={(event) => onZoomChange(Number(event.target.value))}
          step={0.01}
          type="range"
          value={zoom}
        />
      </label>
      <p className="text-xs leading-5 text-secondary/70">
        You can also use your mouse wheel or trackpad to zoom while the preview is focused.
      </p>
    </div>
  );
}
