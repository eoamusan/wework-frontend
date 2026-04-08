import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import linkIcon from "@wew/assets/icons/link.svg";
import locationIcon from "@wew/assets/icons/locator.svg";
import mailIcon from "@wew/assets/icons/mail.svg";
import phoneIcon from "@wew/assets/icons/phone.svg";
import userIcon from "@wew/assets/icons/user.svg";
import { Button } from "@wew/components/ui/button";
import { ProfileDetailsGrid } from "@wew/screens/profile/components/profileDetailsGrid";

import { CandidateProfileAttachment } from "./components/candidateProfileAttachment";
import { CandidateProfileExperience } from "./components/candidateProfileExperience";

import type { CandidateProfileView } from "./candidateProfiles";

type CompanyCandidateProfileScreenProps = {
  candidate: CandidateProfileView;
};

export default function CompanyCandidateProfileScreen({
  candidate,
}: CompanyCandidateProfileScreenProps) {
  const fullName =
    candidate.name ||
    [candidate.firstName, candidate.lastName].filter(Boolean).join(" ");
  const initials =
    `${candidate.firstName?.[0] || fullName?.[0] || "C"}${candidate.lastName?.[0] || fullName?.split(" ")[1]?.[0] || "P"}`.toUpperCase();

  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <Link
          className="inline-flex w-fit items-center gap-3 text-sm font-medium text-secondary transition hover:text-dark-soft"
          href="/browse-candidates"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Candidates</span>
        </Link>

        <div className="mx-auto mt-10 max-w-[56rem] space-y-4 rounded-[1.85rem] bg-white p-4 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:p-8">
          <section className="py-2 mb-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {candidate.profilePicture ? (
                  <img
                    alt={fullName || "Candidate profile"}
                    className="size-32 rounded-full object-cover"
                    src={candidate.profilePicture}
                  />
                ) : (
                  <div
                    className={`flex size-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${candidate.theme} text-2xl font-semibold text-white`}
                  >
                    {initials}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-semibold tracking-[-0.04em] text-dark">
                      {fullName}
                    </h1>
                    <p className="text-sm font-medium text-secondary">{candidate.role}</p>
                  </div>

                  <Button
                    className="h-11 rounded-[0.7rem] px-7 text-sm shadow-none hover:translate-y-0"
                    size={null}
                    type="button"
                  >
                    Contact
                  </Button>
                </div>

                <p className="text-sm leading-6 text-secondary/80">
                  {candidate.bio || candidate.description}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.4rem] border border-[#eceaf5] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(7,10,29,0.04)] sm:px-6">
            <h2 className="text-sm font-semibold text-dark">
              Personal Information
            </h2>

            <div className="mt-6">
              <ProfileDetailsGrid
                items={[
                  {
                    icon: userIcon,
                    label: "Name",
                    value: fullName,
                  },
                  {
                    icon: phoneIcon,
                    label: "Phone",
                    value: candidate.phone || "",
                  },
                  {
                    icon: mailIcon,
                    label: "Email Address",
                    value: candidate.emailAddress || "",
                  },
                  {
                    icon: locationIcon,
                    label: "Location",
                    value: candidate.location || "",
                  },
                ]}
              />
            </div>
          </section>

          <section className="rounded-[1.4rem] border border-[#eceaf5] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(7,10,29,0.04)] sm:px-6">
            <h2 className="text-sm font-semibold text-dark">
              Job Experience &amp; Links
            </h2>

            <div className="mt-7">
              <CandidateProfileExperience experiences={candidate.experiences} />
            </div>
          </section>

          <section className="rounded-[1.4rem] border border-[#eceaf5] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(7,10,29,0.04)] sm:px-6">
            <h2 className="text-sm font-semibold text-dark-soft">Links</h2>

            <div className="mt-6">
              <ProfileDetailsGrid
                items={[
                  {
                    icon: linkIcon,
                    label: "LinkedIn Profile",
                    value: candidate.linkedinProfile || "",
                  },
                  {
                    icon: linkIcon,
                    label: "Portfolio / Website",
                    value: candidate.portfolioWebsite || "",
                  },
                ]}
              />
            </div>
          </section>

          <section className="rounded-[1.4rem] border border-[#eceaf5] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(7,10,29,0.04)] sm:px-6">
            <h2 className="text-sm font-semibold text-dark">Attachment</h2>

            <div className="mt-6">
              <CandidateProfileAttachment candidate={candidate} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
