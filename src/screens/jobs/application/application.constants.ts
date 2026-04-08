import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

import type { ApplicationStepId } from "./components/applicationStepper";

export const applicationSteps: ApplicationStepId[] = [
  "personal",
  "experience",
  "resume",
  "preview",
];

export function getApplicationDefaultValues(): JobApplicationFormValues {
  return {
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
    case "preview":
    default:
      return [] as const;
  }
}
