"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {
  type AuthSession,
  setStoredAuthSession,
} from "@wew/lib/auth";
import { updateData } from "@wew/lib/requests";
import type { PersonalInfoFormValues } from "@wew/lib/schemas/profile-forms";

export type UpdatePersonalInfoPayload = {
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  emailAddress: string;
  location: string;
  jobTitle: string;
  bio: string;
  profilePicture: string;
};

type UpdatePersonalInfoResponse = {
  message?: string;
};

type UseUpdatePersonalInfoMutationParams = {
  accountId: string;
  onSuccess?: () => void | Promise<void>;
  session: AuthSession | null;
};

export function useUpdatePersonalInfoMutation({
  accountId,
  onSuccess,
  session,
}: UseUpdatePersonalInfoMutationParams) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: UpdatePersonalInfoPayload) =>
      updateData<UpdatePersonalInfoPayload, UpdatePersonalInfoResponse>(
        `wework/auth/profile/${accountId}`,
        payload,
      ),
  });

  const updatePersonalInfoHandler = async (
    values: PersonalInfoFormValues,
  ) => {
    await mutation.mutateAsync({
      ...values,
      name: `${values.firstName} ${values.lastName}`.trim(),
    });

    if (session) {
      const currentAccountId =
        session.accountId || session.user?.accountId || session.user?.id;

      setStoredAuthSession({
        ...session,
        accountId: currentAccountId,
        user: {
          ...session.user,
          accountId: currentAccountId,
          avatarUrl: values.profilePicture || session.user?.avatarUrl,
          email: values.emailAddress,
          firstName: values.firstName,
          fullName: `${values.firstName} ${values.lastName}`.trim(),
          id: session.user?.id || currentAccountId,
          lastName: values.lastName,
        },
      });
    }

    await queryClient.invalidateQueries({ queryKey: ["profile", accountId] });
    await onSuccess?.();
  };

  return {
    isPending: mutation.isPending,
    updatePersonalInfoHandler,
  };
}
