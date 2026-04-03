import type { ReactNode } from "react";

import { cn } from "@wew/lib/utils";

type UploadDropzoneButtonProps = {
  children?: ReactNode;
  className?: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  title: string;
};

export function UploadDropzoneButton({
  children,
  className,
  description,
  icon,
  onClick,
  title,
}: UploadDropzoneButtonProps) {
  return (
    <button
      className={cn(
        "flex min-h-[264px] w-full flex-col items-center justify-center rounded-[1rem] border border-dashed border-[#ddd7ef] bg-[#00000005] px-6 text-center transition hover:bg-[#faf9ff]",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {icon}
      <p className="mt-6 text-xl text-dark/88">{title}</p>
      <p className="mt-2 text-sm text-dark/45">{description}</p>
      {children}
    </button>
  );
}
