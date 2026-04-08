import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";

export type CandidateProfile = ProfileData & {
  candidateId: string;
};
