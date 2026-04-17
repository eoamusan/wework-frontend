"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useMutationToast } from "@wew/hooks/useMutationToast";
import { updateData } from "@wew/lib/requests";
import type { DocumentsFormValues } from "@wew/lib/schemas/profile-forms";

export type UpdateDocumentsPayload = {
  resumeUrl: string;
  resumeName: string;
  resumeSize: number;
};

type UpdateDocumentsResponse = {
  message?: string;
};

type UseUpdateDocumentsMutationParams = {
  accountId: string;
  onSuccess?: () => void | Promise<void>;
};

export function useUpdateDocumentsMutation({
  accountId,
  onSuccess,
}: UseUpdateDocumentsMutationParams) {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useMutationToast();
  const mutation = useMutation({
    mutationFn: (payload: UpdateDocumentsPayload) =>
      updateData<UpdateDocumentsPayload, UpdateDocumentsResponse>(
        `wework/auth/profile/${accountId}/document`,
        payload,
      ),
  });

  const updateDocumentsHandler = async (values: DocumentsFormValues) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      notifyError(error, {
        errorMessage: "We could not update your documents right now.",
        errorTitle: "Document update failed",
      });
      throw error;
    }

    await queryClient.invalidateQueries({ queryKey: ["profile", accountId] });
    notifySuccess({
      successMessage: "Your documents have been updated.",
      successTitle: "Documents updated",
    });
    await onSuccess?.();
  };

  return {
    isPending: mutation.isPending,
    updateDocumentsHandler,
  };
}
