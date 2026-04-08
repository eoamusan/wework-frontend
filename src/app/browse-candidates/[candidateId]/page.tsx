import { notFound } from "next/navigation";

import { getCandidateProfileById } from "@wew/screens/companyCandidates/candidateProfiles";
import CompanyCandidateProfileScreen from "@wew/screens/companyCandidates/profile";

type PageProps = {
  params: Promise<{ candidateId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { candidateId } = await params;
  const candidate = getCandidateProfileById(candidateId);

  if (!candidate) {
    notFound();
  }

  return <CompanyCandidateProfileScreen candidate={candidate} />;
}
