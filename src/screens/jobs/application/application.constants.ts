import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

import type { ApplicationStepId } from "./components/applicationStepper";

export const applicationSteps: ApplicationStepId[] = [
  "personal",
  "experience",
  "resume",
  "cover-letter",
  "preview",
];

export function getApplicationDefaultValues(): JobApplicationFormValues {
  return {
    coverLetter: {
      content: "",
      fileName: "",
      fileSize: 0,
      fileUrl: "",
    },
    documents: {
      resumeName: "",
      resumeSize: 0,
      resumeUrl: "",
    },
    jobExperience: {
      experiences: [
        {
          companyName: "",
          currentlyWorking: false,
          description: "",
          endDate: "",
          jobTitle: "",
          startDate: "",
        },
      ],
      linkedinProfile: "",
      portfolioWebsite: "",
    },
    personalInfo: {
      bio: "",
      emailAddress: "",
      firstName: "",
      lastName: "",
      location: "",
      phone: "",
    },
  };
}

export function getDraftKey(jobId: string) {
  return `job-application-draft-${jobId}`;
}

export function getStepFields(step: ApplicationStepId) {
  switch (step) {
    case "personal":
      return [
        "personalInfo.firstName",
        "personalInfo.lastName",
        "personalInfo.emailAddress",
        "personalInfo.phone",
        "personalInfo.bio",
        "personalInfo.location",
      ] as const;
    case "experience":
      return [
        "jobExperience.experiences",
        "jobExperience.linkedinProfile",
        "jobExperience.portfolioWebsite",
      ] as const;
    case "resume":
      return [
        "documents.resumeUrl",
        "documents.resumeName",
        "documents.resumeSize",
      ] as const;
    case "cover-letter":
      return [
        "coverLetter.content",
        "coverLetter.fileName",
        "coverLetter.fileSize",
        "coverLetter.fileUrl",
      ] as const;
    case "preview":
    default:
      return [] as const;
  }
}
