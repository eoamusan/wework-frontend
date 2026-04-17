"use client";

import { Download, Eye } from "lucide-react";
import Image from "next/image";

import linkIcon from "@wew/assets/icons/link.svg";
import pdfIcon from "@wew/assets/icons/pdf.svg";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";
import { ProfileDetailsGrid } from "@wew/screens/profile/components/profileDetailsGrid";

type ApplicationPreviewStepProps = {
  values: JobApplicationFormValues;
};

export function ApplicationPreviewStep({
  values,
}: ApplicationPreviewStepProps) {
  const resumeLink = values.documents.resumeUrl;
  const coverLetterLink = values.coverLetter.fileUrl;
  const coverLetterText = values.coverLetter.content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="max-h-[21rem] overflow-y-auto pr-2">
      <div className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-dark-soft">
            Personal Information
          </h3>

          <ProfileDetailsGrid
            items={[
              {
                // icon: userIcon,
                label: "First Name",
                value: values.personalInfo.firstName,
              },
              {
                label: "Last Name",
                value: values.personalInfo.lastName,
              },
              {
                // icon: mailIcon,
                label: "Email Address",
                value: values.personalInfo.emailAddress,
              },
              {
                // icon: phoneIcon,
                label: "Phone Number",
                value: values.personalInfo.phone,
              },
            ]}
          />

          <div className="space-y-3">
            <p className="text-sm font-medium text-secondary">Bio</p>
            <p className="text-sm leading-7 text-secondary">
              {values.personalInfo.bio}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-secondary">Location</p>
            <p className="text-sm leading-7 text-secondary">
              {values.personalInfo.location}
            </p>
          </div>
        </div>

        <div className="border-t border-[#f0edf8] pt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-dark-soft">
              Job Experience & Links
            </h3>

            {values.jobExperience.experiences.map((experience, index) => (
              <div className="space-y-5" key={`${experience.companyName}-${index}`}>
                <ProfileDetailsGrid
                  items={[
                    {
                      label: "Company Name",
                      value: experience.companyName,
                    },
                    {
                      label: "Job Title",
                      value: experience.jobTitle,
                    },
                    {
                      label: "Start Date",
                      value: experience.startDate,
                    },
                    {
                      label: "End Date",
                      value:
                        experience.endDate ||
                        (experience.currentlyWorking ? "Present" : ""),
                    },
                  ]}
                />

                <div className="space-y-3">
                  <p className="text-sm font-medium text-secondary">Description</p>
                  <p className="text-sm leading-7 text-secondary">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}

            <ProfileDetailsGrid
              items={[
                {
                  icon: linkIcon,
                  label: "LinkedIn Profile",
                  value: values.jobExperience.linkedinProfile,
                },
                {
                  icon: linkIcon,
                  label: "Portfolio/Website",
                  value: values.jobExperience.portfolioWebsite,
                },
              ]}
            />
          </div>
        </div>

        <div className="border-t border-[#f0edf8] pt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-dark-soft">Resume/CV</h3>
            <div className="space-y-3">
              <p className="text-sm font-medium text-secondary">Attachment</p>

              <div className="flex flex-col gap-4 rounded-[0.9rem] border border-[#ebe6f5] bg-white p-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Image alt="file" height={28} src={pdfIcon} width={28} />
                  <div>
                    <p className="text-sm font-medium text-secondary">
                      {values.documents.resumeName}
                    </p>
                  </div>
                </div>

                {resumeLink ? (
                  <div className="flex items-center gap-2 text-secondary/70">
                    <a
                      className="inline-flex items-center gap-1 text-sm transition hover:text-accent-blue"
                      href={resumeLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Eye className="size-4" />
                    </a>
                    <a
                      className="inline-flex items-center gap-1 text-sm transition hover:text-accent-blue"
                      download={values.documents.resumeName || true}
                      href={resumeLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Download className="size-4 text-[#24A959]" />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f0edf8] pt-8">
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-dark-soft">Cover letter</h3>

            {values.coverLetter.fileName ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-secondary">Attachment</p>

                <div className="flex flex-col gap-4 rounded-[0.9rem] border border-[#ebe6f5] bg-white p-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Image alt="file" height={28} src={pdfIcon} width={28} />
                    <p className="text-sm font-medium text-secondary">
                      {values.coverLetter.fileName}
                    </p>
                  </div>

                  {coverLetterLink ? (
                    <div className="flex items-center gap-2 text-secondary/70">
                      <a
                        className="inline-flex items-center gap-1 text-sm transition hover:text-accent-blue"
                        href={coverLetterLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Eye className="size-4" />
                      </a>
                      <a
                        className="inline-flex items-center gap-1 text-sm transition hover:text-accent-blue"
                        download={values.coverLetter.fileName || true}
                        href={coverLetterLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Download className="size-4 text-[#24A959]" />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {coverLetterText ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-secondary">Written in app</p>
                <div
                  className="rounded-[0.9rem] border border-[#ebe6f5] bg-white px-4 py-4 text-sm leading-7 text-secondary [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: values.coverLetter.content }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
