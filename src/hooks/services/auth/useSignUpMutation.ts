"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { type AccountType, setStoredRedirectPath } from "@wew/lib/auth";
import { postData } from "@wew/lib/requests";
import type { CreateApplicantAccountFormValues } from "@wew/lib/schemas/create-applicant-account-form";
import type { CreateCompanyAccountFormValues } from "@wew/lib/schemas/create-company-account-form";

export type SignUpPayload = {
  accountType: AccountType;
  companyName?: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  industryType?: string;
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

  const signUpHandler = async (
    values: CreateApplicantAccountFormValues | CreateCompanyAccountFormValues,
  ) => {
    const isApplicantAccount = accountType === "applicant";

    await mutation.mutateAsync({
      accountType,
      companyName:
        isApplicantAccount || !("companyName" in values)
          ? undefined
          : values.companyName,
      confirmPassword: values.confirmPassword,
      email: values.email,
      firstName:
        isApplicantAccount && "firstName" in values ? values.firstName : "",
      industryType:
        isApplicantAccount || !("industryType" in values)
          ? undefined
          : values.industryType,
      lastName:
        isApplicantAccount && "lastName" in values ? values.lastName : "",
      marketing: isApplicantAccount ? false : values.receiveMarketing,
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
