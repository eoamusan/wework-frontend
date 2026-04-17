"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { setStoredRedirectPath } from "@wew/lib/auth";
import { postData } from "@wew/lib/requests";
import type { CreateCompanyAccountFormValues } from "@wew/lib/schemas/create-company-account-form";

export type CompanySignUpPayload = {
  companyName: string;
  confirmPassword: string;
  email: string;
  industryType: string;
  marketing: boolean;
  password: string;
  phoneNumber: string;
};

type CompanySignUpResponse = {
  message?: string;
};

type UseCompanySignUpMutationParams = {
  redirectTo?: string;
};

export function useCompanySignUpMutation({
  redirectTo = "",
}: UseCompanySignUpMutationParams = {}) {
  const router = useRouter();
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: CompanySignUpPayload) =>
      postData<CompanySignUpPayload, CompanySignUpResponse>(
        "wework/auth/signup/company",
        payload,
      ),
  });

  const signUpHandler = async (values: CreateCompanyAccountFormValues) => {
    try {
      await mutation.mutateAsync({
        companyName: values.companyName,
        confirmPassword: values.confirmPassword,
        email: values.email,
        industryType: values.industryType,
        marketing: values.receiveMarketing,
        password: values.password,
        phoneNumber: values.phoneNumber,
      });
    } catch (error) {
      notifyError(error, {
        errorMessage:
          "We could not create your company account. Please try again.",
        errorTitle: "Sign up failed",
      });
      throw error;
    }

    if (redirectTo) {
      setStoredRedirectPath(redirectTo);
    }

    notifySuccess({
      successMessage: "Your company account has been created successfully.",
      successTitle: "Account created",
    });

    router.push(
      `/login?accountType=company${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    );
  };

  return {
    isPending: mutation.isPending,
    signUpHandler,
  };
}
