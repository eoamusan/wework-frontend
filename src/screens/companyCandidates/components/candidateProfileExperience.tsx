import Image from "next/image";

import timerIcon from "@wew/assets/icons/timer.svg";
import whiteBriefcaseIcon from "@wew/assets/icons/white-briefcase.svg";

import type { CandidateProfile } from "../candidateProfiles";

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

export function CandidateProfileExperience({
  experiences,
}: {
  experiences: CandidateProfile["experiences"];
}) {
  if (!experiences?.length) {
    return <p className="text-sm text-secondary/80">No experience added yet.</p>;
  }

  return (
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <div
          className="grid gap-5 md:grid-cols-[56px_minmax(0,1fr)]"
          key={`${experience.companyName}-${experience.startDate}-${index}`}
        >
          <div className="relative flex justify-center">
            <div
              className={`flex size-14 items-center justify-center rounded-full ${
                index === 0
                  ? "bg-[#3483fa] shadow-[0_14px_26px_rgba(52,131,250,0.2)]"
                  : "bg-[#1fc5b6] shadow-[0_14px_26px_rgba(31,197,182,0.2)]"
              } text-white`}
            >
              <Image alt="briefcase" height={28} src={whiteBriefcaseIcon} width={28} />
            </div>

            {index < experiences.length - 1 ? (
              <span className="absolute top-14 bottom-[-2rem] w-px bg-[#e9e5f5]" />
            ) : null}
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-base font-medium text-dark-soft">
                  {experience.jobTitle}
                </h3>
                <p className="text-sm text-secondary">{experience.companyName}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-secondary">
                <Image alt="timer" height={20} src={timerIcon} width={20} />
                <span>
                  {formatDateRange(
                    experience.startDate,
                    experience.endDate,
                    experience.currentlyWorking,
                  )}
                </span>
              </div>
            </div>

            <p className="max-w-[34rem] text-sm leading-6 text-secondary/80">
              {experience.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
