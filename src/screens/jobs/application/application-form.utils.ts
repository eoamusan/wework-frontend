import type { ProfileData } from "@wew/hooks/services/profile/useGetProfileQuery";
import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

const defaultExperience = [
  {
    companyName: "",
    currentlyWorking: false,
    description: "",
    endDate: "",
    jobTitle: "",
    startDate: "",
  },
];

export function applyProfileToPersonalInfo(
  form: import("react-hook-form").UseFormReturn<JobApplicationFormValues>,
  profile?: ProfileData,
) {
  if (!profile) {
    return;
  }

  form.setValue("personalInfo.firstName", profile.firstName || "", {
    shouldDirty: true,
  });
  form.setValue("personalInfo.lastName", profile.lastName || "", {
    shouldDirty: true,
  });
  form.setValue("personalInfo.emailAddress", profile.emailAddress || "", {
    shouldDirty: true,
  });
  form.setValue("personalInfo.phone", profile.phone || "", {
    shouldDirty: true,
  });
  form.setValue("personalInfo.bio", profile.bio || "", {
    shouldDirty: true,
  });
  form.setValue("personalInfo.location", profile.location || "", {
    shouldDirty: true,
  });
}

export function importProfileToApplication(
  form: import("react-hook-form").UseFormReturn<JobApplicationFormValues>,
  profile?: ProfileData,
) {
  if (!profile) {
    return;
  }

  applyProfileToPersonalInfo(form, profile);

  form.setValue(
    "jobExperience.experiences",
    profile.experiences?.length
      ? profile.experiences.map((experience) => ({
          companyName: experience.companyName || "",
          currentlyWorking: Boolean(experience.currentlyWorking),
          description: experience.description || "",
          endDate: experience.endDate || "",
          jobTitle: experience.jobTitle || "",
          startDate: experience.startDate || "",
        }))
      : defaultExperience,
    { shouldDirty: true },
  );
  form.setValue("jobExperience.linkedinProfile", profile.linkedinProfile || "", {
    shouldDirty: true,
  });
  form.setValue(
    "jobExperience.portfolioWebsite",
    profile.portfolioWebsite || "",
    { shouldDirty: true },
  );
  form.setValue(
    "documents.resumeUrl",
    profile.documents?.resumeUrl || profile.resumeUrl || "",
    { shouldDirty: true },
  );
  form.setValue(
    "documents.resumeName",
    profile.documents?.resumeName || profile.resumeName || "",
    { shouldDirty: true },
  );
  form.setValue(
    "documents.resumeSize",
    profile.documents?.resumeSize || profile.resumeSize || 0,
    { shouldDirty: true },
  );
}
