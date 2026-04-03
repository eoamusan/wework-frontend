"use client";

import { useMutation } from "@tanstack/react-query";

import {
  getStoredAuthSession,
  normalizeAuthSession,
  setStoredAuthSession,
} from "@wew/lib/auth";
import { postData } from "@wew/lib/requests";

export type RefreshTokenPayload = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken?: string;
  jwt?: string;
  refresh?: string;
  refreshToken?: string;
  token?: string;
};

export function useRefreshTokenMutation() {
  const mutation = useMutation({
    mutationFn: async (payload: RefreshTokenPayload) => {
      const response = await postData<RefreshTokenPayload, RefreshTokenResponse>(
        "wework/auth/refresh",
        payload,
      );
      const currentSession = getStoredAuthSession();
      const nextSession = normalizeAuthSession({
        ...currentSession,
        ...response.data,
      });

      if (!nextSession) {
        throw new Error(
          "Refresh succeeded but no access token was returned by the API.",
        );
      }

      setStoredAuthSession(nextSession);
      return response;
    },
  });

  const refreshTokenHandler = async (refreshToken: string) => {
    return mutation.mutateAsync({ refreshToken });
  };

  return {
    isPending: mutation.isPending,
    refreshTokenHandler,
  };
}
