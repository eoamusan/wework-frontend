"use client";

import { useMutation } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { postData } from "@wew/lib/requests";

export type ForgotPasswordPayload = {
  email: string;
};

type ForgotPasswordResponse = {
  accountId?: string;
  message?: string;
};

export function useForgotPasswordMutation() {
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      postData<ForgotPasswordPayload, ForgotPasswordResponse>(
        "wework/auth/forgot-password",
        payload,
      ),
  });

  const forgotPasswordHandler = async (payload: ForgotPasswordPayload) => {
    try {
      const response = await mutation.mutateAsync(payload);

      notifySuccess({
        successMessage: "A verification code has been sent to your email.",
        successTitle: "Check your email",
      });

      return response;
    } catch (error) {
      notifyError(error, {
        errorMessage:
          "We could not start the password reset process. Please try again.",
        errorTitle: "Request failed",
      });
      throw error;
    }
  };

  return {
    forgotPasswordHandler,
    isPending: mutation.isPending,
  };
}
