"use client";

import { X } from "lucide-react";
import Image from "next/image";

import successIcon from "@wew/assets/icons/success.svg";
import { Button } from "@wew/components/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@wew/components/ui/modal";

type SuccessModalProps = {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
};

export function SuccessModal({
  actionLabel = "Done",
  description,
  onAction,
  onOpenChange,
  open,
  title,
}: SuccessModalProps) {
  const handleAction = () => {
    onAction?.();
    onOpenChange(false);
  };

  return (
    <Modal onOpenChange={onOpenChange} open={open}>
      <ModalContent
        className="w-[min(92vw,41.25rem)] gap-0 overflow-hidden rounded-[1.25rem] border border-[#ebe6ff] bg-white px-0 py-0 text-center shadow-[0_40px_120px_rgba(6,2,18,0.2)]"
        showCloseButton={false}
      >
        <div className="relative px-6 pt-7 pb-8 sm:px-8">
          <ModalClose className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full p-1 text-secondary/75 transition hover:bg-[#f5f2ff] hover:text-dark-soft">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </ModalClose>

          <div className="mx-auto flex w-full max-w-[21rem] flex-col items-center">
            <Image
              alt="Success"
              className="mt-6 h-auto w-[6.75rem]"
              priority
              src={successIcon}
            />

            <ModalHeader className="mt-8 text-center">
              <ModalTitle className="text-4xl font-bold tracking-[-0.05em] text-secondary">
                {title}
              </ModalTitle>
              <ModalDescription className="mx-auto max-w-[24rem] text-lg leading-8 text-secondary">
                {description}
              </ModalDescription>
            </ModalHeader>
          </div>
        </div>

        <div className="border-t border-[#f0edf8] px-6 py-7 sm:px-8">
          <Button
            className="h-13 w-full rounded-[0.9rem] text-base shadow-none hover:translate-y-0"
            onClick={handleAction}
            size={null}
            type="button"
            variant="primary"
          >
            {actionLabel}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
