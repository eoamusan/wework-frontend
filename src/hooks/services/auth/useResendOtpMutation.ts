"use client";

import { useMutation } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { postData } from "@wew/lib/requests";

export type ResendOtpPayload = {
  accountId: string;
};

type ResendOtpResponse = {
  message?: string;
};

export function useResendOtpMutation() {
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: ResendOtpPayload) =>
      postData<ResendOtpPayload, ResendOtpResponse>(
        "wework/auth/security",
        payload,
      ),
  });

  const resendOtpHandler = async (payload: ResendOtpPayload) => {
    try {
      const response = await mutation.mutateAsync(payload);

      notifySuccess({
        successMessage: "A new verification code has been sent.",
        successTitle: "OTP resent",
      });

      return response;
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not resend the verification code.",
        errorTitle: "Resend failed",
      });
      throw error;
    }
  };

  return {
    isPending: mutation.isPending,
    resendOtpHandler,
  };
}
