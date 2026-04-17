"use client";

import { useToast } from "@wew/components/ui/useToast";
import { getErrorMessage } from "@wew/lib/feedback";

type MutationToastOptions = {
  errorMessage: string;
  errorTitle?: string;
  successMessage: string;
  successTitle?: string;
};

export function useMutationToast() {
  const toast = useToast();

  return {
    notifyError(error: unknown, options: Pick<MutationToastOptions, "errorMessage" | "errorTitle">) {
      toast.showError(getErrorMessage(error, options.errorMessage), options.errorTitle);
    },
    notifySuccess(options: Pick<MutationToastOptions, "successMessage" | "successTitle">) {
      toast.showSuccess(options.successMessage, options.successTitle);
    },
  };
}
