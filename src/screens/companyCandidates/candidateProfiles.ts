import type { CandidateItem } from "./data";
import { candidateProfilesPartOne } from "./candidateProfiles.part-one";
import { candidateProfilesPartTwo } from "./candidateProfiles.part-two";
import { candidateItems } from "./data";

import type { CandidateProfile } from "./candidateProfiles.types";

const candidateProfiles = {
  ...candidateProfilesPartOne,
  ...candidateProfilesPartTwo,
};

export type { CandidateProfile } from "./candidateProfiles.types";
export type CandidateProfileView = CandidateItem & CandidateProfile;

export function getCandidateProfileById(candidateId: string) {
  const candidate = candidateItems.find((item) => item.id === candidateId);

  if (!candidate) {
    return null;
  }

  const profile = candidateProfiles[candidateId];

  if (profile) {
    return {
      ...candidate,
      ...profile,
    } satisfies CandidateProfileView;
  }

  const [firstName = "", ...rest] = candidate.name.split(" ");
  const lastName = rest.join(" ");
  const resumeName = `${candidate.name.replace(/\s+/g, "-")}-Resume.pdf`;

  return {
    ...candidate,
    bio: candidate.description,
    candidateId,
    documents: { resumeName, resumeSize: 1572864, resumeUrl: "#" },
    emailAddress: "",
    experiences: [],
    firstName,
    jobTitle: candidate.role,
    lastName,
    linkedinProfile: "",
    name: candidate.name,
    phone: "",
    portfolioWebsite: "",
    profilePicture: "",
    resumeName,
    resumeSize: 1572864,
    resumeUrl: "#",
  } satisfies CandidateProfileView;
}
