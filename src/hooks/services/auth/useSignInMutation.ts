"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import {
  type AccountType,
  clearStoredRedirectPath,
  getStoredRedirectPath,
  normalizeAuthSession,
  setStoredAuthSession,
} from "@wew/lib/auth";
import { postData } from "@wew/lib/requests";
import type { LoginFormValues } from "@wew/lib/schemas/login-form";

export type SignInPayload = {
  accountType: AccountType;
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken?: string;
  refreshToken?: string;
  account?: {
    _id?: string;
    id?: string;
    accountType?: AccountType;
    companyName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    applicantProfile?: {
      accountId?: string;
      emailAddress?: string;
      name?: string;
      profilePicture?: string;
    };
    companyProfile?: {
      companyName?: string;
      logo?: string;
    };
  };
};

type UseSignInMutationParams = {
  accountType: AccountType;
  redirectTo?: string;
};

export function useSignInMutation({
  accountType,
  redirectTo = "",
}: UseSignInMutationParams) {
  const router = useRouter();
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: async (payload: SignInPayload) => {
      const response = await postData<SignInPayload, SignInResponse>(
        "wework/auth/signin",
        payload,
      );
      const account = response.data.account;
      const accountId = account?.id || account?._id || "";
      const profile = account?.applicantProfile;
      const companyProfile = account?.companyProfile;
      const session = normalizeAuthSession({
        accessToken: response.data.accessToken,
        accountId: profile?.accountId || accountId,
        accountType: account?.accountType || payload.accountType,
        avatarUrl: profile?.profilePicture || companyProfile?.logo,
        email: profile?.emailAddress || account?.email,
        firstName: account?.firstName,
        fullName:
          companyProfile?.companyName ||
          account?.companyName ||
          profile?.name ||
          [account?.firstName, account?.lastName].filter(Boolean).join(" "),
        id: accountId,
        lastName: account?.lastName,
        refreshToken: response.data.refreshToken,
      });

      if (!session) {
        throw new Error("Sign in succeeded but no access token was returned.");
      }

      setStoredAuthSession(session);
      return response;
    },
  });

  const signInHandler = async (values: LoginFormValues) => {
    try {
      await mutation.mutateAsync({
        accountType,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not sign you in. Please try again.",
        errorTitle: "Sign in failed",
      });
      throw error;
    }

    clearStoredRedirectPath();
    const fallbackRoute = accountType === "company" ? "/browse-candidates" : "/";
    notifySuccess({
      successMessage: "You have signed in successfully.",
      successTitle: "Welcome back",
    });
    router.replace(redirectTo || getStoredRedirectPath() || fallbackRoute);
  };

  return {
    isPending: mutation.isPending,
    signInHandler,
  };
}
