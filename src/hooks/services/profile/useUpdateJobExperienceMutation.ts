"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { updateData } from "@wew/lib/requests";
import type { JobExperienceFormValues } from "@wew/lib/schemas/profile-forms";

export type JobExperienceItemPayload = {
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  description: string;
  currentlyWorking: boolean;
};

export type UpdateJobExperiencePayload = {
  experiences: JobExperienceItemPayload[];
  linkedinProfile: string;
  portfolioWebsite: string;
};

type UpdateJobExperienceResponse = {
  message?: string;
};

type UseUpdateJobExperienceMutationParams = {
  accountId: string;
  onSuccess?: () => void | Promise<void>;
};

export function useUpdateJobExperienceMutation({
  accountId,
  onSuccess,
}: UseUpdateJobExperienceMutationParams) {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: UpdateJobExperiencePayload) =>
      updateData<UpdateJobExperiencePayload, UpdateJobExperienceResponse>(
        `wework/auth/profile/${accountId}/job-experience`,
        payload,
      ),
  });

  const updateJobExperienceHandler = async (
    values: JobExperienceFormValues,
  ) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not update your experience right now.",
        errorTitle: "Experience update failed",
      });
      throw error;
    }

    await queryClient.invalidateQueries({ queryKey: ["profile", accountId] });
    notifySuccess({
      successMessage: "Your experience details have been updated.",
      successTitle: "Experience updated",
    });
    await onSuccess?.();
  };

  return {
    isPending: mutation.isPending,
    updateJobExperienceHandler,
  };
}
