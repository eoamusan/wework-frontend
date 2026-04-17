"use client";

import { useMutation } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { postData } from "@wew/lib/requests";

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type VerifyOtpResponse = {
  message?: string;
};

export function useVerifyOtpMutation() {
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: VerifyOtpPayload) =>
      postData<VerifyOtpPayload, VerifyOtpResponse>(
        "wework/auth/forgot-password/verify",
        payload,
      ),
  });

  const verifyOtpHandler = async (payload: VerifyOtpPayload) => {
    try {
      const response = await mutation.mutateAsync(payload);

      notifySuccess({
        successMessage: "Your verification code has been confirmed.",
        successTitle: "Code verified",
      });

      return response;
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not verify that code. Please try again.",
        errorTitle: "Verification failed",
      });
      throw error;
    }
  };

  return {
    isPending: mutation.isPending,
    verifyOtpHandler,
  };
}
