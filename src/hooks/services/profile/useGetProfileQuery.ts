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

type ProfileResponse = {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  applicantProfile?: {
    _id?: string;
    accountId?: string;
    name?: string;
    phone?: string;
    emailAddress?: string;
    location?: string;
    jobTitle?: string;
    bio?: string;
    profilePicture?: string;
  };
  jobExperience?: Array<{
    experiences?: JobExperience[];
    linkedinProfile?: string;
    portfolioWebsite?: string;
  }>;
  documents?: {
    resumeUrl?: string;
    resumeName?: string;
    resumeSize?: number;
  };
};

type UseGetProfileQueryParams = {
  accountId: string;
};

function mapProfileResponse(data?: ProfileResponse): ProfileData | undefined {
  if (!data) {
    return undefined;
  }

  const applicantProfile = data.applicantProfile;
  const jobExperience = data.jobExperience?.[0];
  const documents = data.documents;

  return {
    accountId: applicantProfile?.accountId || data.id || data._id,
    bio: applicantProfile?.bio || "",
    documents: {
      resumeName: documents?.resumeName || "",
      resumeSize: documents?.resumeSize || 0,
      resumeUrl: documents?.resumeUrl || "",
    },
    emailAddress: applicantProfile?.emailAddress || data.email || "",
    experiences: jobExperience?.experiences || [],
    firstName: data.firstName || "",
    id: data.id || data._id,
    jobTitle: applicantProfile?.jobTitle || "",
    lastName: data.lastName || "",
    linkedinProfile: jobExperience?.linkedinProfile || "",
    location: applicantProfile?.location || "",
    name:
      applicantProfile?.name ||
      [data.firstName, data.lastName].filter(Boolean).join(" "),
    phone: applicantProfile?.phone || data.phoneNumber || "",
    portfolioWebsite: jobExperience?.portfolioWebsite || "",
    profilePicture: applicantProfile?.profilePicture || "",
    resumeName: documents?.resumeName || "",
    resumeSize: documents?.resumeSize || 0,
    resumeUrl: documents?.resumeUrl || "",
  };
}

export function useGetProfileQuery({
  accountId,
}: UseGetProfileQueryParams) {
  const query = useQuery({
    queryKey: ["profile", accountId],
    queryFn: async () =>
      getData<ProfileResponse>(`wework/auth/profile/${accountId}`),
    enabled: Boolean(accountId),
  });

  return {
    ...query,
    profile: mapProfileResponse(query.data?.data),
  };
}
