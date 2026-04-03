"use client";

import { useQuery } from "@tanstack/react-query";

import { getData } from "@wew/lib/requests";

export type JobExperience = {
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  description: string;
  currentlyWorking: boolean;
};

export type ProfileDocuments = {
  resumeUrl: string;
  resumeName: string;
  resumeSize: number;
};

export type ProfileData = {
  accountId?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  emailAddress?: string;
  location?: string;
  jobTitle?: string;
  bio?: string;
  profilePicture?: string;
  experiences?: JobExperience[];
  linkedinProfile?: string;
  portfolioWebsite?: string;
  documents?: ProfileDocuments;
  resumeUrl?: string;
  resumeName?: string;
  resumeSize?: number;
};

type UseGetProfileQueryParams = {
  accountId: string;
};

export function useGetProfileQuery({
  accountId,
}: UseGetProfileQueryParams) {
  const query = useQuery({
    queryKey: ["profile", accountId],
    queryFn: async () =>
      getData<ProfileData>(`wework/auth/profile/${accountId}`),
    enabled: Boolean(accountId),
  });

  return {
    ...query,
    profile: query.data?.data,
  };
}
