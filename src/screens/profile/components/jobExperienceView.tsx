"use client";

import Image from "next/image";

import linkIcon from "@wew/assets/icons/link.svg";
import timerIcon from "@wew/assets/icons/timer.svg";
import briefCaseIcon from "@wew/assets/icons/white-briefcase.svg";
import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";

function formatDateRange(
  startDate?: string,
  endDate?: string,
  currentlyWorking?: boolean,
) {
  if (!startDate) {
    return "Dates not added";
  }

  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const end = currentlyWorking
    ? "Present"
    : endDate
      ? new Date(endDate).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Present";

  return `${start} - ${end}`;
}

type JobExperienceViewProps = {
  profile?: ProfileData;
};

export function JobExperienceView({ profile }: JobExperienceViewProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-7">
        <h3 className="text-lg font-semibold text-dark">Job Experience</h3>

        {profile?.experiences?.length ? (
          <div className="space-y-8">
            {profile.experiences.map((experience, index) => (
              <div
                className="grid gap-5 md:grid-cols-[56px_minmax(0,1fr)_auto]"
                key={`${experience.companyName}-${experience.startDate}-${index}`}
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-[#3483fa] text-white shadow-[0_14px_26px_rgba(52,131,250,0.2)]">
                  <Image
                    src={briefCaseIcon}
                    alt="briefcase"
                    width={32}
                    height={32}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="">
                      <h4 className="text-sm font-medium text-secondary">
                        {experience.jobTitle}
                      </h4>
                      <p className="text-xs text-secondary">
                        {experience.companyName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-dark">
                      <Image
                        src={timerIcon}
                        alt="timer"
                        width={24}
                        height={24}
                      />
                      <span>
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate,
                          experience.currentlyWorking,
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-5 text-secondary">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base text-secondary/80">
            No job experience added yet.
          </p>
        )}
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-dark">Links</h3>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-medium text-secondary">
              LinkedIn Profile
            </p>
            <div className="flex items-center gap-2 text-dark-soft">
              <Image src={linkIcon} alt="link" width={24} height={24} />
              {profile?.linkedinProfile ? (
                <a
                  className="text-xs text-secondary underline-offset-4 hover:underline"
                  href={profile.linkedinProfile}
                  rel="noreferrer"
                  target="_blank"
                >
                  {profile.linkedinProfile}
                </a>
              ) : (
                <span className="text-base">Not added yet</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-secondary">
              Portfolio / Website
            </p>
            <div className="flex items-center gap-2 text-dark-soft">
              <Image src={linkIcon} alt="link" width={24} height={24} />
              {profile?.portfolioWebsite ? (
                <a
                  className="text-xs text-secondary underline-offset-4 hover:underline"
                  href={profile.portfolioWebsite}
                  rel="noreferrer"
                  target="_blank"
                >
                  {profile.portfolioWebsite}
                </a>
              ) : (
                <span className="text-base">Not added yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
