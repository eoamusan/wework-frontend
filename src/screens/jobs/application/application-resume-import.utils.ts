import type { JobApplicationFormValues } from "@wew/lib/schemas/job-application-form";

import {
  type ParsedResumeApplicationData,
  parseResumeText,
} from "./application-resume-parse.utils";
import {
  type ResumeImportSource,
  extractTextFromResume,
  getResumeFile,
} from "./application-resume-reader.utils";

function applyParsedResumeToApplication(
  form: import("react-hook-form").UseFormReturn<JobApplicationFormValues>,
  data: ParsedResumeApplicationData,
) {
  const currentValues = form.getValues();

  form.setValue(
    "personalInfo.firstName",
    data.personalInfo.firstName || currentValues.personalInfo.firstName,
    { shouldDirty: true },
  );
  form.setValue(
    "personalInfo.lastName",
    data.personalInfo.lastName || currentValues.personalInfo.lastName,
    { shouldDirty: true },
  );
  form.setValue(
    "personalInfo.emailAddress",
    data.personalInfo.emailAddress || currentValues.personalInfo.emailAddress,
    { shouldDirty: true },
  );
  form.setValue(
    "personalInfo.phone",
    data.personalInfo.phone || currentValues.personalInfo.phone,
    { shouldDirty: true },
  );
  form.setValue(
    "personalInfo.bio",
    data.personalInfo.bio || currentValues.personalInfo.bio,
    { shouldDirty: true },
  );
  form.setValue(
    "personalInfo.location",
    data.personalInfo.location || currentValues.personalInfo.location,
    { shouldDirty: true },
  );
  form.setValue(
    "jobExperience.experiences",
    data.jobExperience.experiences?.length
      ? data.jobExperience.experiences
      : currentValues.jobExperience.experiences,
    { shouldDirty: true },
  );
  form.setValue(
    "jobExperience.linkedinProfile",
    data.jobExperience.linkedinProfile ||
      currentValues.jobExperience.linkedinProfile,
    { shouldDirty: true },
  );
  form.setValue(
    "jobExperience.portfolioWebsite",
    data.jobExperience.portfolioWebsite ||
      currentValues.jobExperience.portfolioWebsite,
    { shouldDirty: true },
  );
}

export async function importResumeToApplication(
  form: import("react-hook-form").UseFormReturn<JobApplicationFormValues>,
  source: ResumeImportSource,
) {
  const resumeFile = await getResumeFile(source);

  if (!resumeFile) {
    throw new Error("Upload a resume first to import its details.");
  }

  const text = await extractTextFromResume(resumeFile);

  if (text.length < 80) {
    throw new Error(
      "We could not read enough detail from that resume to fill the form.",
    );
  }

  const parsedResume = parseResumeText(text);
  const hasImportedData =
    Object.values(parsedResume.personalInfo).some(Boolean) ||
    Boolean(parsedResume.jobExperience.linkedinProfile) ||
    Boolean(parsedResume.jobExperience.portfolioWebsite) ||
    Boolean(parsedResume.jobExperience.experiences?.length);

  if (!hasImportedData) {
    throw new Error("We could not find importable details in that resume.");
  }

  applyParsedResumeToApplication(form, parsedResume);
}
