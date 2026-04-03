"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { type AccountType, setStoredRedirectPath } from "@wew/lib/auth";
import { postData } from "@wew/lib/requests";
import type { CreateApplicantAccountFormValues } from "@wew/lib/schemas/create-applicant-account-form";

export type SignUpPayload = {
  accountType: AccountType;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  marketing: boolean;
  password: string;
  phoneNumber: string;
};

type SignUpResponse = {
  message?: string;
};

type UseSignUpMutationParams = {
  accountType: AccountType;
  redirectTo?: string;
};

export function useSignUpMutation({
  accountType,
  redirectTo = "",
}: UseSignUpMutationParams) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: SignUpPayload) =>
      postData<SignUpPayload, SignUpResponse>("wework/auth/signup", payload),
  });

  const signUpHandler = async (values: CreateApplicantAccountFormValues) => {
    await mutation.mutateAsync({
      accountType,
      confirmPassword: values.confirmPassword,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      marketing: accountType === "applicant" ? false : values.receiveMarketing,
      password: values.password,
      phoneNumber: values.phoneNumber,
    });

    if (redirectTo) {
      setStoredRedirectPath(redirectTo);
    }

    router.push(
      `/login?accountType=${accountType}${redirectTo ? `&redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    );
  };

  return {
    isPending: mutation.isPending,
    signUpHandler,
  };
}
