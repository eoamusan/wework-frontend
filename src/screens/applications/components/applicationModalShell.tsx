"use client";

import type { ReactNode } from "react";

import Image from "next/image";

import documentIcon from "@wew/assets/icons/document.svg";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from "@wew/components/ui/modal";
import { cn } from "@wew/lib/utils";

type ApplicationModalShellProps = {
  children: ReactNode;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  widthClassName?: string;
  badge?: ReactNode;
};

export function ApplicationModalShell({
  badge,
  children,
  description,
  onOpenChange,
  open,
  title,
  widthClassName,
}: ApplicationModalShellProps) {
  return (
    <Modal onOpenChange={onOpenChange} open={open}>
      <ModalContent
        className={cn(
          "flex max-h-[92vh] flex-col gap-0 overflow-hidden rounded-[1.75rem] border border-[#ebe6ff] bg-white px-0 py-0 shadow-[0_40px_120px_rgba(6,2,18,0.2)]",
          widthClassName || "w-[min(96vw,48rem)]",
        )}
      >
        <div className="border-b border-[#f0edf8] px-8 py-7">
          <div className="flex items-center gap-4">
            <div className="mt-1 flex size-11 items-center justify-center rounded-full bg-[#254C00] text-white">
              <Image alt="document" height={16} src={documentIcon} width={16} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-5">
                <ModalTitle className="text-2xl font-semibold tracking-[-0.05em] text-dark">
                  {title}
                </ModalTitle>
                {badge}
              </div>

              <ModalDescription className="mt-1 text-base text-gray">
                {description}
              </ModalDescription>
            </div>
          </div>
        </div>

        <div className="app-accent-scrollbar min-h-0 flex-1 overflow-y-auto bg-[#f7f8fd] px-7 py-7">
          {children}
        </div>
      </ModalContent>
    </Modal>
  );
}
