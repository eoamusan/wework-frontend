import { FC } from "react";

import { X } from "lucide-react";

import { Button } from "@wew/components/ui/button";
import {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@wew/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@wew/components/ui/radio-group";
import { cn } from "@wew/lib/utils";

interface SelectAccountTypeProps {
  accountType: string;
  setAccountType: (value: string) => void;
}

const SelectAccountTypeModalContent: FC<SelectAccountTypeProps> = ({
  accountType,
  setAccountType,
}) => {
  return (
    <ModalContent
      className="w-[min(94vw,720px)] gap-8 rounded-[2rem] border border-[#ece8f7] bg-white px-6 py-10 shadow-[0_28px_70px_rgba(6,2,18,0.18)] sm:px-14"
      showCloseButton={false}
    >
      <ModalClose
        aria-label="Close account type modal"
        className="absolute top-7 right-7 rounded-full p-2 text-secondary/75 transition hover:bg-black/5 hover:text-dark-soft"
      >
        <X className="size-7 stroke-[1.75]" />
      </ModalClose>

      <ModalHeader className="items-center text-center">
        <ModalTitle className="text-4xl font-semibold tracking-[-0.04em] text-dark">
          Select Account Type
        </ModalTitle>

        <ModalDescription className="text-lg text-gray">
          Pick the account that applies to you
        </ModalDescription>
      </ModalHeader>

      <RadioGroup
        className="gap-5 space-y-5"
        onValueChange={setAccountType}
        value={accountType}
      >
        <label
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-[1rem] border px-4 py-7 shadow-[0_8px_24px_rgba(6,2,18,0.04)] transition-colors",
            accountType === "company"
              ? "border-[#D3D3D380] bg-[#D9D9D926]"
              : "border-[#e7e3ef] bg-white",
          )}
        >
          <RadioGroupItem value="company" />
          <span className="text-base font-medium text-secondary">
            Sign up as a Company
          </span>
        </label>

        <label
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-[1rem] border px-4 py-7 shadow-[0_8px_24px_rgba(6,2,18,0.04)] transition-colors",
            accountType === "applicant"
              ? "border-[#D3D3D380] bg-[#D9D9D926]"
              : "border-[#e7e3ef] bg-white",
          )}
        >
          <RadioGroupItem value="applicant" />
          <span className="text-base font-medium text-secondary">
            Sign up as an Applicant
          </span>
        </label>
      </RadioGroup>

      <ModalClose asChild>
        <Button
          className="h-14 w-full rounded-[1.2rem] text-[1.05rem] shadow-[0_20px_40px_rgba(51,0,201,0.22)]"
          size={null}
          type="button"
          variant="primary"
        >
          Continue
        </Button>
      </ModalClose>
    </ModalContent>
  );
};

export default SelectAccountTypeModalContent;
