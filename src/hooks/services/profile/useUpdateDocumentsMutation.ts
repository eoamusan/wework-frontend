"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

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
  const mutation = useMutation({
    mutationFn: (payload: UpdateDocumentsPayload) =>
      updateData<UpdateDocumentsPayload, UpdateDocumentsResponse>(
        `wework/auth/profile/${accountId}/document`,
        payload,
      ),
  });

  const updateDocumentsHandler = async (values: DocumentsFormValues) => {
    await mutation.mutateAsync(values);
    await queryClient.invalidateQueries({ queryKey: ["profile", accountId] });
    await onSuccess?.();
  };

  return {
    isPending: mutation.isPending,
    updateDocumentsHandler,
  };
}
