"use client";

import { useMutation } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { postData } from "@wew/lib/requests";

export type ResetPasswordPayload = {
  confirmPassword: string;
  email: string;
  otp: string;
  password: string;
};

type ResetPasswordResponse = {
  message?: string;
};

export function useResetPasswordMutation() {
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      postData<ResetPasswordPayload, ResetPasswordResponse>(
        "wework/auth/forgot-password/reset",
        payload,
      ),
  });

  const resetPasswordHandler = async (payload: ResetPasswordPayload) => {
    try {
      const response = await mutation.mutateAsync(payload);

      notifySuccess({
        successMessage: "Your password has been reset successfully.",
        successTitle: "Password updated",
      });

      return response;
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not reset your password. Please try again.",
        errorTitle: "Reset failed",
      });
      throw error;
    }
  };

  return {
    isPending: mutation.isPending,
    resetPasswordHandler,
  };
}
