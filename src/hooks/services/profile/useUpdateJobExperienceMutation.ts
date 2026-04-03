"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

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
    await mutation.mutateAsync(values);
    await queryClient.invalidateQueries({ queryKey: ["profile", accountId] });
    await onSuccess?.();
  };

  return {
    isPending: mutation.isPending,
    updateJobExperienceHandler,
  };
}
